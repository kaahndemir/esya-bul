const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.join(__dirname, 'data', 'raw_broad_scrape.json');
const OUTPUT_FILE = path.join(__dirname, 'data', 'enriched_broad_data.json');
const CONCURRENCY = 15; // Safe concurrency for Puppeteer to avoid RAM explosion

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
	console.log(`🚀 SIBORG 4.0: FAST ENRICHER (PUPPETEER SINGLE-PASS) [x${CONCURRENCY}]`);

	if (!fs.existsSync(SOURCE_FILE)) {
		console.error("❌ Kaynak dosya bulunamadı:", SOURCE_FILE);
		return;
	}

	let db = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf-8'));
	
	// Load cache from previous enrichment if it exists
	const cache = {};
	if (fs.existsSync(OUTPUT_FILE)) {
		try {
			const existingData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
			existingData.forEach(item => {
				const hasValidLocation = item.location && 
					item.location !== 'Bilinmiyor' && 
					item.location !== 'İstanbul, Türkiye' && 
					item.location !== 'İstanbul';
				
				if (item.description && hasValidLocation) {
					cache[item.id] = {
						description: item.description,
						location: item.location,
						realDate: item.realDate,
						status: item.status || 'alive'
					};
				}
			});
			console.log(`💾 Önbellek Yüklendi: ${Object.keys(cache).length} adet çözülmüş ilan bulundu.`);
		} catch (e) {
			console.warn("⚠️ Önbellek okunamadı:", e.message);
		}
	}

	let browser = null;

	let activeWorkers = 0;
	let itemsProcessed = 0;
	const aliveItems = [];

	const processItem = async (item, workerId) => {
		const page = await browser.newPage();


		try {
			let itemUrl = item.link || `https://www.letgo.com/item/iid-${item.id}`;
			await page.goto(itemUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
			
			// Wait for React routing and Akamai validation
			await sleep(2500);

			const currentUrl = page.url();
			let isDead = false;

			// 1. LIVENESS CHECK
			if (!currentUrl.includes('/item/') || currentUrl.includes('redirectedItem') || currentUrl === 'https://www.letgo.com/tr-tr' || currentUrl === 'https://www.letgo.com/') {
				isDead = true;
			} else {
				const pageState = await page.evaluate(() => {
					const bodyText = document.body.innerText;
					const isSold = bodyText.includes('artık aktif değil') ||
						bodyText.includes('Satıldı') ||
						bodyText.includes('İlan yayında değil') ||
						bodyText.includes('Opps... Bir şeyler yanlış gitti') ||
						bodyText.includes('bulunamadı');
					
					let desc = "";
					let date = null;
					let location = "İstanbul";

					// Try detailed location selector (ILCE)
					const header = document.querySelector('header') || document.querySelector('[class*="header"]');
					const pTags = Array.from(document.querySelectorAll('p')).filter(p => !header || !header.contains(p));
					const regex = /^[A-ZĞÜŞİÖÇa-zğüşiöçIı\s'-]+,\s[A-ZĞÜŞİÖÇa-zğüşiöçIı\s'-]+$/;
					const detailedLocEl = pTags.find(p => regex.test(p.innerText.trim()));
					if (detailedLocEl) {
						location = detailedLocEl.innerText.trim();
					} else {
						const fallbackLocEl = pTags.find(p => p.innerText.includes('İstanbul'));
						if (fallbackLocEl) {
							location = fallbackLocEl.innerText.trim();
						} else {
							const locEl = document.querySelector('p[class*="text-secondary-900"]');
							if (locEl) location = locEl.innerText.trim();
						}
					}

					// Try JSON-LD
					const scripts = document.querySelectorAll('script[type="application/ld+json"]');
					scripts.forEach(s => {
						try {
							const j = JSON.parse(s.innerText);
							const findVals = (obj) => {
								if (!obj || typeof obj !== 'object') return;
								if (obj.description && !desc) desc = obj.description;
								if (obj.productionDate && !date) date = obj.productionDate;
								Object.values(obj).forEach(findVals);
							};
							findVals(j);
						} catch(e) {}
					});

					// Fallback
					if (!desc) {
						const descEl = document.querySelector('div[data-testid="description"]') || document.querySelector('div[class*="description"]');
						if (descEl) desc = descEl.innerText.trim();
					}

					return { isSold, desc, date, location };
				});

				if (pageState.isSold) isDead = true;
				else {
					item.description = pageState.desc;
					item.realDate = pageState.date;
					item.location = pageState.location || "İstanbul";
				}
			}

			if (isDead) {
				console.log(`   [W${workerId}] 🛑 ÖLÜ: ${item.id}`);
			} else {
				console.log(`   [W${workerId}] ✅ CANLI & ÇEKİLDİ: ${item.id}`);
				aliveItems.push({ ...item, status: 'alive' });
			}

		} catch (error) {
			console.log(`   [W${workerId}] ⚠️ Hata: ${item.id} -> ${error.message} (Safe varsayılıyor)`);
			// En azından başlık var, alive kabul edelim
			aliveItems.push({ ...item, status: 'alive' });
		} finally {
			await page.close();
		}
	};

	const queue = [];
	for (const item of db) {
		if (cache[item.id]) {
			// Skip and restore from cache directly
			aliveItems.push({
				...item,
				description: cache[item.id].description,
				location: cache[item.id].location,
				realDate: cache[item.id].realDate,
				status: cache[item.id].status
			});
		} else {
			queue.push(item);
		}
	}

	console.log(`🔄 Tarayıcı ile işlenecek yeni ilan sayısı: ${queue.length} (Önbellekten geri yüklenen: ${db.length - queue.length})`);
	
	if (queue.length > 0) {
		browser = await puppeteer.launch({
			headless: false,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
		});
	}

	const promises = [];
	const start = Date.now();

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
	if (browser) await browser.close();

    const end = Date.now();
	console.log(`\n🎉 BİTTİ! Süre: ${((end - start) / 1000).toFixed(1)} sn`);
	console.log(`📦 Kalan Canlı İlan: ${aliveItems.length} / ${db.length}`);

	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(aliveItems, null, 2));
})();
