const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      res = res.concat(getFiles(p));
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      res.push(p);
    }
  }
  return res;
}

const internalLinks = new Map();
const linkRegex = /(?:to|href)=["'](\/[^"'#?]*)["']/g;
const navHrefRegex = /href:\s*["'](\/[^"'#?]*)["']/g;

for (const file of getFiles('src')) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1];
    if (!internalLinks.has(link)) internalLinks.set(link, new Set());
    internalLinks.get(link).add(file);
  }
  while ((match = navHrefRegex.exec(content)) !== null) {
    const link = match[1];
    if (!internalLinks.has(link)) internalLinks.set(link, new Set());
    internalLinks.get(link).add(file);
  }
}

const validStaticRoutes = new Set([
  '/',
  '/about',
  '/leadership',
  '/academics',
  '/departments',
  '/programmes',
  '/admissions',
  '/admission',
  '/campus-life',
  '/facilities',
  '/placements',
  '/news',
  '/gallery',
  '/blog',
  '/committees',
  '/contact',
  '/design-system',
  // Valid known dynamic slugs
  '/programmes/computer-science',
  '/programmes/mathematics',
  '/programmes/bcom',
  '/programmes/corporate-secretaryship',
  '/programmes/bba',
  '/programmes/mcom',
  '/news/nss-special-camp-vadamavandal',
  '/news/inter-departmental-symposium',
  '/news/social-welfare-awareness-programme',
]);

console.log('=== INTERNAL LINKS FOUND ===');
const invalid = [];
for (const [link, files] of internalLinks.entries()) {
  const isValid = validStaticRoutes.has(link) || 
    link.startsWith('/programmes/') || 
    link.startsWith('/news/') || 
    link.startsWith('/blog/');
  
  if (!isValid) {
    invalid.push({ link, files: Array.from(files) });
  } else {
    console.log(`✓ ${link} (${files.size} occurrences)`);
  }
}

if (invalid.length > 0) {
  console.log('\n=== POTENTIALLY INVALID OR UNMATCHED LINKS ===');
  invalid.forEach(inv => {
    console.log(`❌ ${inv.link}`);
    inv.files.forEach(f => console.log(`   in ${f}`));
  });
} else {
  console.log('\nAll internal links match registered or dynamic routes!');
}
