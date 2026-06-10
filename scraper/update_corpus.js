const fs = require('fs');
const path = require('path');

const corpusPath = path.join(__dirname, '../docs/agent_plan/SYSTEM_OPTIMIZATION_corpus.md');
const content = fs.readFileSync(corpusPath, 'utf8');

const codeIndex = content.indexOf('## KOD REFERANSLARI');

const newTop = `# SEYRANTEPE NEST - SYSTEM ARCHITECTURE CORPUS

## Proje Bağlamı (Context)
Bu proje (Seyrantepe Nest / The Hunter System), ikinci el eşya platformları üzerinden (özellikle Letgo) ev kurmak için ücretsiz veya çok ucuza (0-10 TL) eşya arayan, toplayan ve onaylayan bir otomasyon sistemidir. Amacımız, taşınan insanların veya öğrencilerin acil olarak ellerinden çıkarmak istedikleri "gerçekten bedava" veya çok ucuz fırsatları hızlıca yakalamaktır.

## Mevcut Veri Boru Hattı (Pipeline) Akışı
Mevcut sistemimiz 5 temel adımdan oluşmaktadır ve React tabanlı bir Frontend üzerinden yönetilmektedir:

1. **Data Harvesting (\`broad_harvester.js\` / \`scavenger_harvest.js\`)**
   Puppeteer kullanılarak hedeflenen kategorilerde veya özel anahtar kelimelerde (örn: "ücretsiz yatak") aramalar yapılır. İlan URL'leri, fiyatlar ve resimler toplanır.
2. **Link Checking (\`clean_raw_data.js\` / \`clean_final.js\`)**
   Toplanan ilanların URL'lerine tekrar Puppeteer ile gidilerek ilanın yayından kalkıp kalkmadığı veya yönlendirilip yönlendirilmediği kontrol edilir.
3. **Visual Verification (\`verify_listings.py\`)**
   HuggingFace CLIP modeli kullanılarak eşya fotoğrafının, başlık ile eşleşip eşleşmediği kontrol edilir.
4. **Data Enrichment (\`enrich_broad_data.js\`)**
   Canlı ve doğrulanmış ilanların detay sayfalarından açıklama (description) metinleri çekilir.
5. **Text Audit (\`audit_listings.js\`)**
   Metinler Regex kuralları ile taranarak ticari kelimeler ("toptan", "garantili") içerenler elenir.

## Mimari Görünüm
\`verified_data.json\` dosyasına yazılan nihai veriler, \`web-dashboard/app/page.tsx\` üzerinden okunur ve kullanıcı tarafında (LocalStorage) senkronize edilerek Tinder benzeri (Swipe) veya Grid yapısında sunulur.

`;

const finalContent = newTop + content.substring(codeIndex);
fs.writeFileSync(corpusPath, finalContent);
console.log('Corpus updated to be completely neutral and generalized.');
