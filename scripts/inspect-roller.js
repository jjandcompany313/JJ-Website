const sharp = require('sharp');

async function inspect() {
  const meta = await sharp('assets/images/rollers/wallfin-yellow-9-inch.png').metadata();
  console.log('wallfin-yellow-9-inch:', meta);

  // Let's create an extract of the roller cover cylinder (the top portion)
  // Usually in a roller image, the cylinder is at the top horizontal
  // Let's check bounding box of the top 35% of the image
  const { data, info } = await sharp('assets/images/rollers/wallfin-yellow-9-inch.png').raw().toBuffer({ resolveWithObject: true });
  
  let topY = info.height, bottomCylinderY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const a = data[(y * info.width + x) * 4 + 3];
      if (a > 20) {
        if (y < topY) topY = y;
        // The cylinder usually spans wide across x
      }
    }
  }
  console.log('Top non-transparent pixel Y:', topY);
}

inspect();
