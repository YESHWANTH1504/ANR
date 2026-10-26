const fs = require('fs');
const path = require('path');

const pageDir = 'src/pages';
const files = fs.readdirSync(pageDir).filter(f => f.endsWith('.tsx'));

console.log('=== PAGE TITLE AUDIT ===');
for (const file of files) {
  const content = fs.readFileSync(path.join(pageDir, file), 'utf8');
  const titleMatch = /document\.title\s*=\s*([^;\n]+)/g;
  let match;
  let found = [];
  while ((match = titleMatch.exec(content)) !== null) {
    found.push(match[1].trim());
  }
  if (found.length > 0) {
    console.log(`${file}: ${found.join(' | ')}`);
  } else {
    console.log(`⚠️ ${file}: NO document.title set!`);
  }
}
