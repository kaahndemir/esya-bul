const fs = require('fs');
const path = require('path');

const corpusPath = path.join(__dirname, '../docs/agent_plan/SYSTEM_OPTIMIZATION_corpus.md');
let corpus = fs.readFileSync(corpusPath, 'utf8');

corpus += '\n\n## FRONTEND KODLARI VE PROJE YAPISI\n\n';
corpus += 'Aşağıda uygulamanın arayüz (Dashboard) kodları ve genel proje klasör/dosya yapısı yer almaktadır. Dış AI, bu yapıya bakarak frontend tarafındaki State yönetimi (LocalStorage vs.) ve sunucu senkronizasyonunu da daha iyi optimize edebilir.\n\n';

// 1. Proje Yapısı (Basit Liste)
corpus += '### Genel Klasör Yapısı (Özet)\n```text\nseyrantepe_ev/\n├── docs/                 # Ajan ve protokol dokümantasyonları\n├── scraper/              # Backend, AI, Data Toplama ve Veri hattı (Node/Python)\n│   ├── data/             # JSON veritabanları (raw_broad_scrape.json vb.)\n│   ├── broad_harvester.js\n│   ├── clean_raw_data.js\n│   ├── verify_listings.py\n│   ├── enrich_broad_data.js\n│   └── audit_listings.js\n└── web-dashboard/        # Frontend UI (Next.js, Tailwind)\n    ├── public/\n    │   └── verified_data.json # Uygulamanın beslendiği son veri\n    ├── app/\n    │   ├── page.tsx      # Ana Dashboard UI (Swipe/Grid)\n    │   └── components/\n    │       └── ItemCard.tsx\n    ├── package.json\n    └── tailwind.config.ts\n```\n\n';

// 2. Dashboard Kodları
const frontendFiles = [
  '../web-dashboard/app/page.tsx',
  '../web-dashboard/app/components/ItemCard.tsx'
];

for (const file of frontendFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const ext = 'tsx';
    const code = fs.readFileSync(filePath, 'utf8');
    corpus += `### ${path.basename(file)}\n\`\`\`${ext}\n${code}\n\`\`\`\n\n`;
  }
}

fs.writeFileSync(corpusPath, corpus);
console.log('✅ Frontend kodları ve Proje Yapısı başarıyla Corpus dosyasına eklendi.');
