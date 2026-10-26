const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(getFiles(p));
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) res.push(p);
  }
  return res;
}

const files = getFiles('src');
let totalImages = 0;
let missingAlt = 0;
let poorAlt = 0;

let nonLazyBelowFold = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Match <img ... /> or <Image ... />
  const imgRegex = /<(?:img|Image)\s+([^>]+)>/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    totalImages++;
    const attrs = match[1];
    const altMatch = /alt=(?:\{([^}]+)\}|["']([^"']*)["'])/.exec(attrs);
    if (!altMatch) {
      console.log(`Missing alt in ${file}: <img ${attrs.substring(0, 50)}...>`);
      missingAlt++;
    } else {
      const altValue = altMatch[1] || altMatch[2] || '';
      if (altValue.endsWith('.webp') || altValue.endsWith('.png') || altValue.endsWith('.jpg')) {
        console.log(`Poor alt (filename) in ${file}: alt="${altValue}"`);
        poorAlt++;
      }
    }

    const isHero = file.toLowerCase().includes('hero') || attrs.includes('fetchPriority');
    const isLogo = attrs.includes('logo') || attrs.includes('Seal') || attrs.includes('Meenakshi');
    const hasLazy = attrs.includes('loading="lazy"') || attrs.includes("loading='lazy'");
    if (!isHero && !isLogo && !hasLazy) {
      console.log(`Missing loading="lazy" in below-fold ${file}: ${attrs.substring(0, 60)}...`);
      nonLazyBelowFold++;
    }
  }
}

console.log(`\nImage Audit Summary:
Total images found: ${totalImages}
Missing alt: ${missingAlt}
Poor alt (filenames): ${poorAlt}
Non-lazy below-fold images: ${nonLazyBelowFold}`);
