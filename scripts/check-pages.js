const fs = require('fs');

const pages = ['contact.html', 'dealer.html', 'products.html'];
pages.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i) || [])[1];
  const robots = (html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i) || [])[1];
  const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1];
  console.log('File: ' + file);
  console.log('  Title: ' + title);
  console.log('  Canonical: ' + canonical);
  console.log('  Robots: ' + (robots || 'index, follow (default)'));
});
