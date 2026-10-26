const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3898;
const rootDir = path.join(__dirname, '..');
const imgDir = path.join(rootDir, 'assets', 'images');

// Find all JPG and PNG files in assets/images (recursively)
function getImages(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      res = res.concat(getImages(full));
    } else if (/\.(jpe?g|png)$/i.test(f) && !f.includes('logo') && !f.includes('favicon')) {
      const rel = path.relative(imgDir, full).replace(/\\/g, '/');
      const webpName = full.replace(/\.(jpe?g|png)$/i, '.webp');
      if (!fs.existsSync(webpName)) {
        res.push({ rel, full, webpName });
      }
    }
  });
  return res;
}

const imagesToConvert = getImages(imgDir);
console.log('Found', imagesToConvert.length, 'images needing WebP conversion.');

if (imagesToConvert.length === 0) {
  console.log('All images already have WebP versions!');
  process.exit(0);
}

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <div id="log"></div>
  <canvas id="canvas"></canvas>
  <script>
    const items = ${JSON.stringify(imagesToConvert.map(x => x.rel))};
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    async function loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    }

    async function run() {
      for (const rel of items) {
        try {
          const img = await loadImage('/img/' + encodeURIComponent(rel));
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, img.width, img.height);
          ctx.drawImage(img, 0, 0);

          const webpData = canvas.toDataURL('image/webp', 0.85);
          await fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rel, webpData })
          });
        } catch(e) {
          console.error('Error on ' + rel, e);
        }
      }
      await fetch('/done', { method: 'POST' });
    }

    window.onload = run;
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, `http://localhost:${PORT}`);

  if (parsed.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (parsed.pathname.startsWith('/img/')) {
    const rel = decodeURIComponent(parsed.pathname.replace('/img/', ''));
    const filePath = path.join(imgDir, rel);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  } else if (parsed.pathname === '/save' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { rel, webpData } = JSON.parse(body);
        const webpPath = path.join(imgDir, rel.replace(/\.(jpe?g|png)$/i, '.webp'));
        const base64 = webpData.replace(/^data:image\/webp;base64,/, '');
        fs.writeFileSync(webpPath, Buffer.from(base64, 'base64'));
        console.log('Saved WebP:', rel);
        res.writeHead(200);
        res.end('OK');
      } catch(e) {
        res.writeHead(500);
        res.end(e.message);
      }
    });
  } else if (parsed.pathname === '/done' && req.method === 'POST') {
    res.writeHead(200);
    res.end('OK');
    console.log('Batch WebP conversion complete!');
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
  console.log(`WebP converter listening at http://localhost:${PORT}`);
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
