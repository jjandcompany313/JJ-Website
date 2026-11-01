const fs = require('fs');
const glob = require('path');

const files = [
  'index.html',
  'about.html',
  'contact.html',
  'dealer.html',
  'privacy-policy.html',
  'products.html',
  '404.html',
  'build-locations.js',
  'build-products.js'
];

const targetPattern = /<div class="footer-contact-item">\s*<span aria-hidden="true">📞<\/span>\s*<a href="tel:\+919422775429">\+91 94227 75429<\/a>\s*\/\s*<a href="tel:\+919890003539">\+91 98900 03539<\/a>\s*<\/div>/g;

const replacement = `<div class="footer-contact-item">
              <span aria-hidden="true">📞</span>
              <div class="footer-phone-group">
                <a href="tel:+919422775429" class="footer-contact-link">+91 94227 75429 (Primary)</a>
                <a href="tel:+919890003539" class="footer-contact-link">+91 98900 03539 (Office)</a>
              </div>
            </div>`;

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    if (targetPattern.test(content)) {
      content = content.replace(targetPattern, replacement);
      fs.writeFileSync(f, content, 'utf8');
      console.log('Updated ' + f);
    } else {
      console.log('Target pattern not found in ' + f);
    }
  }
});
