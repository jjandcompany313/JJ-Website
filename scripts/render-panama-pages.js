const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3888;
const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'assets', 'images', 'brushes');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PDF Renderer</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  </script>
</head>
<body style="background:#fff; margin:0; padding:20px;">
  <h1 id="status">Starting render...</h1>
  <canvas id="canvas" style="display:none;"></canvas>
  <script>
    async function renderAll() {
      try {
        const loadingTask = pdfjsLib.getDocument('/catalog.pdf');
        const pdf = await loadingTask.promise;
        document.getElementById('status').innerText = 'PDF loaded, total pages: ' + pdf.numPages;

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        for (let i = 1; i <= pdf.numPages; i++) {
          document.getElementById('status').innerText = 'Rendering page ' + i + ' of ' + pdf.numPages;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for high resolution

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: ctx, viewport: viewport }).promise;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
          await fetch('/save-page', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: i, data: dataUrl })
          });
        }

        document.getElementById('status').innerText = 'All pages rendered successfully!';
        await fetch('/done', { method: 'POST' });
      } catch (err) {
        document.getElementById('status').innerText = 'Error: ' + err.message;
        await fetch('/error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: err.stack || err.message })
        });
      }
    }
    renderAll();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/render.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url === '/catalog.pdf') {
    const pdfPath = path.join(rootDir, 'JJ_Company_Panama_Brush_Catalog.pdf');
    const stat = fs.statSync(pdfPath);
    res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Length': stat.size });
    fs.createReadStream(pdfPath).pipe(res);
  } else if (req.url === '/save-page' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { page, data } = JSON.parse(body);
        const base64Data = data.replace(/^data:image\/jpeg;base64,/, '');
        const outFileName = `panama-page-${String(page).padStart(2, '0')}.jpg`;
        const outPath = path.join(outDir, outFileName);
        fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
        console.log(`Saved: assets/images/brushes/${outFileName}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        console.error('Error saving page:', e);
        res.writeHead(500);
        res.end(e.message);
      }
    });
  } else if (req.url === '/done' && req.method === 'POST') {
    console.log('Rendering complete!');
    res.writeHead(200);
    res.end('ok');
    setTimeout(() => {
      server.close();
      if (browserProcess) browserProcess.kill();
      process.exit(0);
    }, 1000);
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
  // Launch Chrome or Edge headless
  const chromePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  console.log(`Launching browser: ${chromePath}`);
  browserProcess = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-web-security',
    `http://localhost:${PORT}/render.html`
  ]);

  browserProcess.on('error', err => {
    console.error('Failed to spawn browser:', err);
    server.close();
    process.exit(1);
  });
});
