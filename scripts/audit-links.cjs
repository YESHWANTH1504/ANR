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

const tels = new Set();
const mails = new Set();
const externals = new Set();

for (const file of getFiles('src')) {
  const txt = fs.readFileSync(file, 'utf8');
  let m;
  const telRe = /tel:([^"'\s>]+)/g;
  while ((m = telRe.exec(txt)) !== null) tels.add(m[1]);
  const mailRe = /mailto:([^"'\s>?]+)/g;
  while ((m = mailRe.exec(txt)) !== null) mails.add(m[1]);
  const extRe = /href=["'](https?:\/\/[^"'\s>]+)["']/g;
  while ((m = extRe.exec(txt)) !== null) externals.add(m[1]);
}

console.log('Tel targets:');
tels.forEach(t => console.log('  ', t));
console.log('Mail targets:');
mails.forEach(m => console.log('  ', m));
console.log('External targets:');
externals.forEach(e => console.log('  ', e));
