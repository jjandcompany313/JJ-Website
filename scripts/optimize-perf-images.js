const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '..', 'assets', 'images');

async function optimizeImages() {
  console.log('--- Starting Targeted Image Optimization for PageSpeed CWV ---');

  // 1. Warehouse images
  const warehouseFiles = [
    'warehouse-brush-inventory',
    'warehouse-roller-assembly',
    'warehouse-aisle-stock',
    'warehouse-dispatch-dock'
  ];

  for (const name of warehouseFiles) {
    const srcJpg = path.join(imgDir, `${name}.jpg`);
    const outWebp = path.join(imgDir, `${name}.webp`);
    if (fs.existsSync(srcJpg)) {
      const info = await sharp(srcJpg)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 75, effort: 6 })
        .toFile(outWebp + '.tmp');
      fs.renameSync(outWebp + '.tmp', outWebp);
      console.log(`Optimized ${name}.webp: ${info.size} bytes (${Math.round(info.size / 1024)} KB)`);
    }
  }

  // 2. Category range banners
  const banners = [
    { name: 'accessories-range', width: 800, quality: 78 },
    { name: 'brushes-collection', width: 800, quality: 78 },
    { name: 'rollers-collection', width: 800, quality: 78 },
    { name: 'rollers-production', width: 800, quality: 78 }
  ];

  for (const b of banners) {
    const srcJpg = path.join(imgDir, `${b.name}.jpg`);
    const outWebp = path.join(imgDir, `${b.name}.webp`);
    const input = fs.existsSync(srcJpg) ? srcJpg : outWebp;
    if (fs.existsSync(input)) {
      const info = await sharp(input)
        .resize({ width: b.width, withoutEnlargement: true })
        .webp({ quality: b.quality, effort: 6 })
        .toFile(outWebp + '.tmp');
      fs.renameSync(outWebp + '.tmp', outWebp);
      console.log(`Optimized ${b.name}.webp: ${info.size} bytes (${Math.round(info.size / 1024)} KB)`);
    }
  }

  // 3. Hero Depo Building (Keep exact 800x600 resolution and visual fidelity)
  const heroJpg = path.join(imgDir, 'jj-company-building.jpg');
  const heroWebp = path.join(imgDir, 'jj-company-building.webp');
  if (fs.existsSync(heroJpg)) {
    const info = await sharp(heroJpg)
      .resize({ width: 800, height: 600, fit: 'cover' })
      .webp({ quality: 80, effort: 6 })
      .toFile(heroWebp + '.tmp');
    fs.renameSync(heroWebp + '.tmp', heroWebp);
    console.log(`Optimized jj-company-building.webp: ${info.size} bytes (${Math.round(info.size / 1024)} KB)`);
  }

  // 4. Video Poster
  const posterJpg = path.join(imgDir, 'jj-intro-poster.jpg');
  const posterWebp = path.join(imgDir, 'jj-intro-poster.webp');
  if (fs.existsSync(posterJpg)) {
    const info = await sharp(posterJpg)
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toFile(posterWebp + '.tmp');
    fs.renameSync(posterWebp + '.tmp', posterWebp);
    console.log(`Optimized jj-intro-poster.webp: ${info.size} bytes (${Math.round(info.size / 1024)} KB)`);
  }

  // 5. Optimized Nav Logo (96x96 for 2x retina display at 44px/48px)
  const logoSrc = path.join(imgDir, 'jj-company-logo.png');
  const logoNavPng = path.join(imgDir, 'jj-company-logo-nav.png');
  const logoNavWebp = path.join(imgDir, 'jj-company-logo-nav.webp');
  if (fs.existsSync(logoSrc)) {
    const infoPng = await sharp(logoSrc)
      .resize({ width: 96, height: 96, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(logoNavPng + '.tmp');
    fs.renameSync(logoNavPng + '.tmp', logoNavPng);
    console.log(`Generated jj-company-logo-nav.png: ${infoPng.size} bytes`);

    const infoWebp = await sharp(logoSrc)
      .resize({ width: 96, height: 96, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90, effort: 6 })
      .toFile(logoNavWebp + '.tmp');
    fs.renameSync(logoNavWebp + '.tmp', logoNavWebp);
    console.log(`Generated jj-company-logo-nav.webp: ${infoWebp.size} bytes`);
  }

  console.log('--- Image Optimization Completed Successfully ---');
}

optimizeImages().catch(err => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
