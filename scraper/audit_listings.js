const fs = require('fs-extra');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../web-dashboard/public/verified_data.json');

// --- AUDIT LOGIC ---
const RED_FLAGS = [
	'fiyat temsili', 'temsili fiyat', 'temsilidir',
	'fiyat bilgisi için', 'fiyat için', 'iletişime geçin',
	'fiyatı şu', 'fiyatı:', 'fiyat:', 'fiyatı ',
	'tanesi', 'adet fiyatı', 'tane fiyatı', 'birim fiyat',
	'ciddi alıcılar', 'pazarlık payı', 'pazarlık olur',
	'satılık', 'satıyorum', 'elden teslim', 'takas olur',
	'bin tl', '000 tl', 'tl dir', 'tl\'dir', 'lira'
];

const PLACEHOLDER_PATTERNS = [
	"letgo'da seni bekliyor",
	"ilanını keşfet",
	"Sıfırından uygun fiyata binlerce seçenek",
	"No description available.",
	"..."
];

function isPlaceholder(desc) {
	if (!desc || desc.length < 10) return true;
	for (const pattern of PLACEHOLDER_PATTERNS) {
		if (desc.includes(pattern)) return true;
	}
	return false;
}

const FREE_PROOF_KEYWORDS = [
	'ücretsiz', 'bedava', 'ucretsiz', 'gelin alın', 'gel al',
	'öğrenciye', 'ogrenciye', 'ihtiyaç sahibine', 'ihtiyac sahibine',
	'hediye', 'bağış', 'bagis', 'ücret istemiyorum', 'hayrına', 'hayrina'
];

const COMMERCIAL_KEYWORDS = [
	'imalattan', 'toptan', 'fabrikadan', 'üretici', 'mağaza', 'showroom',
	'kapıda ödeme', 'kredi kartı', 'taksit', 'stoktan', 'sipariş',
	'renk seçenekleri', 'özel ölçü', 'nakliye bizden', 'kurulum bizden'
];

function auditDescription(title, desc, priceStr) {
	if (!desc) return { isSafe: false, reason: "Açıklama bulunamadı." };

	const text = (title + " " + desc).toLowerCase();
	const priceVal = parseInt(priceStr.replace(/\D/g, '') || '0');

	// 1. Explicit RED FLAGS (Tuzaklar)
	for (const flag of RED_FLAGS) {
		if (text.includes(flag)) {
			return { isSafe: false, reason: `Yasaklı kelime bulundu: "${flag}"` };
		}
	}

	// 2. Commercial / Bulk Seller Detection (NEW)
	// "Imalattan", "Toptan", "Magaza" -> These are not second hand student items.
	for (const comm of COMMERCIAL_KEYWORDS) {
		if (text.includes(comm)) {
			return { isSafe: false, reason: `Ticari Satıcı Tespiti: "${comm}" (Öğrenci işi değil)` };
		}
	}

	// 3. Unrealistic Low Price Trap (6 TL - 50 TL range)
	// If it's a sofa, bed, fridge but price is 20 TL -> It's trap.
	// We assume anything < 50 TL except small items (rugs, curtains maybe) is suspicious if not explicitly free.
	// Rugs (Halı) can be cheap, but Washing Machine (Çamaşır Makinesi) cannot be 20 TL.
	if (priceVal > 5 && priceVal < 50) {
		// Allow rugs/curtains to be cheap-ish, but check strictly
		const isBigItem = text.includes('buzdolabı') || text.includes('çamaşır') || text.includes('koltuk') || text.includes('yatak') || text.includes('dolap');
		if (isBigItem) {
			return { isSafe: false, reason: `Gerçekçi Olmayan Fiyat: ${priceVal} TL (Bu fiyata bu eşya imkansız)` };
		}

		// Even for rugs, 22 TL is often a trap for "installment" or "sqm price"
		if (text.includes('halı') && (priceVal === 22 || priceVal === 32 || priceVal === 12)) {
			return { isSafe: false, reason: `Şüpheli m2/taksit fiyatı: ${priceVal} TL` };
		}
	}

	// 4. Extra Smart Search: High numbers in low-priced items
	if (priceVal < 10) {
		const numbers = text.match(/\d+/g);
		if (numbers) {
			for (let num of numbers) {
				const val = parseInt(num);
				if (val >= 200 && val < 20000 && ![2023, 2024, 2025, 2026].includes(val)) {
					return { isSafe: false, reason: `Düşük fiyata rağmen açıklamada yüksek tutar (${val}) bulundu.` };
				}
			}
		}
	}

	// 5. 🏁 THE ULTIMATE STRICT FILTER (The User's Request)
	// If price is 0-5 TL but NO "free" keywords are found in description, it's probably fake free.
	if (priceVal <= 5) {
		const hasFreeProof = FREE_PROOF_KEYWORDS.some(keyword => text.includes(keyword));
		if (!hasFreeProof) {
			return { isSafe: false, reason: "Açıklamada 'ücretsiz', 'bedava' veya 'öğrenciye' gibi açık bir ifade bulunmuyor." };
		}
	}

	return { isSafe: true };
}

(async () => {
	console.log("🧐 AGENT 13 (Auditor) denetime ve temizliğe başlıyor...");

	if (!fs.existsSync(DATA_FILE)) {
		console.error("❌ Veritabanı bulunamadı!");
		process.exit(1);
	}

	let db = fs.readJsonSync(DATA_FILE);
	let originalCount = db.length;
	let deletedCount = 0;
	let flaggedCount = 0;
	let safeCount = 0;

	// 1. Step: Remove Placeholders
	let cleanDb = db.filter(item => {
		if (isPlaceholder(item.description)) {
			deletedCount++;
			return false;
		}
		return true;
	});

	console.log(`🗑️  ${deletedCount} adet placeholder/anlamsız ilan silindi.`);

	// 2. Step: Audit for Price Traps
	const auditedDb = cleanDb.map(item => {
		const result = auditDescription(item.title, item.description, item.price);

		if (!result.isSafe) {
			flaggedCount++;
			return {
				...item,
				audit_status: 'flagged',
				audit_reason: result.reason
			};
		} else {
			safeCount++;
			return {
				...item,
				audit_status: 'safe'
			};
		}
	});

	// Save the results
	fs.writeJsonSync(DATA_FILE, auditedDb, { spaces: 2 });

	console.log("\n✅ İşlem Tamamlandı!");
	console.log(`📊 Başlangıç: ${originalCount}`);
	console.log(`🗑️  Silinen (Placeholder): ${deletedCount}`);
	console.log(`🚩 Şüpheli İşaretlenen: ${flaggedCount}`);
	console.log(`🛡️  Güvenli Kalan: ${safeCount}`);
	console.log(`\nFiltrelenen ilanlar artık dashboard'da 'audit_status' üzerinden ayrılabilir.`);
})();
