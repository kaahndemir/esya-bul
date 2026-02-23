
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

// CONFIG
const INPUT_FILE = path.join(__dirname, 'data', 'verified_broad_data.json');
const OUTPUT_FILE = path.join(__dirname, 'data', 'enriched_broad_data.json');
const CONCURRENCY = 6; // Increased for speed since we have many items
const SAVE_INTERVAL = 10;

// Random user agents to rotate
const USER_AGENTS = [
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
];

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	console.log(`🚀 SIBORG 4.0: ENRICHER (DEEP DIVE) [x${CONCURRENCY}]`);

	if (!fs.existsSync(INPUT_FILE)) {
		console.error(`❌ Girdi dosyası bulunamadı: ${INPUT_FILE}`);
		console.error("   Önce 'verify_listings.py' çalıştırmalısınız.");
		process.exit(1);
	}

	// Load Data
	let db = fs.readJsonSync(INPUT_FILE); // Start withverified items

	// If output file exists, maybe merge? For now, we assume we are enriching the input file directly or saving to new.
	// Let's copy input to output and work on output to support resume.
	if (fs.existsSync(OUTPUT_FILE)) {
		console.log("   🔄 Önceki zenginleştirme verisi bulundu, birleştiriliyor...");
		const existing = fs.readJsonSync(OUTPUT_FILE);
		// Merge logic could be complex. For simplicity, we just use the INPUT as master source of truth for "what needs to be done"
		// but if ID exists in OUTPUT with description, we skip.

		// Map existing descriptions
		const existingMap = new Map(existing.map(i => [i.id, i]));

		db = db.map(item => {
			if (existingMap.has(item.id)) {
				const old = existingMap.get(item.id);
				if (old.description) return old;
			}
			return item;
		});
	}

	// Filter items that need enrichment
	const todoItems = db.filter(item => !item.description || !item.realDate);

	console.log(`📊 Toplam Veri: ${db.length} | İşlenecek: ${todoItems.length}`);

	if (todoItems.length === 0) {
		console.log("✨ Yapılacak iş kalmadı!");
		process.exit(0);
	}

	const browser = await puppeteer.launch({
		headless: "new",
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-blink-features=AutomationControlled',
			'--window-size=1920,1080'
		]
	});

	let activeWorkers = 0;
	let itemsProcessed = 0;

	const processItem = async (item, workerId) => {
		const page = await browser.newPage();

		// Stealth Layout
		const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
		await page.setUserAgent(ua);
		await page.setViewport({ width: 1366 + Math.floor(Math.random() * 100), height: 768 + Math.floor(Math.random() * 100) });

		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'webdriver', { get: () => false });
		});

		await page.setRequestInterception(true);
		page.on('request', req => {
			if (['image', 'media', 'font'].includes(req.resourceType())) req.abort();
			else req.continue();
		});

		try {
			await page.goto(item.link, { waitUntil: 'networkidle2', timeout: 40000 });
			await page.mouse.move(100, 100);
			await sleep(500 + Math.random() * 1000);

			// Extract
			const extracted = await page.evaluate(() => {
				const res = { description: null, productionDate: null, location: null, isSold: false };

				// 1. JSON-LD
				try {
					const scripts = document.querySelectorAll('script[type="application/ld+json"]');
					for (let s of scripts) {
						const json = JSON.parse(s.innerText);
						const check = (obj) => {
							if (!obj) return;
							if (obj.description && !res.description) res.description = obj.description;
							if (obj.productionDate && !res.productionDate) res.productionDate = obj.productionDate;
						};
						check(json);
						if (json['@graph']) json['@graph'].forEach(check);
						if (json['@type'] === 'Product') check(json);
					}
				} catch (e) { }

				// 2. DOM Location fallback
				try {
					const locEl = Array.from(document.querySelectorAll('span')).find(el => el.innerText.includes(', İstanbul') || el.innerText.includes('İstanbul,'));
					if (locEl) res.location = locEl.innerText;
				} catch (e) { }

				// 3. Description Fallback
				if (!res.description) {
					const descEl = document.querySelector('div[data-testid="description"]');
					if (descEl) res.description = descEl.innerText;
				}

				// 4. Sold Check
				const body = document.body.innerText;
				if (body.includes('artık aktif değil') || body.includes('Satıldı')) res.isSold = true;

				return res;
			});

			// Update Item
			// Find index in master DB list
			const index = db.findIndex(x => x.id === item.id);
			if (index !== -1) {
				if (extracted.isSold) db[index].status = 'sold';
				if (extracted.description) db[index].description = extracted.description;
				if (extracted.productionDate) db[index].realDate = extracted.productionDate;
				if (extracted.location) db[index].location = extracted.location;

				db[index].last_enriched = new Date().toISOString();

				if (extracted.description || extracted.isSold) {
					console.log(`   [W${workerId}] ✅ ${extracted.isSold ? 'SOLD' : 'OK'}: ${item.id} (${item.title.substring(0, 15)}...)`);
				} else {
					console.log(`   [W${workerId}] ⚠️ NO DATA: ${item.id}`);
				}
			}

		} catch (error) {
			console.log(`   [W${workerId}] 🛑 ERR: ${item.id}`);
		} finally {
			await page.close();
		}
	};

	// Parallel Queue
	const queue = [...todoItems];
	const promises = [];

	while (queue.length > 0 || activeWorkers > 0) {
		while (activeWorkers < CONCURRENCY && queue.length > 0) {
			const item = queue.shift();
			activeWorkers++;
			const p = processItem(item, activeWorkers).then(() => {
				activeWorkers--;
				itemsProcessed++;
				if (itemsProcessed % SAVE_INTERVAL === 0) {
					fs.writeJsonSync(OUTPUT_FILE, db, { spaces: 2 });
				}
			});
			promises.push(p);
		}
		await sleep(200);
	}

	await Promise.all(promises);
	fs.writeJsonSync(OUTPUT_FILE, db, { spaces: 2 });
	console.log("\n🎉 ALL DONE.");
	await browser.close();
})();
