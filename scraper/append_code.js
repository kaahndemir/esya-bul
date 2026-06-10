const fs = require('fs');
const path = require('path');

const corpusPath = path.join(__dirname, '../docs/agent_plan/SYSTEM_OPTIMIZATION_corpus.md');
let corpus = fs.readFileSync(corpusPath, 'utf8');

corpus += '\n\n## KOD REFERANSLARI (CODE REFERENCES)\n\n';
corpus += 'Aşağıda sistemin mevcut darboğazlarını analiz edebilmeniz için tüm ana modüllerin kaynak kodları bulunmaktadır.\n\n';

const files = [
  'broad_harvester.js',
  'clean_raw_data.js',
  'verify_listings.py',
  'enrich_broad_data.js',
  'audit_listings.js'
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let ext = path.extname(file).replace('.', '');
    if (ext === 'js') ext = 'javascript';
    if (ext === 'py') ext = 'python';
    const code = fs.readFileSync(filePath, 'utf8');
    corpus += `### ${file}\n\`\`\`${ext}\n${code}\n\`\`\`\n\n`;
  }
}

fs.writeFileSync(corpusPath, corpus);
console.log('✅ Bütün kaynak kodlar başarıyla Corpus dosyasına eklendi.');
