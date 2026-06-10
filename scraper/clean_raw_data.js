const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const RAW_FILE = path.join(__dirname, 'data', 'raw_broad_scrape.json');
const CONCURRENCY = 40; // much higher for speed

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	let rawData = [];
	if (fs.existsSync(RAW_FILE)) {
		rawData = JSON.parse(fs.readFileSync(RAW_FILE, 'utf-8'));
	} else {
		console.log("File not found:", RAW_FILE);
		return;
	}

	console.log(`Loading ${rawData.length} items from raw_broad_scrape.json...`);

	const browser = await puppeteer.launch({
		headless: "new",
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-blink-features=AutomationControlled',
			'--window-size=1920,1080'
		]
	});

	let itemsProcessed = 0;
	let activeWorkers = 0;
	const aliveItems = [];
	const deadItems = [];

	const processItem = async (item, workerId) => {
		const page = await browser.newPage();
		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
		await page.setViewport({ width: 1366, height: 768 });

		await page.setRequestInterception(true);
		page.on('request', req => {
			if (['image', 'media', 'font', 'stylesheet'].includes(req.resourceType())) {
				req.abort();
			} else {
				req.continue();
			}
		});

		try {
			// Fast timeout
			await page.goto(item.link, { waitUntil: 'domcontentloaded', timeout: 20000 });
			await sleep(250); // Fast state check

			const currentUrl = page.url();
			let isDead = false;

			if (currentUrl === 'https://www.letgo.com/tr-tr' || currentUrl === 'https://www.letgo.com/' || !currentUrl.includes('/item/')) {
				isDead = true;
			} else {
				const isSoldText = await page.evaluate(() => {
					const bodyText = document.body.innerText;
					return bodyText.includes('artık aktif değil') ||
						bodyText.includes('Satıldı') ||
						bodyText.includes('İlan yayında değil') ||
						bodyText.includes('bulunamadı') ||
						bodyText.includes('Opps... Bir şeyler yanlış gitti') ||
						bodyText.includes('üzgünüz, bu içerik mevcut değil');
				});
				if (isSoldText) {
					isDead = true;
				}
			}

			if (isDead) {
				console.log(`   [W${workerId}] 🛑 DEAD: ${item.id} (${item.title.substring(0,20)})`);
				deadItems.push(item);
			} else {
				console.log(`   [W${workerId}] ✅ ALIVE: ${item.id}`);
				aliveItems.push(item);
			}

		} catch (error) {
			console.log(`   [W${workerId}] ⚠️ ERR Check (assuming alive to be safe): ${item.id} - ${error.message}`);
			// On timeout or generic error, assume alive to not lose data
			aliveItems.push(item);
		} finally {
			await page.close();
		}
	};

	const queue = [...rawData];
	const promises = [];

	while (queue.length > 0 || activeWorkers > 0) {
		while (activeWorkers < CONCURRENCY && queue.length > 0) {
			const item = queue.shift();
			activeWorkers++;
			const p = processItem(item, activeWorkers).then(() => {
				activeWorkers--;
				itemsProcessed++;
				if (itemsProcessed % 50 === 0) {
					console.log(`\n=> Progress: ${itemsProcessed} / ${rawData.length} | Alive: ${aliveItems.length} | Dead: ${deadItems.length}\n`);
                    // Save intermediate state just in case
                    fs.writeFileSync(RAW_FILE, JSON.stringify([...aliveItems, ...queue], null, 2));
				}
			});
			promises.push(p);
		}
		await sleep(100);
	}

	await Promise.all(promises);
	await browser.close();

	console.log(`\nScan complete! Checked: ${rawData.length} | Alive: ${aliveItems.length} | Dead: ${deadItems.length}`);
	fs.writeFileSync(RAW_FILE, JSON.stringify(aliveItems, null, 2));
	console.log('✅ Updated raw_broad_scrape.json with only alive links');

})();
