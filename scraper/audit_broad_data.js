
const fs = require('fs-extra');
const path = require('path');
const { Parser } = require('json2csv');

const INPUT_FILE = path.join(__dirname, 'data', 'enriched_broad_data.json');
const OUTPUT_FILE = path.join(__dirname, 'data', 'audited_broad_data.json');
const DASHBOARD_FILE = path.join(__dirname, '../web-dashboard/public/verified_data.json');
const REPORT_FILE = path.join(__dirname, 'data', 'audit_report.csv');

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
			return { isSafe: false, reason: `Yasaklı kelime: "${flag}"` };
		}
	}

	// 2. Commercial / Bulk Seller Detection
	for (const comm of COMMERCIAL_KEYWORDS) {
		if (text.includes(comm)) {
			return { isSafe: false, reason: `Ticari Satıcı: "${comm}"` };
		}
	}

	// 3. Unrealistic Low Price Trap (6 TL - 50 TL range)
	if (priceVal > 5 && priceVal < 50) {
		const isBigItem = text.includes('buzdolabı') || text.includes('çamaşır') || text.includes('koltuk') || text.includes('yatak') || text.includes('dolap');
		if (isBigItem) {
			return { isSafe: false, reason: `Gerçekçi Olmayan Fiyat: ${priceVal} TL` };
		}

		// Halı tuzakları (m2 fiyatı)
		if (text.includes('halı') && (priceVal >= 10 && priceVal <= 40)) {
			return { isSafe: false, reason: `Şüpheli m2 fiyatı olasılığı: ${priceVal} TL` };
		}
	}

	// 4. Fake Free Check (0-5 TL but no 'Free' keywords)
	if (priceVal <= 5) {
		const hasFreeProof = FREE_PROOF_KEYWORDS.some(keyword => text.includes(keyword));
		if (!hasFreeProof) {
			return { isSafe: false, reason: "Bedava kanıtı yok (Fake Free)" };
		}
	}

	return { isSafe: true };
}

(async () => {
	console.log("🧐 AGENT 13 (v4.0): STRICT AUDITOR");

	if (!fs.existsSync(INPUT_FILE)) {
		console.error(`❌ Girdi dosyası bulunamadı: ${INPUT_FILE}`);
		console.error("   Önce 'enrich_broad_data.js' çalıştırmalısınız.");
		process.exit(1);
	}

	let db = fs.readJsonSync(INPUT_FILE);
	let originalCount = db.length;

	// Stats
	const stats = {
		deleted: 0,
		flagged: 0,
		safe: 0,
		reasons: {}
	};

	// 1. Step: Remove Placeholders
	let cleanDb = db.filter(item => {
		if (isPlaceholder(item.description)) {
			stats.deleted++;
			return false;
		}
		return true;
	});

	// 2. Step: Audit Logic
	const auditedDb = cleanDb.map(item => {
		const result = auditDescription(item.title, item.description, item.price);

		if (!result.isSafe) {
			stats.flagged++;

			// Count reasons
			stats.reasons[result.reason] = (stats.reasons[result.reason] || 0) + 1;

			return {
				...item,
				audit_status: 'flagged',
				audit_reason: result.reason
			};
		} else {
			stats.safe++;
			return {
				...item,
				audit_status: 'safe'
			};
		}
	});

	// Sort: Safe first
	auditedDb.sort((a, b) => (a.audit_status === 'safe' ? -1 : 1));

	// Save JSON
	fs.writeJsonSync(OUTPUT_FILE, auditedDb, { spaces: 2 });

	// Publish to Dashboard
	try {
		fs.writeJsonSync(DASHBOARD_FILE, auditedDb, { spaces: 2 });
		console.log(`🚀 Dashboard Güncellendi: ${DASHBOARD_FILE}`);
	} catch (e) {
		console.error("Dashboard güncellenemedi:", e);
	}

	// Generate CSV Report
	try {
		const fields = ['id', 'title', 'price', 'audit_status', 'audit_reason', 'link'];
		const json2csvParser = new Parser({ fields });
		const csv = json2csvParser.parse(auditedDb);
		fs.writeFileSync(REPORT_FILE, csv);
	} catch (e) { }

	console.log("\n✅ DENETİM TAMAMLANDI!");
	console.log(`📊 Toplam İlan: ${originalCount}`);
	console.log(`🗑️  Silinen (Boş İçerik): ${stats.deleted}`);
	console.log(`🚩 Bayraklanan (Riskli): ${stats.flagged}`);
	console.log(`🛡️  GÜVENLİ (SAFE): ${stats.safe}`);

	console.log("\n🚩 Reddedilme Nedenleri:");
	Object.keys(stats.reasons).forEach(r => {
		console.log(`   - ${r}: ${stats.reasons[r]}`);
	});

	console.log(`\n📁 Çıktı: ${OUTPUT_FILE}`);
})();
