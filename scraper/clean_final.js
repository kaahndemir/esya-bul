const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const DASHBOARD_FILE = path.join(__dirname, '../web-dashboard/public/verified_data.json');
const CONCURRENCY = 10;

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	let db = JSON.parse(fs.readFileSync(DASHBOARD_FILE, 'utf-8'));
	const todoItems = db.filter(i => i.audit_status === 'safe');
	console.log(`🔎 Dashboard'daki ${todoItems.length} "safe" ilanın canlılık testi yapılıyor...`);

	const browser = await puppeteer.launch({
		headless: "new",
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	let activeWorkers = 0;
	let itemsProcessed = 0;

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
			// Await navigation but importantly, wait extra time for Letgo's client-side React router to redirect
			await page.goto(item.link, { waitUntil: 'domcontentloaded', timeout: 20000 });
			
			// Client-side redirects (React) sometimes take 1-2 seconds after domcontentloaded
			await sleep(2500); 

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
				console.log(`   [W${workerId}] 🛑 ÖLÜ LİNK BULUNDU (Siliniyor): ${item.id} -> ${currentUrl}`);
				item.audit_status = 'sold';
				item.audit_reason = 'Son kontrolde ilan silinmiş veya yönlendirilmiş.';
			} else {
				console.log(`   [W${workerId}] ✅ CANLI: ${item.id}`);
			}
		} catch (error) {
			console.log(`   [W${workerId}] ⚠️ Hata: ${item.id} - ${error.message}`);
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
		await sleep(100);
	}

	await Promise.all(promises);
	await browser.close();

	const newSafeData = db.filter(i => i.audit_status === 'safe');
	console.log(`\n🎉 Test Bitti! Dashboard'dan silinen ölü link sayısı: ${todoItems.length - newSafeData.length}`);
	console.log(`Net Kalan Canlı İlan: ${newSafeData.length}`);

	// Sadece safe olanları kaydet
	fs.writeFileSync(DASHBOARD_FILE, JSON.stringify(newSafeData, null, 2));
	console.log('✅ Dashboard verisi güncellendi.');
})();
