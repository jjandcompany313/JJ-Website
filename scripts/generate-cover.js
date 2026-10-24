const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3889;
const rootDir = path.join(__dirname, '..');
const brushDir = path.join(rootDir, 'assets', 'images', 'brushes');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Cover Photo Generator</title>
</head>
<body style="background:#111; margin:0; padding:20px; font-family: system-ui, sans-serif;">
  <h1 id="status" style="color:#fff;">Generating Cover Photo...</h1>
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

        // 1. Studio Background (Premium clean gradient)
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        bgGrad.addColorStop(0, '#FFFFFF');
        bgGrad.addColorStop(0.6, '#F8FAFC');
        bgGrad.addColorStop(1, '#E2E8F0');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Soft radial spotlight behind the brushes
        const spotGrad = ctx.createRadialGradient(W / 2, H * 0.45, 80, W / 2, H * 0.45, 550);
        spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        spotGrad.addColorStop(0.5, 'rgba(241, 245, 249, 0.4)');
        spotGrad.addColorStop(1, 'rgba(226, 232, 240, 0)');
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, W, H);

        // 2. Load Selected Brushes for balanced showcase
        const brushFiles = [
          '/brush/panama-winner.png',
          '/brush/panama-222.png',
          '/brush/panama-swan.png',
          '/brush/panama-tynex-wooden.png',
          '/brush/panama-996-pvc.png',
          '/brush/panama-tip-top.png',
          '/brush/panama-cat-pure-bristol.png'
        ];

        const images = await Promise.all(brushFiles.map(loadImage));

        // Draw ground shadow ellipse
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(W / 2, H - 90, 480, 24, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
        ctx.filter = 'blur(16px)';
        ctx.fill();
        ctx.restore();

        // Spacing and positions for 7 brushes
        const total = images.length;
        const spacing = (W - 240) / (total - 1);
        const startX = 120;

        images.forEach((img, idx) => {
          ctx.save();
          const targetH = 460;
          const scale = targetH / img.height;
          const targetW = img.width * scale;

          const cx = startX + idx * spacing;
          // Slight arch height (center brushes slightly forward/higher)
          const arch = Math.sin((idx / (total - 1)) * Math.PI) * 20;
          const cy = H - 85 - targetH + arch;

          // Shadow for each brush
          ctx.shadowColor = 'rgba(15, 23, 42, 0.22)';
          ctx.shadowBlur = 18;
          ctx.shadowOffsetY = 12;
          ctx.shadowOffsetX = 0;

          ctx.drawImage(img, cx - targetW / 2, cy, targetW, targetH);
          ctx.restore();
        });

        // 3. Top Branding Badge / Header
        ctx.save();
        // Badge pill
        const badgeText = 'AUTHENTIC DIRECT IMPORT';
        ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const badgeW = ctx.measureText(badgeText).width + 32;
        const badgeX = 50;
        const badgeY = 40;

        ctx.fillStyle = '#06392A';
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeW, 32, 16);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(badgeText, badgeX + 16, badgeY + 21);

        // Title
        ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#0F172A';
        ctx.fillText('PANAMA PAINT BRUSHES', 50, badgeY + 74);

        // Subtitle
        ctx.font = '500 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText('100% Computerized Epoxy Bristle Potting • Zero Shedding • 1" to 5" Sizes', 50, badgeY + 104);

        // Right side JJ & Company logo watermark
        ctx.textAlign = 'right';
        ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#06392A';
        ctx.fillText('JJ & COMPANY — JALGAON', W - 50, 60);

        ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#64748B';
        ctx.fillText('Direct Wholesale Distribution', W - 50, 80);

        ctx.restore();

        // 4. Send back to server
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        await fetch('/save-cover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: dataUrl })
        });

        document.getElementById('status').innerText = 'Cover photo generated and saved!';
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
  if (req.url === '/' || req.url === '/cover.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url.startsWith('/brush/')) {
    const fileName = decodeURIComponent(req.url.replace('/brush/', ''));
    const filePath = path.join(brushDir, fileName);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  } else if (req.url === '/save-cover' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { data } = JSON.parse(body);
        const base64Data = data.replace(/^data:image\/jpeg;base64,/, '');
        const targetPath = path.join(rootDir, 'assets', 'images', 'brushes-collection.jpg');
        fs.writeFileSync(targetPath, Buffer.from(base64Data, 'base64'));
        console.log(`Saved: assets/images/brushes-collection.jpg (${(fs.statSync(targetPath).size / 1024).toFixed(1)} KB)`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
        setTimeout(() => {
          server.close();
          if (browserProcess) browserProcess.kill();
          process.exit(0);
        }, 1000);
      } catch (e) {
        console.error('Error saving cover:', e);
        res.writeHead(500);
        res.end(e.message);
      }
    });
  } else if (req.url === '/error' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.error('Browser render error:', body);
      res.writeHead(200);
      res.end('ok');
      server.close();
      if (browserProcess) browserProcess.kill();
      process.exit(1);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

let browserProcess = null;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  const chromePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  console.log(`Launching browser: ${chromePath}`);
  browserProcess = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-web-security',
    `http://localhost:${PORT}/cover.html`
  ]);

  browserProcess.on('error', err => {
    console.error('Failed to spawn browser:', err);
    server.close();
    process.exit(1);
  });
});
