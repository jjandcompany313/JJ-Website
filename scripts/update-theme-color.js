const fs = require('fs');

const files = [
  'index.html',
  'products.html',
  'dealer.html',
  'about.html',
  'contact.html',
  'privacy-policy.html',
  '404.html',
  'build-products.js',
  'build-locations.js'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/content="#(06392A|180D2B|0E051B)"/gi, 'content="#0D0714"');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated theme-color in ' + f);
  }
});
