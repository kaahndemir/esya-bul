const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../web-dashboard/public/verified_data.json');
const CONCURRENCY = 2; // Reduced for stealth
const SAVE_INTERVAL = 5;

// Random user agents to rotate
const USER_AGENTS = [
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0'
];

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	console.log(`🚀 Starting AGENT 12 (v4.0): STEALTH EXTRACTION [x${CONCURRENCY}]`);

	if (!fs.existsSync(INPUT_FILE)) {
		console.error("❌ File not found"); process.exit(1);
	}

	let db = fs.readJsonSync(INPUT_FILE);
	// Prioritize items with no description
	const todoItems = db.filter(item => !item.description || !item.realDate);

	console.log(`📊 Processing ${todoItems.length} items...`);

	const browser = await puppeteer.launch({
		headless: "new",
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-blink-features=AutomationControlled', // Critical for stealth
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

		// Pass 'webdriver' check
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, 'webdriver', { get: () => false });
		});

		// Block media ONLY, allow scripts/styles for proper hydration if needed
		await page.setRequestInterception(true);
		page.on('request', req => {
			if (['image', 'media', 'font'].includes(req.resourceType())) req.abort();
			else req.continue();
		});

		try {
			// console.log(`   [W${workerId}] ⏳ Loading: ${item.id}`);
			await page.goto(item.link, { waitUntil: 'networkidle2', timeout: 40000 }); // Wait for network idle

			// Random mouse movement to simulate human
			await page.mouse.move(100, 100);
			await page.mouse.move(200, 200);

			await sleep(500 + Math.random() * 1000);

			// Extract
			const extracted = await page.evaluate(() => {
				const res = { description: null, productionDate: null, location: null, isSold: false };

				// 1. JSON-LD (Primary)
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
					// Try to find the location text by searching common element patterns if specific selector fails
					// The selector found by agent was a deeply nested path, let's try broadly finding the city name if we know target city
					// Just grab everything that looks like location?
					// Better: use the one stable-ish hook we might find or just skip location for now if it's too hard.
					// Actually, let's try the selector we found earlier via agent but generalized
					// 'div > span' containing ','?
					const locEl = Array.from(document.querySelectorAll('span')).find(el => el.innerText.includes(', İstanbul') || el.innerText.includes('İstanbul,'));
					if (locEl) res.location = locEl.innerText;
				} catch (e) { }

				// 3. Simple Description Fallback
				if (!res.description) {
					const descEl = document.querySelector('div[data-testid="description"]');
					if (descEl) res.description = descEl.innerText;
				}

				// 4. Sold
				const body = document.body.innerText;
				if (body.includes('Bu ilan artık aktif değil') || body.includes('Satıldı')) res.isSold = true;

				return res;
			});

			// console.log(`   [W${workerId}] 🔎 Result:`, extracted);

			// DB Update
			const index = db.findIndex(x => x.id === item.id);
			if (index !== -1) {
				let updated = false;
				if (extracted.isSold) {
					db[index].status = 'sold';
					updated = true;
					console.log(`   [W${workerId}] ❌ SOLD: ${item.id}`);
				}

				if (extracted.description || extracted.productionDate) {
					if (extracted.description) db[index].description = extracted.description;
					if (extracted.productionDate) db[index].realDate = extracted.productionDate;
					if (extracted.location) db[index].location = extracted.location;
					db[index].last_enriched = new Date().toISOString();
					console.log(`   [W${workerId}] ✅ SAVED: ${item.title.substring(0, 10)}... (Date: ${extracted.productionDate || 'N/A'})`);
					updated = true;
				}

				if (!updated) {
					console.log(`   [W${workerId}] ⚠️ EMPTY: ${item.id} (Bot check?)`);
				}
			}

		} catch (error) {
			// console.log(`   [W${workerId}] 🛑 ERR: ${item.id} - ${error.message}`);
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
					fs.writeJsonSync(INPUT_FILE, db, { spaces: 2 });
				}
			});
			promises.push(p);
		}
		await sleep(200);
	}

	await Promise.all(promises);
	fs.writeJsonSync(INPUT_FILE, db, { spaces: 2 });
	console.log("\n🎉 ALL DONE.");
	await browser.close();
})();
