
const fs = require('fs');
const path = require('path');

// 🎯 HEDEF KİTLE VE STRATEJİ
const CITY_ID = '4000040'; // İstanbul
const BASE_URL = 'https://www.letgo.com/arama';

// 1. Temel Kategoriler (Eşya Spesifik)
const CATEGORIES = [
	{ tag: 'FRIDGE', query: 'buzdolabı' },
	{ tag: 'WASHER', query: 'çamaşır makinesi' },
	{ tag: 'BED', q: 'yatak baza' },
	{ tag: 'SOFA', q: 'koltuk kanepe' },
	{ tag: 'TABLE', q: 'masa sandalye' },
	{ tag: 'RUGS', q: 'halı kilim' },
	{ tag: 'WARDROBE', q: 'dolap gardırop' }
];

// 2. Fırsat Anahtar Kelimeleri (Genel)
const OPPORTUNITY_KEYWORDS = [
	'taşınıyorum',
	'acil satılık',
	'öğrenciye',
	'bedava',
	'ücretsiz',
	'depo boşaltıyorum',
	'fazlalık'
];

// 3. Fiyat Aralıkları
const PRICE_RANGES = [
	{ label: 'FREE', min: 0, max: 5 },       // Tam Bedava veya Sembolik (0-5 TL)
	{ label: 'SYMBOLIC', min: 6, max: 100 }, // 100 TL'ye kadar
	{ label: 'CHEAP', min: 101, max: 300 }   // Ucuz (300 TL'ye kadar)
];

function generateUrls() {
	const tasks = [];

	// A. Kategori Bazlı Taramalar (Bedava/Ucuz Odaklı)
	CATEGORIES.forEach(cat => {
		PRICE_RANGES.forEach(price => {
			const finalQuery = cat.query ? cat.query : cat.q;

			// URL Oluştur
			const url = `${BASE_URL}?query_text=${encodeURIComponent(finalQuery)}&isSearchCall=true&city_id=${CITY_ID}&price=[${price.min}-${price.max}]`;

			tasks.push({
				id: `TASK_${cat.tag}_${price.label}`,
				type: 'CATEGORY_SCAN',
				category: cat.tag,
				strategy: price.label,
				url: url
			});
		});
	});

	// B. Fırsat Bazlı Taramalar (Tüm Kategoriler)
	OPPORTUNITY_KEYWORDS.forEach(keyword => {
		// Bu kelimeler için fiyat filtresi koymayalım veya geniş tutalım (0-100)
		// Çünkü "Taşınıyorum" diyen biri "1000 TL" yazıp pazarlıkla 200'e inebilir.
		// Ama biz yine de öğrenci bütçesi (max 500) diyelim.

		const url = `${BASE_URL}?query_text=${encodeURIComponent(keyword)}&isSearchCall=true&city_id=${CITY_ID}&price=[0-500]`;

		tasks.push({
			id: `TASK_OPPORTUNITY_${keyword.replace(/\s+/g, '_').toUpperCase()}`,
			type: 'OPPORTUNITY_SCAN',
			category: 'SCAVENGER',
			strategy: 'KEYWORD',
			url: url
		});
	});

	return tasks;
}

// Çıktıyı Kaydet
const tasks = generateUrls();
const outputPath = path.join(__dirname, 'data', 'tasks_queue.json');

// Klasör yoksa oluştur
if (!fs.existsSync(path.join(__dirname, 'data'))) {
	fs.mkdirSync(path.join(__dirname, 'data'));
}

fs.writeFileSync(outputPath, JSON.stringify(tasks, null, 2));

console.log(`✅ Query Engine Görevi Tamamlandı.`);
console.log(`📊 Toplam Görev Sayısı: ${tasks.length}`);
console.log(`📂 Çıktı: ${outputPath}`);
