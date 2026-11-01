const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      res = res.concat(getFiles(full));
    } else if (/\.(jpe?g|png|webp)$/i.test(f)) {
      res.push({ full, size: stat.size, rel: path.relative('.', full).replace(/\\/g, '/') });
    }
  });
  return res;
}

async function run() {
  const images = getFiles('assets/images');
  const over100k = images.filter(i => i.size > 95 * 1024);
  console.log(`Processing ${over100k.length} images over 95 KB...`);

  for (const img of over100k) {
    const ext = path.extname(img.full).toLowerCase();
    const inputBuf = fs.readFileSync(img.full);

    try {
      let outBuf;
      if (ext === '.webp') {
        outBuf = await sharp(inputBuf)
          .resize({ width: 750, withoutEnlargement: true })
          .webp({ quality: 72, effort: 6 })
          .toBuffer();
      } else if (ext === '.jpg' || ext === '.jpeg') {
        outBuf = await sharp(inputBuf)
          .resize({ width: 750, withoutEnlargement: true })
          .jpeg({ quality: 72, mozjpeg: true })
          .toBuffer();
      } else if (ext === '.png') {
        outBuf = await sharp(inputBuf)
          .resize({ width: 480, withoutEnlargement: true })
          .png({ quality: 70, compressionLevel: 9, palette: true })
          .toBuffer();
      }

      if (outBuf) {
        fs.writeFileSync(img.full, outBuf);
        console.log(`Reduced: ${img.rel} -> ${Math.round(outBuf.length / 1024)} KB`);
      }
    } catch (e) {
      console.error(`Error on ${img.rel}:`, e.message);
    }
  }

  const remaining = getFiles('assets/images').filter(i => i.size > 100 * 1024);
  console.log(`\nRemaining images over 100 KB: ${remaining.length}`);
  remaining.forEach(i => console.log(`${Math.round(i.size / 1024)} KB: ${i.rel}`));
}

run().catch(console.error);
