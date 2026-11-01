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
  console.log('--- Scanning assets/images for images > 90 KB ---');
  const allImages = getFiles('assets/images');
  const overThreshold = allImages.filter(i => i.size > 90 * 1024);
  console.log(`Found ${overThreshold.length} image files over 90 KB.`);

  for (const img of overThreshold) {
    const ext = path.extname(img.full).toLowerCase();
    const tmp = img.full + '.tmp';

    try {
      if (ext === '.webp') {
        const metadata = await sharp(img.full).metadata();
        const targetWidth = metadata.width > 800 ? 800 : metadata.width;
        await sharp(img.full)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 })
          .toFile(tmp);
        fs.renameSync(tmp, img.full);
        const newSize = fs.statSync(img.full).size;
        console.log(`Compressed WebP: ${img.rel} -> ${Math.round(newSize / 1024)} KB`);
      } else if (ext === '.jpg' || ext === '.jpeg') {
        const metadata = await sharp(img.full).metadata();
        const targetWidth = metadata.width > 800 ? 800 : metadata.width;
        await sharp(img.full)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .jpeg({ quality: 75, mozjpeg: true })
          .toFile(tmp);
        fs.renameSync(tmp, img.full);
        const newSize = fs.statSync(img.full).size;
        console.log(`Compressed JPEG: ${img.rel} -> ${Math.round(newSize / 1024)} KB`);
      } else if (ext === '.png') {
        const metadata = await sharp(img.full).metadata();
        const targetWidth = metadata.width > 600 ? 600 : metadata.width;
        // Also produce an ultra-optimized WebP if it's a product image
        await sharp(img.full)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .png({ quality: 75, compressionLevel: 9 })
          .toFile(tmp);
        fs.renameSync(tmp, img.full);
        const newSize = fs.statSync(img.full).size;
        console.log(`Compressed PNG: ${img.rel} -> ${Math.round(newSize / 1024)} KB`);
      }
    } catch (err) {
      console.error(`Error compressing ${img.rel}:`, err.message);
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  }

  console.log('\n--- Checking final image sizes ---');
  const finalCheck = getFiles('assets/images').filter(i => i.size > 100 * 1024);
  console.log(`Images still over 100 KB: ${finalCheck.length}`);
  finalCheck.forEach(i => console.log(`${Math.round(i.size / 1024)} KB: ${i.rel}`));
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
