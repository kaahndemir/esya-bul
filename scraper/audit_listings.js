const fs = require('fs-extra');
const path = require('path');

const INPUT_FILE = path.join(__dirname, 'data', 'enriched_broad_data.json');
const OUTPUT_FILE = path.join(__dirname, 'data', 'audited_data.json');

// --- AUDIT LOGIC ---
const RED_FLAGS = [
	'fiyat temsili', 'temsili fiyat', 'temsilidir',
	'fiyat bilgisi için', 'fiyat için', 'iletişime geçin',
	'fiyatı şu', 'fiyatı:', 'fiyat:', 'fiyatı ',
	'tanesi', 'adet fiyatı', 'tane fiyatı', 'birim fiyat',
	'ciddi alıcılar', 'pazarlık payı', 'pazarlık olur',
	'satılık', 'satıyorum', 'elden teslim', 'takas olur',
	'bin tl', '000 tl', 'tl dir', 'tl\'dir', 'lira',
	'ücretsiz kargo', 'ücretsiz teslimat', 'bedava kargo', 'bedava teslimat',
	'imalat', 'toptan', 'kredi kartı', 'kredi karti', 'taksit',
	'bursa', 'ankara', 'izmir', 'adrese teslim', 'türkiye geneli', 'turkiye geneli', 'tüm illere'
];

const PLACEHOLDER_PATTERNS = [
	"letgo'da seni bekliyor",
	"ilanını keşfet",
	"Sıfırından uygun fiyata binlerce seçenek",
	"No description available.",
	"..."
];

function isPlaceholder(desc) {
	if (!desc) return true;
	if (desc.trim().length < 5) return true;

	for (const pattern of PLACEHOLDER_PATTERNS) {
		if (desc.toLowerCase().includes(pattern.toLowerCase())) {
			return true;
		}
	}
	return false;
}

function checkRedFlags(item) {
	const desc = (item.description || '').toLowerCase();
	const title = (item.title || '').toLowerCase();
	const location = (item.location || '').toLowerCase();

	// 1. Temsili fiyat, dış şehir ve yasaklı kelime kontrolü
	for (const flag of RED_FLAGS) {
		if (desc.includes(flag) || title.includes(flag) || location.includes(flag)) {
			return { isSafe: false, reason: `Ticari/Dış Şehir/Tuzak ifade bulundu: '${flag}'` };
		}
	}

	// 2. Fiyat 0 veya 1 ama açıklamada yüksek fiyat varsa
	if (item.price === 'Ücretsiz' || item.price === '0 TL' || item.price === '1 TL') {
		const numbersInDesc = desc.match(/\b\d+(?:[\.,]\d+)?\b/g);
		if (numbersInDesc) {
			for (const numStr of numbersInDesc) {
				const num = parseFloat(numStr.replace(',', '.'));
				if (num > 50 && num < 10000) {
					// Sadece yıl (1990, 2023 vb.) veya cm ölçüleri değilse:
					if (!desc.includes(`${num} cm`) && !desc.includes(`${num} yıl`) && num !== 2023 && num !== 2024) {
						return { isSafe: false, reason: `Açıklamada gizli fiyat tespit edildi (${num})` };
					}
				}
			}
		}
	}

	return { isSafe: true, reason: 'OK' };
}

(async () => {
	console.log(`🚀 SIBORG 4.0: AUDITOR (SCAM/COMMERCIAL FILTER)`);

	if (!fs.existsSync(INPUT_FILE)) {
		console.error(`❌ Data dosyası bulunamadı: ${INPUT_FILE}`);
		return;
	}

	const db = fs.readJsonSync(INPUT_FILE);
	const originalCount = db.length;

	let deletedCount = 0;
	let flaggedCount = 0;
	let safeCount = 0;

	// 1. Clean Placeholders (DISABLED: Letgo UI changes cause empty descriptions, we don't want to lose targeted free items)
	const cleanDb = db.filter(item => {
		return true;
	});

	// 2. Audit Listings
	const safeDb = [];
	
	cleanDb.forEach(item => {
		const result = checkRedFlags(item);
		if (!result.isSafe) {
			flaggedCount++;
			// We DO NOT push flagged items to save visual verifier time
		} else {
			safeCount++;
			safeDb.push({ ...item, audit_status: 'safe' });
		}
	});

	fs.writeJsonSync(OUTPUT_FILE, safeDb, { spaces: 2 });

	console.log("\n✅ İşlem Tamamlandı!");
	console.log(`📊 Başlangıç: ${originalCount}`);
	console.log(`🗑️  Silinen (Placeholder): ${deletedCount}`);
	console.log(`🚩 Şüpheli İşaretlenen (Elenen): ${flaggedCount}`);
	console.log(`🛡️  Güvenli Kalan (Göz Modeline Gidecek): ${safeCount}`);
})();
