const fs = require('fs');

const files = [
  '404.html',
  'about.html',
  'contact.html',
  'dealer.html',
  'index.html',
  'privacy-policy.html',
  'products.html',
  'build-locations.js',
  'build-products.js'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/\?v=2\.[0-7]/g, '?v=3.0');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Bumped cache version in ' + f);
  }
});
