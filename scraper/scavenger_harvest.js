const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const KEYWORDS = [
    "ücretsiz yatak",
    "ücretsiz koltuk",
    "ücretsiz dolap",
    "ücretsiz masa",
    "ücretsiz buzdolabı",
    "ücretsiz çamaşır makinesi",
    "ücretsiz eşya",
    "ihtiyaç sahibine ücretsiz",
    "bedava yatak",
    "bedava dolap"
];

const TASKS = KEYWORDS.map(kw => ({
    name: `SCAVENGER_${kw.toUpperCase().replace(/ /g, '_')}`,
    url: `https://www.letgo.com/arama?query_text=${encodeURIComponent(kw)}&isSearchCall=true&city_id=4000040&price=[-10]`
}));

const OUTPUT_FILE = path.join(__dirname, 'data', 'raw_broad_scrape.json');
const MAX_CLICKS_PER_CATEGORY = 25;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
	console.log("🚜 SCAVENGER HARVESTER INITIATED (Ücretsiz Odaklı)...");
	
	let masterData = [];
	if (fs.existsSync(OUTPUT_FILE)) {
		try {
			masterData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
		} catch (e) { }
	}

	const browser = await puppeteer.launch({
		headless: "new",
		args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
	});

	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

	for (const task of TASKS) {
		console.log(`\n🚀 Arıyor: [${task.name}]`);
		try {
			await page.goto(task.url, { waitUntil: 'networkidle2', timeout: 60000 });
			await sleep(2000);

			let clickCount = 0;
			while (clickCount < MAX_CLICKS_PER_CATEGORY) {
				await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
				await sleep(1500);

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
					process.stdout.write('.');
					clickCount++;
					await sleep(3500);
				} else {
					break;
				}
			}
			console.log("\n   ✅ Yükleme bitti.");

			const newItems = await page.evaluate((agentName) => {
				const results = [];
				const cards = document.querySelectorAll('[data-slot="item-card"]');
				cards.forEach(card => {
					try {
						const linkEl = card.closest('a');
						const link = linkEl ? linkEl.href : "";
						if (!link) return;

						let id = "lid_" + Math.random().toString(36).substr(2, 9);
						const idMatch = link.match(/iid-(\d+)/);
						if (idMatch) id = idMatch[1];

						const bodySlot = card.querySelector('[data-slot="item-card-body"]');
						let title = "Bilinmiyor", price = "0 TL", loc = "Bilinmiyor";

						if (bodySlot) {
							const priceEl = bodySlot.querySelector('p.font-bold');
							if (priceEl) price = priceEl.innerText.trim();

							const titleCandidates = bodySlot.querySelectorAll('.line-clamp-1');
							titleCandidates.forEach(cand => {
								if (cand.tagName === 'DIV' && !cand.innerText.includes('TL')) {
									title = cand.innerText.trim();
								}
							});
						}

						const imgEl = card.querySelector('img');
						const image = imgEl ? imgEl.src : "";

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

			fs.writeFileSync(OUTPUT_FILE, JSON.stringify(masterData, null, 2));
		} catch (error) {
			console.error(`   ❌ HATA`, error.message);
		}
	}

	await browser.close();
	console.log(`\n🎉 SCAVENGER BİTTİ! Toplam ${masterData.length} "ücretsiz" eşya toplandı.`);
})();
