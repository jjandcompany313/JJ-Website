const https = require('https');
const fs = require('fs');

const host = 'jjandcompany.net';
const key = 'a3f8b9e6c4d2417e95a082b13c7d6e5f';
const keyLocation = `https://${host}/${key}.txt`;

// Read all URLs from sitemap.xml
const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
const locMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g) || [];
const urlList = locMatches.map(m => m.replace(/<\/?loc>/g, '').trim());

console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

const payload = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList
});

const req = https.request('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  console.log(`IndexNow Response Status: ${res.statusCode} ${res.statusMessage}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('Successfully submitted to IndexNow! Search engines notified.');
    } else {
      console.log('IndexNow Response Body:', data || '(empty)');
    }
  });
});

req.on('error', (err) => {
  console.error('Error submitting to IndexNow:', err.message);
});

req.write(payload);
req.end();
