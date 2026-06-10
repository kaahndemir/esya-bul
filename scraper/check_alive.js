const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DASHBOARD_FILE = path.join(__dirname, '../web-dashboard/public/verified_data.json');
const ENRICHED_FILE = path.join(__dirname, 'data', 'enriched_broad_data.json');
const CONCURRENCY = 6;

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	let dashboardData = JSON.parse(fs.readFileSync(DASHBOARD_FILE, 'utf-8'));
	console.log(`Loading ${dashboardData.length} items from Dashboard...`);

	const todoItems = dashboardData.filter(i => i.audit_status === 'safe');
	console.log(`Checking ${todoItems.length} safe items...`);

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

	// We will update dashboardData in place
	const processItem = async (item, workerId) => {
		const page = await browser.newPage();

		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
		await page.setViewport({ width: 1366, height: 768 });

		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'webdriver', { get: () => false });
		});

		await page.setRequestInterception(true);
		page.on('request', req => {
			if (['image', 'media', 'font', 'stylesheet'].includes(req.resourceType())) req.abort();
			else req.continue();
		});

		try {
			await page.goto(item.link, { waitUntil: 'domcontentloaded', timeout: 30000 });
			await sleep(1000); // Give it a sec to redirect if it's a JS redirect

			const currentUrl = page.url();
			let isDead = false;

			if (currentUrl === 'https://www.letgo.com/tr-tr' || currentUrl === 'https://www.letgo.com/' || !currentUrl.includes('/item/')) {
				isDead = true;
			} else {
				// Secondary check: look for "İlan bulunamadı" or similar text, or missing price tag.
				const isSoldText = await page.evaluate(() => {
					const bodyText = document.body.innerText;
					return bodyText.includes('artık aktif değil') ||
						bodyText.includes('Satıldı') ||
						bodyText.includes('İlan yayında değil') ||
						bodyText.includes('bulunamadı');
				});
				if (isSoldText) {
					isDead = true;
				}
			}

			if (isDead) {
				console.log(`   [W${workerId}] 🛑 DEAD: ${item.id} (${item.title.trim()})`);
				item.audit_status = 'sold';
				item.audit_reason = 'İlan Letgo\'dan kalkmış (Yönlendirme/Yayında Değil)';
			} else {
				console.log(`   [W${workerId}] ✅ ALIVE: ${item.id}`);
			}

		} catch (error) {
			console.log(`   [W${workerId}] ⚠️ ERR Check: ${item.id}`);
		} finally {
			await page.close();
		}
	};

	const queue = [...todoItems];
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
		await sleep(200);
	}

	await Promise.all(promises);
	await browser.close();

	const newSafeData = dashboardData.filter(i => i.audit_status === 'safe');
	console.log(`\nScan complete! Marked as dead/sold: ${dashboardData.length - newSafeData.length}`);

	fs.writeFileSync(DASHBOARD_FILE, JSON.stringify(newSafeData, null, 2));
	console.log('✅ Dashboard updated (saved only safe ones)');

	if (fs.existsSync(ENRICHED_FILE)) {
		const enrichedData = JSON.parse(fs.readFileSync(ENRICHED_FILE, 'utf-8'));
		const safeIds = new Set(newSafeData.map(i => i.id));
		const deadIds = new Set(dashboardData.filter(i => i.audit_status !== 'safe').map(i => i.id));

		for (const item of enrichedData) {
			if (deadIds.has(item.id)) {
				item.status = 'sold';
			}
		}
		fs.writeFileSync(ENRICHED_FILE, JSON.stringify(enrichedData, null, 2));
		console.log('✅ Enriched Data updated');
	}
})();
