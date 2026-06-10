const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const OUTPUT_FILE = path.join(__dirname, 'data', 'raw_broad_scrape.json');
const MAX_CLICKS_PER_CATEGORY = 30; // Deep dive

const TASKS_CONFIG = [
	// Ücretsiz/Bedava Kelimeler (Sadece 0-10 TL)
	{ kw: "ücretsiz yatak", price: "[-10]" },
	{ kw: "ücretsiz koltuk", price: "[-10]" },
	{ kw: "ücretsiz dolap", price: "[-10]" },
	{ kw: "ücretsiz masa", price: "[-10]" },
	{ kw: "ücretsiz sandalye", price: "[-10]" },
	{ kw: "bedava yatak", price: "[-10]" },
	{ kw: "bedava koltuk", price: "[-10]" },
	{ kw: "bedava dolap", price: "[-10]" },
	{ kw: "bedava buzdolabı", price: "[-10]" },
	{ kw: "bedava toplu eşya", price: "[-10]" },

	// Davranışsal & Taşınma Kelimeleri (500 TL limitli, çünkü taşınanlar bazen sembolik fiyata satar)
	{ kw: "taşınıyorum", price: "[-500]" },
	{ kw: "öğrenci evi", price: "[-500]" },
	{ kw: "tayin nedeniyle", price: "[-500]" },
	{ kw: "ev boşaltma", price: "[-500]" },
	{ kw: "mezuniyet", price: "[-500]" },
	{ kw: "eşyaları satıyorum", price: "[-500]" },
	
	// Ürün Bazlı Ucuz Kelimeler (Masalar, sandalyeler, koltuklar, gardıroplar için ucuz limitler)
	{ kw: "sandalye", price: "[-150]" },
	{ kw: "masa sandalye", price: "[-300]" },
	{ kw: "karyola yatak", price: "[-400]" },
	{ kw: "gardırop", price: "[-500]" },
	{ kw: "çalışma masası", price: "[-200]" },
];

const TASKS = TASKS_CONFIG.map(task => ({
	name: `SCAVENGER_${task.kw.toUpperCase().replace(/ /g, '_')}`,
	url: `https://www.letgo.com/arama?query_text=${encodeURIComponent(task.kw)}&isSearchCall=true&city_id=4000040&price=${task.price}`
}));

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
	console.log("🚜 DUAL-LANE HARVESTER INITIATED (Categoric Firehose + Behavioral)...");
	
	let masterData = [];

	const browser = await puppeteer.launch({
		headless: false, // User wants to see the browser
		args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
	});

	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

	for (const task of TASKS) {
		console.log(`\n🚀 Arıyor: [${task.name}]`);
		try {
			await page.goto(task.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
			await sleep(2000);

			let clickCount = 0;
			while (clickCount < MAX_CLICKS_PER_CATEGORY) {
				await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
				await sleep(1500);

				const clicked = await page.evaluate(() => {
					const buttons = Array.from(document.querySelectorAll('button.btn'));
					const btn = buttons.find(b => {
						const text = b.innerText || '';
						return text.includes('Daha Fazla') || text.includes('Load More');
					});
					if (btn) {
						btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
						btn.click();
						return true;
					}
					return false;
				});

				if (clicked) {
					process.stdout.write('.');
					clickCount++;
					await sleep(2500);
				} else {
					break;
				}
			}
			console.log(`\n   ✅ Yükleme bitti (${clickCount} kez Daha Fazla tıklandı).`);

			const newItems = await page.evaluate((agentName) => {
				const findLink = (card) => {
					let curr = card;
					for (let i = 0; i < 3; i++) {
						if (!curr) break;
						if (curr.tagName === 'A' && curr.href && curr.href.includes('/item/')) {
							return curr.href;
						}
						const aInside = curr.querySelector('a[href*="/item/"]');
						if (aInside && aInside.href) {
							return aInside.href;
						}
						curr = curr.parentElement;
					}
					return "";
				};

				const results = [];
				const cards = document.querySelectorAll('[data-slot="item-card"]');
				cards.forEach(card => {
					try {
						const link = findLink(card);
						if (!link) return;

						let id = "lid_" + Math.random().toString(36).substr(2, 9);
						const idMatch = link.match(/iid-(\d+)/);
						if (idMatch) id = idMatch[1];
						const bodySlot = card.querySelector('[data-slot="item-card-body"]');
						let price = "0 TL", loc = "Bilinmiyor";

						if (bodySlot) {
							const priceEl = bodySlot.querySelector('p.font-bold');
							if (priceEl) price = priceEl.innerText.trim();
						}

						const imgEl = card.querySelector('img');
						const image = imgEl ? imgEl.src : "";
						const title = imgEl && imgEl.alt ? imgEl.alt : "Bilinmiyor";

						results.push({
							id, title, price, location: loc, image, link,
							scrapedAt: new Date().toISOString(),
							verified_agent: agentName,
							category_tag: agentName
						});
					} catch (err) { }
				});
				return results;
			}, task.name);

			let addedCount = 0;
			newItems.forEach(validItem => {
				const exists = masterData.find(m => m.id === validItem.id);
				if (!exists) {
					masterData.push(validItem);
					addedCount++;
				}
			});
			console.log(`   ➕ Eklenen (Yeni): ${addedCount} / Toplam Bulunan: ${newItems.length}`);

		} catch (error) {
			console.error(`   ❌ HATA`, error.message);
		}
	}

	await browser.close();
	
	// Save master data
	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(masterData, null, 2));
	console.log(`\n🎉 DUAL-LANE HARVESTER BİTTİ! Toplam ${masterData.length} taze potansiyel eşya toplandı.`);
})();
