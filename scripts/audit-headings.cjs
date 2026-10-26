const fs = require('fs');
const path = require('path');

const pageFiles = fs.readdirSync('src/pages')
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join('src/pages', f));

console.log('=== PAGE COMPONENT AUDIT FOR H1 ===');
for (const p of pageFiles) {
  const content = fs.readFileSync(p, 'utf8');
  const h1Matches = (content.match(/<H1|<h1/g) || []).length;
  console.log(`${path.basename(p)}: Direct H1 count = ${h1Matches}`);
}
