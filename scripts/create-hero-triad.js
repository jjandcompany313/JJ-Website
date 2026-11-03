const sharp = require('sharp');
const path = require('path');

async function createTriad() {
  // 1. Hero Brush (Horizontal, bristles pointing left, handle pointing right, transparent background)
  await sharp(path.join(__dirname, '../assets/images/brushes/panama-swan.png'))
    .rotate(270)
    .trim()
    .resize({ height: 110, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../assets/images/hero-brushes.png'));

  await sharp(path.join(__dirname, '../assets/images/hero-brushes.png'))
    .webp({ quality: 92 })
    .toFile(path.join(__dirname, '../assets/images/hero-brushes.webp'));

  console.log('Created hero-brushes.png & webp');

  // 2. Hero Roller Cover (Horizontal cylinder refill, transparent background)
  // Let's create a clean horizontal roller cover cylinder from wallfin-yellow-9-inch-38mm or yellow-9-inch
  const yellowMeta = await sharp(path.join(__dirname, '../assets/images/rollers/wallfin-yellow-9-inch.png')).metadata();
  await sharp(path.join(__dirname, '../assets/images/rollers/wallfin-yellow-9-inch.png'))
    .extract({
      left: 0,
      top: 0,
      width: yellowMeta.width,
      height: Math.floor(yellowMeta.height * 0.45)
    })
    .trim()
    .resize({ height: 110, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../assets/images/hero-roller-covers.png'));

  await sharp(path.join(__dirname, '../assets/images/hero-roller-covers.png'))
    .webp({ quality: 92 })
    .toFile(path.join(__dirname, '../assets/images/hero-roller-covers.webp'));

  console.log('Created hero-roller-covers.png & webp');

  // 3. Hero Roller Frame (Cage frame with handle or complete roller tool)
  // In wallfin-yellow-fix-4-inch-18mm.png, or rotating wallfin-yellow-fix or showing complete 38mm frame
  const greenMeta = await sharp(path.join(__dirname, '../assets/images/rollers/wallfin-green-9-inch-38mm.png')).metadata();
  await sharp(path.join(__dirname, '../assets/images/rollers/wallfin-green-9-inch-38mm.png'))
    .trim()
    .resize({ height: 130, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../assets/images/hero-roller-frames.png'));

  await sharp(path.join(__dirname, '../assets/images/hero-roller-frames.png'))
    .webp({ quality: 92 })
    .toFile(path.join(__dirname, '../assets/images/hero-roller-frames.webp'));

  console.log('Created hero-roller-frames.png & webp');
}

createTriad().catch(console.error);
