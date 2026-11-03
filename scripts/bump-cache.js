const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2] || '4.0';
const rootDir = path.join(__dirname, '..');

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
  const filePath = path.join(rootDir, f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace all occurrences of ?v=X.X with newVersion
    content = content.replace(/\?v=[0-9.]+/g, `?v=${newVersion}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Bumped cache version to v=${newVersion} in ${f}`);
  }
});
