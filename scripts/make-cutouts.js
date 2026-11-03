const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function removeWhiteBackground(inputPath, outputPathPng, outputPathWebp) {
  try {
    const img = sharp(inputPath);
    const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const w = info.width;
    const h = info.height;
    const outData = Buffer.from(data);

    // BFS Flood Fill from all 4 boundaries
    const visited = new Uint8Array(w * h);
    const queueX = new Int32Array(w * h);
    const queueY = new Int32Array(w * h);
    let qHead = 0;
    let qTail = 0;

    function push(x, y) {
      if (x < 0 || x >= w || y < 0 || y >= h) return;
      const idx = y * w + x;
      if (visited[idx]) return;
      visited[idx] = 1;

      const pIdx = idx * 4;
      const a = data[pIdx + 3];
      // If already transparent, definitely flood through
      if (a === 0) {
        queueX[qTail] = x;
        queueY[qTail] = y;
        qTail++;
        return;
      }

      const r = data[pIdx];
      const g = data[pIdx + 1];
      const b = data[pIdx + 2];

      // White or off-white background threshold
      if (r > 230 && g > 230 && b > 230) {
        queueX[qTail] = x;
        queueY[qTail] = y;
        qTail++;
      }
    }

    // Seed all 4 borders
    for (let x = 0; x < w; x++) {
      push(x, 0);
      push(x, h - 1);
    }
    for (let y = 0; y < h; y++) {
      push(0, y);
      push(w - 1, y);
    }

    while (qHead < qTail) {
      const cx = queueX[qHead];
      const cy = queueY[qHead];
      qHead++;

      const idx = cy * w + cx;
      const pIdx = idx * 4;
      outData[pIdx + 3] = 0; // Transparent!

      push(cx + 1, cy);
      push(cx - 1, cy);
      push(cx, cy + 1);
      push(cx, cy - 1);
    }

    // Soft anti-aliasing / feathering on edge pixels
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        const pIdx = idx * 4;
        if (outData[pIdx + 3] > 0) {
          const hasTransNeighbor =
            outData[((y - 1) * w + x) * 4 + 3] === 0 ||
            outData[((y + 1) * w + x) * 4 + 3] === 0 ||
            outData[(y * w + (x - 1)) * 4 + 3] === 0 ||
            outData[(y * w + (x + 1)) * 4 + 3] === 0;

          if (hasTransNeighbor) {
            const r = outData[pIdx];
            const g = outData[pIdx + 1];
            const b = outData[pIdx + 2];
            if (r > 215 && g > 215 && b > 215) {
              const brightness = (r + g + b) / 3;
              const alphaFactor = Math.max(0, (255 - brightness) / 40);
              outData[pIdx + 3] = Math.round(255 * alphaFactor);
            }
          }
        }
      }
    }

    // Save PNG
    await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
      .trim()
      .png({ compressionLevel: 9 })
      .toFile(outputPathPng);

    // Save WebP
    await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
      .trim()
      .webp({ quality: 90 })
      .toFile(outputPathWebp);

    console.log(`Success: ${path.basename(inputPath)} (${qHead} trans pixels)`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err.message);
  }
}

async function run() {
  // 1. Process all rollers
  const rollerFiles = fs.readdirSync(path.join(__dirname, '../assets/images/rollers'))
    .filter(f => f.endsWith('.png'));
  for (const rf of rollerFiles) {
    const fullPath = path.join(__dirname, '../assets/images/rollers', rf);
    const webpPath = fullPath.replace(/\.png$/i, '.webp');
    await removeWhiteBackground(fullPath, fullPath, webpPath);
  }

  // 2. Process all brushes
  const brushFiles = fs.readdirSync(path.join(__dirname, '../assets/images/brushes'))
    .filter(f => f.endsWith('.png'));
  for (const bf of brushFiles) {
    const fullPath = path.join(__dirname, '../assets/images/brushes', bf);
    const webpPath = fullPath.replace(/\.png$/i, '.webp');
    await removeWhiteBackground(fullPath, fullPath, webpPath);
  }

  // 3. Create clean horizontal hero brush
  await sharp(path.join(__dirname, '../assets/images/brushes/panama-swan.png'))
    .rotate(270)
    .trim()
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../assets/images/brushes/hero-brush-horizontal.png'));

  await sharp(path.join(__dirname, '../assets/images/brushes/hero-brush-horizontal.png'))
    .webp({ quality: 90 })
    .toFile(path.join(__dirname, '../assets/images/brushes/hero-brush-horizontal.webp'));

  // 4. Create clean horizontal hero roller (Wallfin Yellow Line or Blue Line)
  await sharp(path.join(__dirname, '../assets/images/rollers/wallfin-yellow-9-inch-38mm.png'))
    .trim()
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, '../assets/images/rollers/hero-roller-isolated.png'));

  await sharp(path.join(__dirname, '../assets/images/rollers/hero-roller-isolated.png'))
    .webp({ quality: 90 })
    .toFile(path.join(__dirname, '../assets/images/rollers/hero-roller-isolated.webp'));

  console.log('All cutouts and hero images generated successfully!');
}

run();
