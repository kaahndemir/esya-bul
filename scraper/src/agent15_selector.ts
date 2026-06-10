import fs from 'fs';
import path from 'path';

// Parse price string to number
function parsePrice(priceStr: string): number {
	if (!priceStr) return 0;
	const clean = priceStr.replace(/[^0-9]/g, '');
	return parseInt(clean) || 0;
}

// Calculate location score based on AGENT 15 rules
function getLocationScore(location: string): number {
	const loc = location.toLowerCase();
	if (loc.includes('kağıthane') || loc.includes('şişli') || loc.includes('eyüpsultan') || loc.includes('beşiktaş') || loc.includes('sarıyer')) {
		return 10;
	}
	if (loc.includes('pendik') || loc.includes('tuzla') || loc.includes('silivri')) {
		return 2;
	}
	return 5;
}

async function runSelector() {
	console.log('🏹 AGENT 15: Final Selector & Contact Planner running...');

	const dataDir = path.join(__dirname, '../data');
	const decisionsFile = path.join(dataDir, 'review_decisions.json');
	const enrichedDataFile = path.join(dataDir, 'verified_broad_data.json');
	const outputFile = path.join(dataDir, 'contact_queue.json');

	if (!fs.existsSync(decisionsFile) || !fs.existsSync(enrichedDataFile)) {
		console.error('Data files missing (review_decisions.json or verified_broad_data.json). Exiting.');
		return;
	}

	const decisions = JSON.parse(fs.readFileSync(decisionsFile, 'utf8'));
	const allData = JSON.parse(fs.readFileSync(enrichedDataFile, 'utf8'));

	const dataMap = new Map();
	for (const item of allData) {
		dataMap.set(item.id, item);
	}

	const approvedItems = decisions.filter((d: any) => d.decision === 'approved');
	console.log(`Found ${approvedItems.length} approved items in total.`);

	const targets: Record<string, number> = {
		'BED': 4,
		'FRIDGE': 2,
		'WASHER': 1,
		'SOFA': 3,
		'WARDROBE': 4,
		'TABLE': 3,
		'RUGS': 3,
		'SCAVENGER': 5
	};

	const categorizedItems: Record<string, any[]> = {};

	for (const approved of approvedItems) {
		let itemData = dataMap.get(approved.id);
		if (!itemData) {
			itemData = {
				id: approved.id,
				title: approved.title || '',
				price: approved.price || '0 TL',
				location: '',
				link: approved.link || '',
				confidence_score: 0
			};
		}

		const priceVal = parsePrice(itemData.price);
		const locScore = getLocationScore(itemData.location);
		const clipBonus = itemData.confidence_score >= 0.92 ? 5 : 0;
		const priceBonus = priceVal <= 50 ? 5 : (priceVal <= 200 ? 2 : 0);

		const totalScore = locScore + clipBonus + priceBonus;

		const merged = {
			id: itemData.id,
			category: approved.category,
			title: itemData.title,
			price: itemData.price,
			location: itemData.location || 'Unknown',
			link: itemData.link,
			totalScore: totalScore,
			status: 'pending',
			message_sent: false,
			contacted_at: null,
			response: null,
			notes: ''
		};

		if (!categorizedItems[approved.category]) {
			categorizedItems[approved.category] = [];
		}
		categorizedItems[approved.category].push(merged);
	}

	const contactQueue = [];

	for (const [category, items] of Object.entries(categorizedItems)) {
		if (category === 'UNKNOWN') continue;

		// Sort by score descending
		items.sort((a, b) => b.totalScore - a.totalScore);

		const targetCount = targets[category] || 2;
		const selected = items.slice(0, targetCount);

		// Add priority
		selected.forEach((item, index) => {
			item.priority = index + 1;
			delete item.totalScore;
			contactQueue.push(item);
		});

		console.log(`[${category}] Total Approved: ${items.length} -> Selected ${selected.length} items`);
	}

	fs.writeFileSync(outputFile, JSON.stringify(contactQueue, null, 2));
	console.log(`\n🎉 Generated contact_queue.json with ${contactQueue.length} items!`);
}

runSelector().catch(err => {
	console.error('Selector error:', err);
});
