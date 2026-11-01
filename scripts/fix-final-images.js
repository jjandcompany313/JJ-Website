const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function fixFinal4() {
  const list = [
    'assets/images/brushes/panama-996-pvc.png',
    'assets/images/brushes/panama-tynex-wooden.png',
    'assets/images/brushes/panama-winner.png',
    'assets/images/warehouse-brush-inventory.jpg'
  ];

  for (const rel of list) {
    const full = path.join(__dirname, '..', rel);
    if (!fs.existsSync(full)) continue;
    const buf = fs.readFileSync(full);
    const ext = path.extname(full).toLowerCase();
    let out;
    if (ext === '.png') {
      out = await sharp(buf).resize({ width: 420 }).png({ quality: 65, compressionLevel: 9, palette: true }).toBuffer();
    } else {
      out = await sharp(buf).resize({ width: 700 }).jpeg({ quality: 70, mozjpeg: true }).toBuffer();
    }
    fs.writeFileSync(full, out);
    console.log(`Final fix ${rel}: ${Math.round(out.length / 1024)} KB`);
  }
}

fixFinal4().catch(console.error);
