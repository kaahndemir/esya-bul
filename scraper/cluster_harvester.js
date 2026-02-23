
const { Cluster } = require('puppeteer-cluster');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

// CONFIG
const MAX_CONCURRENCY = 4; // Aynı anda 4 Tab
const CLICK_LIMIT = 8;     // Her görevde Load More'a kaç kez basılacağı
const TASK_FILE = path.join(__dirname, 'data', 'tasks_queue.json');
const DATA_DIR = path.join(__dirname, 'data');

// Helper: Sleep
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
	console.log("🚀 SIBORG 4.0: CLUSTER HARVESTER BAŞLATILIYOR (DEBUG MODE)...");

	// 1. Görev Listesini Oku
	let tasks = [];
	try {
		tasks = JSON.parse(fs.readFileSync(TASK_FILE, 'utf8'));
		console.log(`📋 Yüklendi: ${tasks.length} Görev`);
	} catch (e) {
		console.error("❌ Görev dosyası okunamadı (tasks_queue.json)");
		process.exit(1);
	}

	// 2. Cluster Başlat
	const cluster = await Cluster.launch({
		concurrency: Cluster.CONCURRENCY_CONTEXT,
		maxConcurrency: MAX_CONCURRENCY,
		puppeteerOptions: {
			headless: false, // Debug modunda açık
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
			defaultViewport: null
		},
		monitor: true
	});

	// 3. Görev Tanımı (Task Function)
	await cluster.task(async ({ page, data: task }) => {
		const { url, id, category, strategy } = task;
		console.log(`⚡ [${id}] Başlıyor: ${category} (${strategy})`);

		// Navigate
		try {
			await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
			await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
		} catch (err) {
			console.warn(`   ⚠️ [${id}] Sayfa yüklenemedi: ${err.message}`);
			return;
		}

		// Auto-Scroll Loop
		let clicks = 0;
		let noButtonCount = 0;

		while (clicks < CLICK_LIMIT) {
			await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
			await sleep(2000);

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
				clicks++;
				noButtonCount = 0;
				await sleep(3000 + Math.random() * 2000);
			} else {
				noButtonCount++;
				if (noButtonCount > 2) break;
				await sleep(2000);
			}
		}

		// Extract Data
		const items = await page.evaluate((taskId, catTag) => {
			const results = [];
			const cards = document.querySelectorAll('[data-slot="item-card"]');

			cards.forEach(card => {
				try {
					const linkEl = card.closest('a');
					const link = linkEl ? linkEl.href : window.location.href;

					let itemId = "lid_" + Math.random().toString(36).substr(2, 9);
					const idMatch = link.match(/iid-(\d+)/);
					if (idMatch) itemId = idMatch[1];

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

					const imgEl = card.querySelector('img');
					const image = imgEl ? imgEl.src : "";

					results.push({
						id: itemId,
						title,
						price,
						location: loc,
						image,
						link,
						scrapedAt: new Date().toISOString(),
						task_id: taskId,
						category_tag: catTag
					});
				} catch (e) { }
			});
			return results;
		}, id, category);

		// Save Chunk
		if (items.length > 0) {
			const chunkPath = path.join(DATA_DIR, `harvest_${id}.json`);
			fs.writeFileSync(chunkPath, JSON.stringify(items, null, 2));
			console.log(`   💾 [${id}] Kaydedildi: ${items.length} İlan`);
		} else {
			console.log(`   🚫 [${id}] Veri bulunamadı. Ekran görüntüsü alınıyor...`);
			try {
				// Ekran görüntüsü al (Data klasörüne)
				await page.screenshot({ path: path.join(DATA_DIR, `debug_${id}.png`) });
			} catch (e) {
				console.error("Screenshot error:", e);
			}
		}
	});

	// 4. Queue Tasks
	for (const task of tasks) {
		cluster.queue(task);
	}

	// 5. Wait & Close
	await cluster.idle();
	await cluster.close();

	console.log("🏁 TÜM GÖREVLER BİTTİ. BİRLEŞTİRME BAŞLIYOR...");

	// 6. MergeChunks
	const files = fs.readdirSync(DATA_DIR).filter(f => f.startsWith('harvest_') && f.endsWith('.json'));
	let totalItems = [];
	const seenIds = new Set();

	files.forEach(f => {
		try {
			const content = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
			content.forEach(item => {
				if (!seenIds.has(item.id)) {
					totalItems.push(item);
					seenIds.add(item.id);
				}
			});
		} catch (e) { }
	});

	const finalPath = path.join(DATA_DIR, 'raw_broad_scrape.json');
	fs.writeFileSync(finalPath, JSON.stringify(totalItems, null, 2));

	console.log(`🎉 BÜYÜK HASAT TAMAMLANDI!`);
	console.log(`📦 Toplam Eşsiz İlan: ${totalItems.length}`);
	console.log(`📁 Dosya: ${finalPath}`);

})();
