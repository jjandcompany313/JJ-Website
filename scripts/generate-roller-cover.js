const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3894;
const rootDir = path.join(__dirname, '..');
const rollerImgDir = path.join(rootDir, 'assets', 'images', 'rollers');
const targetJpg = path.join(rootDir, 'assets', 'images', 'rollers-collection.jpg');
const targetWebp = path.join(rootDir, 'assets', 'images', 'rollers-collection.webp');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Wallfin Roller Cover Generator</title>
</head>
<body style="background:#111; margin:0; padding:20px; font-family: system-ui, sans-serif;">
  <h1 id="status" style="color:#fff;">Generating Wallfin Roller Cover Photo...</h1>
  <canvas id="canvas" width="1200" height="675" style="border:1px solid #333; max-width:100%;"></canvas>
  <script>
    async function loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    }

    async function generate() {
      try {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const W = canvas.width;
        const H = canvas.height;

        // 1. Studio Background: Ultra clean, bright commercial lighting
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        bgGrad.addColorStop(0, '#FFFFFF');
        bgGrad.addColorStop(0.5, '#F8FAFC');
        bgGrad.addColorStop(1, '#E2E8F0');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Soft studio spotlight
        const spotGrad = ctx.createRadialGradient(W / 2, H * 0.45, 100, W / 2, H * 0.45, 600);
        spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        spotGrad.addColorStop(0.6, 'rgba(241, 245, 249, 0.5)');
        spotGrad.addColorStop(1, 'rgba(226, 232, 240, 0)');
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, W, H);

        // 2. Rollers to feature in hero showcase
        const rollerFiles = [
          '/roller/wallfin-brown-9-inch.png',
          '/roller/wallfin-green-9-inch-38mm.png',
          '/roller/wallfin-yellow-9-inch.png',
          '/roller/wallfin-tiger-9-inch-38mm.png',
          '/roller/wallfin-blue-9-inch.png',
          '/roller/wallfin-foam-4-inch.png'
        ];

        const images = await Promise.all(rollerFiles.map(loadImage));

        // Ground shadow beneath rollers
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(W / 2, H - 75, 520, 26, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.14)';
        ctx.filter = 'blur(16px)';
        ctx.fill();
        ctx.restore();

        // Spacing and placement
        const total = images.length;
        const spacing = (W - 200) / (total - 1);
        const startX = 100;

        images.forEach((img, idx) => {
          ctx.save();
          const targetH = 430;
          const scale = targetH / img.height;
          const targetW = img.width * scale;

          const cx = startX + idx * spacing;
          // Curve: center rollers slightly closer to camera
          const arch = Math.sin((idx / (total - 1)) * Math.PI) * 25;
          const cy = H - 75 - targetH + arch;

          ctx.shadowColor = 'rgba(15, 23, 42, 0.24)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 14;
          ctx.shadowOffsetX = 0;

          ctx.drawImage(img, cx - targetW / 2, cy, targetW, targetH);
          ctx.restore();
        });

        // 3. Top Branding Header & Badges
        ctx.save();
        // Registered Trademark Badge
        const badgeText = 'REGISTERED BRAND • TM APP NO. 8027912';
        ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const badgeW = ctx.measureText(badgeText).width + 30;
        const badgeX = 50;
        const badgeY = 38;

        ctx.fillStyle = '#06392A';
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeW, 30, 15);
        ctx.fill();

        ctx.fillStyle = '#E8A317'; // Gold
        ctx.fillText('★ ' + badgeText, badgeX + 14, badgeY + 20);

        // Main Title
        ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#0F172A';
        ctx.fillText('WALLFIN™ PAINT ROLLERS & REFILLS', 50, badgeY + 70);

        // Subtitle
        ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText('In-House Manufactured at Jalgaon Depo • 20mm & 38mm Cores • 2" to 9" Sizes', 50, badgeY + 98);

        // Right side JJ & Company logo watermark
        ctx.textAlign = 'right';
        ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#06392A';
        ctx.fillText('JJ & COMPANY — JALGAON', W - 50, 56);

        ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#64748B';
        ctx.fillText('Wholesale & Dealer Network', W - 50, 78);

        ctx.restore();

        // 4. Send to server
        const jpgData = canvas.toDataURL('image/jpeg', 0.92);
        const webpData = canvas.toDataURL('image/webp', 0.88);

        await fetch('/save-cover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jpgData, webpData })
        });

        document.getElementById('status').innerText = 'Wallfin Roller Cover generated & saved!';
      } catch (err) {
        document.getElementById('status').innerText = 'Error: ' + err.message;
        await fetch('/error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: err.stack || err.message })
        });
      }
    }

    generate();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (parsedUrl.pathname.startsWith('/roller/')) {
    const filename = decodeURIComponent(parsedUrl.pathname.replace('/roller/', ''));
    const filePath = path.join(rollerImgDir, filename);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Roller image not found: ' + filePath);
    }
  } else if (parsedUrl.pathname === '/save-cover' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { jpgData, webpData } = JSON.parse(body);

        // Save JPG
        const jpgBase64 = jpgData.replace(/^data:image\/jpeg;base64,/, '');
        fs.writeFileSync(targetJpg, Buffer.from(jpgBase64, 'base64'));

        // Save WebP
        const webpBase64 = webpData.replace(/^data:image\/webp;base64,/, '');
        fs.writeFileSync(targetWebp, Buffer.from(webpBase64, 'base64'));

        console.log(`Successfully generated:\n- ${targetJpg}\n- ${targetWebp}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));

        setTimeout(() => {
          server.close();
          process.exit(0);
        }, 1000);
      } catch (err) {
        console.error('Error saving cover:', err);
        res.writeHead(500);
        res.end(err.message);
      }
    });
  } else if (parsedUrl.pathname === '/error' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.error('Browser generation error:', body);
      res.writeHead(500);
      res.end();
      server.close();
      process.exit(1);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Roller cover server running at http://localhost:${PORT}`);
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
