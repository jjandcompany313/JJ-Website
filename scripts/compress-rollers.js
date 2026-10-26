const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3892;
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'Wall Fin Roller');
const destDir = path.join(rootDir, 'assets', 'images', 'rollers');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Map filenames to clean web slugs
const fileMap = {
  '9 Inch Brown.png': 'wallfin-brown-9-inch',
  'Brown 6 Inch.png': 'wallfin-brown-6-inch',
  'Brown 4 Inch.png': 'wallfin-brown-4-inch',
  'Brown 2 Inch.png': 'wallfin-brown-2-inch',

  'Blue 9 Inch.png': 'wallfin-blue-9-inch',
  'Blue 6 Inch.png': 'wallfin-blue-6-inch',
  'Blue 4 Inch.png': 'wallfin-blue-4-inch',
  'Blue 2 Inch.png': 'wallfin-blue-2-inch',

  'Yellow 9 Inch.png': 'wallfin-yellow-9-inch',
  'Yellow 6 Inch.png': 'wallfin-yellow-6-inch',
  'Yellow 4 Inch.png': 'wallfin-yellow-4-inch',
  'Yellow 2 Inch.png': 'wallfin-yellow-2-inch',

  'Yellow 9 Inch 38mm.png': 'wallfin-yellow-9-inch-38mm',
  'Yellow Fix 6 Inch 18mm.png': 'wallfin-yellow-fix-6-inch-18mm',
  'Yellow Fix 4 Inch 18mm.png': 'wallfin-yellow-fix-4-inch-18mm',
  'Yellow Fix 2 Inch 18mm.png': 'wallfin-yellow-fix-2-inch-18mm',

  'Green 2 Inch.png': 'wallfin-green-2-inch',
  'Green 4 Inch.png': 'wallfin-green-4-inch',
  'Green 6 Inch.png': 'wallfin-green-6-inch',
  'Green 7 Inch 38mm.png': 'wallfin-green-7-inch-38mm',
  'Green 9 Inch 38mm.png': 'wallfin-green-9-inch-38mm',

  'Tiger 7Inch 38mm.png': 'wallfin-tiger-7-inch-38mm',
  'Tiger 9 Inch 38mm.png': 'wallfin-tiger-9-inch-38mm',

  'Texture 9 Inch.png': 'wallfin-texture-9-inch',
  'txt 7inch.jpeg': 'wallfin-texture-7-inch',

  'Foam 2 Inch.png': 'wallfin-foam-2-inch',
  'Foam 4 Inch.png': 'wallfin-foam-4-inch',
  'Foam 6 Inch.png': 'wallfin-foam-6-inch'
};

const fileList = Object.keys(fileMap);

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Compress Roller Images</title>
</head>
<body style="background:#111; color:#fff; font-family:sans-serif; padding:20px;">
  <h2>Compressing Roller Images to WebP &amp; PNG...</h2>
  <div id="log"></div>
  <canvas id="canvas" width="800" height="800" style="display:none;"></canvas>

  <script>
    const fileMap = ${JSON.stringify(fileMap)};
    const files = Object.keys(fileMap);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const log = document.getElementById('log');

    function logMsg(msg) {
      const p = document.createElement('div');
      p.textContent = msg;
      log.appendChild(p);
    }

    async function loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    }

    async function processFile(filename) {
      const slug = fileMap[filename];
      const srcUrl = '/source/' + encodeURIComponent(filename);
      logMsg('Loading ' + filename + '...');
      const img = await loadImage(srcUrl);

      // Clear canvas with transparent or clean white
      ctx.clearRect(0, 0, 800, 800);

      // Fit maintaining aspect ratio within 760x760 with 20px padding
      const maxDim = 760;
      let drawW, drawH;
      if (img.width >= img.height) {
        drawW = maxDim;
        drawH = Math.round((img.height / img.width) * maxDim);
      } else {
        drawH = maxDim;
        drawW = Math.round((img.width / img.height) * maxDim);
      }
      const x = Math.round((800 - drawW) / 2);
      const y = Math.round((800 - drawH) / 2);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, x, y, drawW, drawH);

      // Get WebP data URL (0.85 quality)
      const webpData = canvas.toDataURL('image/webp', 0.85);
      // Get PNG data URL
      const pngData = canvas.toDataURL('image/png');

      // Send to server
      await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, webpData, pngData })
      });

      logMsg('✓ Processed ' + slug);
    }

    async function runAll() {
      for (const f of files) {
        try {
          await processFile(f);
        } catch (err) {
          logMsg('❌ Error on ' + f + ': ' + err.message);
        }
      }
      logMsg('ALL_DONE');
      await fetch('/done', { method: 'POST' });
    }

    window.onload = runAll;
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (parsedUrl.pathname.startsWith('/source/')) {
    const filename = decodeURIComponent(parsedUrl.pathname.replace('/source/', ''));
    const filePath = path.join(srcDir, filename);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filename).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found: ' + filePath);
    }
  } else if (parsedUrl.pathname === '/save' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { slug, webpData, pngData } = JSON.parse(body);

        // Save WebP
        if (webpData) {
          const webpBase64 = webpData.replace(/^data:image\/webp;base64,/, '');
          const webpPath = path.join(destDir, `${slug}.webp`);
          fs.writeFileSync(webpPath, Buffer.from(webpBase64, 'base64'));
        }

        // Save PNG
        if (pngData) {
          const pngBase64 = pngData.replace(/^data:image\/png;base64,/, '');
          const pngPath = path.join(destDir, `${slug}.png`);
          fs.writeFileSync(pngPath, Buffer.from(pngBase64, 'base64'));
        }

        console.log(`Saved ${slug}.webp & ${slug}.png`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        console.error('Save error:', err);
        res.writeHead(500);
        res.end(err.message);
      }
    });
  } else if (parsedUrl.pathname === '/done' && req.method === 'POST') {
    res.writeHead(200);
    res.end('OK');
    console.log('Finished all roller compressions!');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 1000);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Image compressor listening at http://localhost:${PORT}`);
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `http://localhost:${PORT}/`
  ]);

  chrome.on('error', err => {
    console.error('Failed to launch Chrome:', err);
    server.close();
    process.exit(1);
  });
});
