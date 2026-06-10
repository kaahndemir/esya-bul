const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, 'data', 'verified_broad_data.json');
const DASHBOARD_FILE = path.join(__dirname, '../web-dashboard/public/verified_data.json');
const REVIEW_FILE = path.join(__dirname, 'data', 'review_decisions.json');
const AGENT16_FILE = path.join(__dirname, 'data', 'agent16_eval.json');
const ENRICHED_FILE = path.join(__dirname, 'data', 'enriched_broad_data.json');

const CONCURRENCY = 20;

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	let db = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf-8'));
	console.log(`🔎 TÜM VERİTABANI (${db.length} ilan) için Kesin Ölü Link Taraması başlatılıyor...`);

	const browser = await puppeteer.launch({
		headless: "new",
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	let activeWorkers = 0;
	let itemsProcessed = 0;
	const deadIds = new Set();
    const aliveIds = new Set();

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
            // ALWAYS use item.link to ensure proper Letgo redirect behavior!
			await page.goto(item.link, { waitUntil: 'domcontentloaded', timeout: 25000 });
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
				console.log(`   [W${workerId}] 🛑 ÖLÜ (Silinecek): ${item.id} -> ${currentUrl}`);
				deadIds.add(item.id);
			} else {
				console.log(`   [W${workerId}] ✅ CANLI: ${item.id}`);
                aliveIds.add(item.id);
			}
		} catch (error) {
			console.log(`   [W${workerId}] ⚠️ Hata: ${item.id} (Canlı Kabul Ediliyor)`);
            aliveIds.add(item.id);
		} finally {
			await page.close();
		}
	};

	const queue = [...db];
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

	console.log(`\n🎉 Tarama Bitti! Bulunan Ölü Link Sayısı: ${deadIds.size}`);

    // --- PURGE DEAD LINKS FROM EVERYWHERE ---
    const filterAndSave = (filepath) => {
        if (!fs.existsSync(filepath)) return;
        let data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        const originalCount = data.length;
        data = data.filter(i => !deadIds.has(i.id));
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
        console.log(`🧹 ${path.basename(filepath)} temizlendi: ${originalCount} -> ${data.length}`);
    };

    filterAndSave(SOURCE_FILE);
    filterAndSave(DASHBOARD_FILE);
    filterAndSave(REVIEW_FILE);
    filterAndSave(AGENT16_FILE);
    filterAndSave(ENRICHED_FILE);

	console.log('✅ Tüm veritabanları ölü linklerden tamamen arındırıldı.');
})();
