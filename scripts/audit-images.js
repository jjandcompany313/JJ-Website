const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      res = res.concat(getFiles(full));
    } else if (/\.(jpe?g|png|webp|gif|svg)$/i.test(f)) {
      res.push({ file: full, size: stat.size, rel: path.relative('.', full).replace(/\\/g, '/') });
    }
  });
  return res;
}

const images = getFiles('assets/images');
const over100k = images.filter(i => i.size > 100 * 1024);

console.log(`Total images: ${images.length}`);
console.log(`Images over 100 kB: ${over100k.length}`);
over100k.sort((a, b) => b.size - a.size).forEach(i => {
  console.log(`${Math.round(i.size / 1024)} KB: ${i.rel}`);
});
