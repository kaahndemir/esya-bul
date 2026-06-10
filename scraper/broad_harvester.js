
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

// 📋 AJAN GÖREV LİSTESİ (URL HARİTASI)
const TASKS = [
	{ name: 'AGENT_01_FRIDGE', url: 'https://www.letgo.com/arama?query_text=buzdolab%C4%B1&isSearchCall=true&city_id=4000040&price=%5B-500%5D' },
	{ name: 'AGENT_02_WASHER', url: 'https://www.letgo.com/arama?query_text=%C3%A7ama%C5%9F%C4%B1r+makinesi&isSearchCall=true&city_id=4000040&price=%5B-500%5D' },
	{ name: 'AGENT_03_STOVE', url: 'https://www.letgo.com/arama?query_text=set%C3%BCst%C3%BC+ocak&isSearchCall=true&city_id=4000040&price=%5B-300%5D' },
	{ name: 'AGENT_04_BED', url: 'https://www.letgo.com/arama?query_text=yatak+baza&isSearchCall=true&city_id=4000040&price=%5B-500%5D' },
	{ name: 'AGENT_05_SOFA', url: 'https://www.letgo.com/arama?query_text=koltuk+tak%C4%B1m%C4%B1&isSearchCall=true&city_id=4000040&price=%5B-500%5D' },
	{ name: 'AGENT_06_TABLE', url: 'https://www.letgo.com/arama?query_text=masa+sandalye&isSearchCall=true&city_id=4000040&price=%5B-300%5D' },
	{ name: 'AGENT_07_CURTAINS', url: 'https://www.letgo.com/arama?query_text=perde+g%C3%BCne%C5%9Flik&isSearchCall=true&city_id=4000040&price=%5B-200%5D' },
	{ name: 'AGENT_08_RUGS', url: 'https://www.letgo.com/arama?query_text=hal%C4%B1+kilim&isSearchCall=true&city_id=4000040&price=%5B-250%5D' },
	{ name: 'AGENT_09_WARDROBE', url: 'https://www.letgo.com/arama?query_text=gard%C4%B1rop+dolap&isSearchCall=true&city_id=4000040&price=%5B-400%5D' },
	{ name: 'AGENT_10_SCAVENGER_MOVING', url: 'https://www.letgo.com/arama?query_text=ta%C5%9F%C4%B1n%C4%B1yorum+acil&isSearchCall=true&city_id=4000040&price=%5B-500%5D' },
	{ name: 'AGENT_10_SCAVENGER_FREE', url: 'https://www.letgo.com/arama?query_text=bedava+e%C5%9Fya&isSearchCall=true&city_id=4000040&price=%5B-100%5D' },
	{ name: 'AGENT_10_SCAVENGER_STUDENT', url: 'https://www.letgo.com/arama?query_text=%C3%B6%C4%9Frenciye+e%C5%9Fya&isSearchCall=true&city_id=4000040&price=%5B-200%5D' }
];

const path = require('path');

// AYARLAR
const MAX_CLICKS_PER_CATEGORY = 5;
const HEADLESS_MODE = true;
const OUTPUT_FILE = path.join(__dirname, 'data', 'raw_broad_scrape.json');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
	console.log("🚜 MULTI-HARVESTER INITIATED...");
	console.log(`🎯 Hedef: ${TASKS.length} Kategori | Çıktı: ${OUTPUT_FILE}`);

	// Mevcut veriyi oku (Duplicate kontrolü veya ekleme için)
	let masterData = [];
	if (fs.existsSync(OUTPUT_FILE)) {
		try {
			masterData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
			console.log(`📚 Mevcut Veri: ${masterData.length} kayıt yüklendi.`);
		} catch (e) { console.warn("Mevcut veri okunamadı, sıfırdan başlanıyor."); }
	}

	const browser = await puppeteer.launch({
		headless: HEADLESS_MODE,
		defaultViewport: null,
		args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
	});

	const page = await browser.newPage();

	// User Agent
	await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

	for (const task of TASKS) {
		console.log(`\n🚀 [${task.name}] Başlıyor...`);
		console.log(`   🔗 ${task.url}`);

		try {
			await page.goto(task.url, { waitUntil: 'networkidle2', timeout: 60000 });
			await sleep(2000);

			// 1. SCROLL & LOAD MORE LOOP
			let clickCount = 0;
			while (clickCount < MAX_CLICKS_PER_CATEGORY) {
				// En alta kaydır
				await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
				await sleep(1500);

				// Butonu bul ve tıkla
				const clicked = await page.evaluate(() => {
					const buttons = Array.from(document.querySelectorAll('button'));
					const btn = buttons.find(b => b.innerText && b.innerText.includes('Daha Fazla Yükle'));
					if (btn) {
						btn.click();
						return true;
					}
					return false;
				});

				if (clicked) {
					process.stdout.write('.'); // İlerleme çubuğu
					clickCount++;
					await sleep(3500 + Math.random() * 1000); // Doğal bekleme
				} else {
					console.log("\n   🛑 Sayfa sonu veya buton yok.");
					break;
				}
			}
			console.log("\n   ✅ Yükleme bitti. Veriler toplanıyor...");

			// 2. DATA EXTRACTION
			const newItems = await page.evaluate((agentName) => {
				const results = [];
				const cards = document.querySelectorAll('[data-slot="item-card"]');

				cards.forEach(card => {
					try {
						const linkEl = card.closest('a');
						const link = linkEl ? linkEl.href : window.location.href;

						// ID Parse
						let id = "lid_" + Math.random().toString(36).substr(2, 9);
						const idMatch = link.match(/iid-(\d+)/);
						if (idMatch) id = idMatch[1];

						// Body
						const bodySlot = card.querySelector('[data-slot="item-card-body"]');
						let title = "Bilinmiyor";
						let price = "0 TL";
						let loc = "Bilinmiyor";

						if (bodySlot) {
							const priceEl = bodySlot.querySelector('p.font-bold');
							if (priceEl) price = priceEl.innerText.trim();

							const titleCandidates = bodySlot.querySelectorAll('.line-clamp-1');
							titleCandidates.forEach(cand => {
								if (cand.tagName === 'DIV' && !cand.innerText.includes('TL')) {
									title = cand.innerText.trim();
								}
							});

							const locContainer = bodySlot.querySelector('.text-secondary-600');
							if (locContainer) loc = locContainer.innerText.trim();
						}

						// Image
						const imgEl = card.querySelector('img');
						const image = imgEl ? imgEl.src : "";

						results.push({
							id,
							title,
							price,
							location: loc,
							image,
							link,
							scrapedAt: new Date().toISOString(),
							verified_agent: agentName, // Hangi ajan buldu?
							category_tag: agentName // Kategori etiketi
						});

					} catch (err) { }
				});
				return results;
			}, task.name);

			console.log(`   💎 Bulunan: ${newItems.length} İlan.`);

			// 3. MERGE & DEDUP
			let addedCount = 0;
			newItems.forEach(validItem => {
				const exists = masterData.find(m => m.id === validItem.id);
				if (!exists) {
					masterData.push(validItem);
					addedCount++;
				}
			});
			console.log(`   ➕ Eklenen (Yeni): ${addedCount}`);

			// Kaydet (Her döngüde kaydet ki patlarsa veri kaybolmasın)
			fs.writeFileSync(OUTPUT_FILE, JSON.stringify(masterData, null, 2));

		} catch (error) {
			console.error(`   ❌ HATA: ${task.name} işlenemedi.`, error.message);
		}
	}

	await browser.close();
	console.log("\n🎉 TÜM GÖREVLER TAMAMLANDI!");
	console.log(`Toplam Veri: ${masterData.length} kayıt.`);
})();
