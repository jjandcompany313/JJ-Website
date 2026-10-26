const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3896;
const rootDir = path.join(__dirname, '..');
const rollerImgDir = path.join(rootDir, 'assets', 'images', 'rollers');
const brushImgDir = path.join(rootDir, 'assets', 'images', 'brushes');
const targetJpg = path.join(rootDir, 'assets', 'images', 'master-showcase-cover.jpg');
const targetWebp = path.join(rootDir, 'assets', 'images', 'master-showcase-cover.webp');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Master Showcase Cover Generator</title>
</head>
<body style="background:#111; margin:0; padding:20px; font-family: system-ui, sans-serif;">
  <h1 id="status" style="color:#fff;">Generating Combined Master Showcase Cover...</h1>
  <canvas id="canvas" width="1280" height="720" style="border:1px solid #333; max-width:100%;"></canvas>
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

        // 1. Studio Backdrop (Modern Light Architectural Gradient)
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        bgGrad.addColorStop(0, '#FFFFFF');
        bgGrad.addColorStop(0.55, '#F8FAFC');
        bgGrad.addColorStop(1, '#E2E8F0');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Studio Dual-Spotlight for Left (Rollers) and Right (Brushes)
        const leftSpot = ctx.createRadialGradient(W * 0.28, H * 0.5, 60, W * 0.28, H * 0.5, 450);
        leftSpot.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        leftSpot.addColorStop(0.5, 'rgba(241, 245, 249, 0.4)');
        leftSpot.addColorStop(1, 'rgba(226, 232, 240, 0)');
        ctx.fillStyle = leftSpot;
        ctx.fillRect(0, 0, W, H);

        const rightSpot = ctx.createRadialGradient(W * 0.72, H * 0.5, 60, W * 0.72, H * 0.5, 450);
        rightSpot.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        rightSpot.addColorStop(0.5, 'rgba(241, 245, 249, 0.4)');
        rightSpot.addColorStop(1, 'rgba(226, 232, 240, 0)');
        ctx.fillStyle = rightSpot;
        ctx.fillRect(0, 0, W, H);

        // 2. Load Real Items
        // Rollers (Left group)
        const rollerFiles = [
          '/roller/wallfin-green-9-inch-38mm.png',
          '/roller/wallfin-yellow-9-inch.png',
          '/roller/wallfin-tiger-9-inch-38mm.png',
          '/roller/wallfin-blue-9-inch.png'
        ];
        // Brushes (Right group)
        const brushFiles = [
          '/brush/panama-winner.png',
          '/brush/panama-tynex-wooden.png',
          '/brush/panama-222.png',
          '/brush/panama-swan.png'
        ];

        const [rollers, brushes] = await Promise.all([
          Promise.all(rollerFiles.map(loadImage)),
          Promise.all(brushFiles.map(loadImage))
        ]);

        // Ground Shadows
        ctx.save();
        // Rollers ground shadow
        ctx.beginPath();
        ctx.ellipse(W * 0.30, H - 70, 320, 22, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.16)';
        ctx.filter = 'blur(16px)';
        ctx.fill();

        // Brushes ground shadow
        ctx.beginPath();
        ctx.ellipse(W * 0.72, H - 70, 320, 22, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.16)';
        ctx.filter = 'blur(16px)';
        ctx.fill();
        ctx.restore();

        // Draw Rollers (Left Section: X from 60 to 580)
        const rollerSpacing = (520) / (rollers.length - 1);
        rollers.forEach((img, idx) => {
          ctx.save();
          const targetH = 430;
          const scale = targetH / img.height;
          const targetW = img.width * scale;

          const cx = 80 + idx * rollerSpacing;
          const arch = Math.sin((idx / (rollers.length - 1)) * Math.PI) * 20;
          const cy = H - 75 - targetH + arch;

          ctx.shadowColor = 'rgba(15, 23, 42, 0.22)';
          ctx.shadowBlur = 18;
          ctx.shadowOffsetY = 12;

          ctx.drawImage(img, cx - targetW / 2, cy, targetW, targetH);
          ctx.restore();
        });

        // Center Subtle Divider Line with Pill
        ctx.save();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(W / 2, 170);
        ctx.lineTo(W / 2, H - 90);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#CBD5E1';
        ctx.beginPath();
        ctx.roundRect(W / 2 - 28, H / 2 - 16, 56, 32, 16);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#06392A';
        ctx.textAlign = 'center';
        ctx.fillText('&', W / 2, H / 2 + 5);
        ctx.restore();

        // Draw Brushes (Right Section: X from 700 to 1220)
        const brushSpacing = (520) / (brushes.length - 1);
        brushes.forEach((img, idx) => {
          ctx.save();
          const targetH = 450;
          const scale = targetH / img.height;
          const targetW = img.width * scale;

          const cx = W / 2 + 80 + idx * brushSpacing;
          const arch = Math.sin((idx / (brushes.length - 1)) * Math.PI) * 20;
          const cy = H - 80 - targetH + arch;

          ctx.shadowColor = 'rgba(15, 23, 42, 0.22)';
          ctx.shadowBlur = 18;
          ctx.shadowOffsetY = 12;

          ctx.drawImage(img, cx - targetW / 2, cy, targetW, targetH);
          ctx.restore();
        });

        // 3. Top Header Branding
        ctx.save();
        // Top Badges
        // Left Badge
        ctx.fillStyle = '#06392A';
        ctx.beginPath();
        ctx.roundRect(60, 36, 260, 28, 14);
        ctx.fill();
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#E8A317';
        ctx.fillText('★ WALLFIN™ ROLLERS (TM: 8027912)', 76, 55);

        // Right Badge
        ctx.fillStyle = '#0F172A';
        ctx.beginPath();
        ctx.roundRect(W - 320, 36, 260, 28, 14);
        ctx.fill();
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#38BDF8';
        ctx.fillText('★ AUTHENTIC PANAMA BRUSHES', W - 304, 55);

        // Center Company Title
        ctx.textAlign = 'center';
        ctx.font = '800 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#0F172A';
        ctx.fillText('JJ & COMPANY — JALGAON', W / 2, 65);

        ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#06392A';
        ctx.fillText('DIRECT DEPO WHOLESALE SUPPLY NETWORK', W / 2, 92);

        ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = '#64748B';
        ctx.fillText('Maharashtra & Madhya Pradesh • Real Studio Product Lineup', W / 2, 114);

        ctx.restore();

        // 4. Send to server
        const jpgData = canvas.toDataURL('image/jpeg', 0.92);
        const webpData = canvas.toDataURL('image/webp', 0.88);

        await fetch('/save-cover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jpgData, webpData })
        });

        document.getElementById('status').innerText = 'Combined Master Showcase Cover generated & saved!';
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
  } else if (parsedUrl.pathname.startsWith('/brush/')) {
    const filename = decodeURIComponent(parsedUrl.pathname.replace('/brush/', ''));
    const filePath = path.join(brushImgDir, filename);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Brush image not found: ' + filePath);
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
  console.log(`Master showcase server running at http://localhost:${PORT}`);
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
