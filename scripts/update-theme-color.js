const fs = require('fs');

const files = [
  'index.html',
  'products.html',
  'dealer.html',
  'about.html',
  'contact.html',
  'privacy-policy.html',
  '404.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/content="#06392A"/g, 'content="#180D2B"');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated theme-color in ' + f);
  }
});
