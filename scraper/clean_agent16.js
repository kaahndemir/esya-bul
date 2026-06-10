const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const AGENT_FILE = path.join(__dirname, 'data', 'agent16_eval.json');
const CONCURRENCY = 20;

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	let items = JSON.parse(fs.readFileSync(AGENT_FILE, 'utf-8'));
	console.log(`🔎 agent16_eval.json içindeki ${items.length} ilanın canlılık testi yapılıyor...`);

	const browser = await puppeteer.launch({
		headless: "new",
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	let activeWorkers = 0;
	let itemsProcessed = 0;
	const aliveItems = [];

	const processItem = async (item, workerId) => {
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.on('request', req => {
			if (['image', 'media', 'font', 'stylesheet'].includes(req.resourceType())) {
				req.abort();
			} else {
				req.continue();
			}
		});

		try {
			// Await navigation and wait extra time for Letgo's client-side React router to redirect
            let itemUrl = item.link || `https://www.letgo.com/item/iid-${item.id}`;
			await page.goto(itemUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
			
			// Client-side redirects (React) sometimes take 1-2 seconds after domcontentloaded
			await sleep(2000); 

			const currentUrl = page.url();
			let isDead = false;

			if (!currentUrl.includes('/item/') || currentUrl.includes('redirectedItem') || currentUrl === 'https://www.letgo.com/tr-tr' || currentUrl === 'https://www.letgo.com/') {
				isDead = true;
			} else {
				const isSoldText = await page.evaluate(() => {
					const bodyText = document.body.innerText;
					return bodyText.includes('artık aktif değil') ||
						bodyText.includes('Satıldı') ||
						bodyText.includes('İlan yayında değil') ||
						bodyText.includes('Opps... Bir şeyler yanlış gitti') ||
						bodyText.includes('bulunamadı');
				});
				if (isSoldText) isDead = true;
			}

			if (isDead) {
				console.log(`   [W${workerId}] 🛑 ÖLÜ LİNK (Siliniyor): ${item.id}`);
			} else {
				console.log(`   [W${workerId}] ✅ CANLI: ${item.id}`);
                aliveItems.push(item);
			}
		} catch (error) {
			console.log(`   [W${workerId}] ⚠️ Hata: ${item.id} - ${error.message} (Safe varsayılıyor)`);
            aliveItems.push(item);
		} finally {
			await page.close();
		}
	};

	const queue = [...items];
	const promises = [];

	while (queue.length > 0 || activeWorkers > 0) {
		while (activeWorkers < CONCURRENCY && queue.length > 0) {
			const item = queue.shift();
			activeWorkers++;
			const p = processItem(item, activeWorkers).then(() => {
				activeWorkers--;
				itemsProcessed++;
			});
			promises.push(p);
		}
		await sleep(100);
	}

	await Promise.all(promises);
	await browser.close();

	console.log(`\n🎉 Test Bitti! Silinen ölü link sayısı: ${items.length - aliveItems.length}`);
	console.log(`Net Kalan Canlı İlan: ${aliveItems.length}`);

	fs.writeFileSync(AGENT_FILE, JSON.stringify(aliveItems, null, 2));
	console.log('✅ agent16_eval.json güncellendi.');
})();
