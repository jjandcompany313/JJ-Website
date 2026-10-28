const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const today = new Date().toISOString().split('T')[0];

const sitemapEntries = [
  // Core pages
  { url: 'https://jjandcompany.net/', changefreq: 'daily', priority: '1.0' },
  { url: 'https://jjandcompany.net/products.html', changefreq: 'weekly', priority: '0.9' },
  { url: 'https://jjandcompany.net/dealer.html', changefreq: 'weekly', priority: '0.9' },
  { url: 'https://jjandcompany.net/about.html', changefreq: 'monthly', priority: '0.7' },
  { url: 'https://jjandcompany.net/contact.html', changefreq: 'monthly', priority: '0.7' },
  { url: 'https://jjandcompany.net/privacy-policy.html', changefreq: 'yearly', priority: '0.3' },

  // Category Hubs
  { url: 'https://jjandcompany.net/products/rollers.html', changefreq: 'weekly', priority: '0.9' },
  { url: 'https://jjandcompany.net/products/brushes.html', changefreq: 'weekly', priority: '0.9' },
  { url: 'https://jjandcompany.net/products/accessories.html', changefreq: 'weekly', priority: '0.85' },

  // Location pages
  { url: 'https://jjandcompany.net/locations/jalgaon.html', changefreq: 'weekly', priority: '0.9' },
  { url: 'https://jjandcompany.net/locations/dhule.html', changefreq: 'weekly', priority: '0.85' },
  { url: 'https://jjandcompany.net/locations/nandurbar.html', changefreq: 'weekly', priority: '0.85' },
  { url: 'https://jjandcompany.net/locations/buldhana.html', changefreq: 'weekly', priority: '0.85' },
  { url: 'https://jjandcompany.net/locations/madhya-pradesh.html', changefreq: 'weekly', priority: '0.85' }
];

// Product pages
const productsData = JSON.parse(fs.readFileSync(path.join(rootDir, 'products.json'), 'utf8'));
productsData.products.forEach(p => {
  sitemapEntries.push({
    url: `https://jjandcompany.net/products/${p.id}.html`,
    changefreq: 'weekly',
    priority: '0.8'
  });
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

sitemapEntries.forEach(e => {
  xml += `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml, 'utf8');
console.log(`Generated standard XML sitemap with ${sitemapEntries.length} total URLs.`);
