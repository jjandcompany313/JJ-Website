const fs = require('fs');
const path = require('path');

function removeTopbarFromHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Match <aside class="topbar" ... </aside> including whitespace and newlines
  const regex = /<!--\s*Top Utility Bar\s*-->\s*<aside class=["']topbar["'][\s\S]*?<\/aside>\s*/gi;
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  // Try fallback without comment
  const regex2 = /<aside class=["']topbar["'][\s\S]*?<\/aside>\s*/gi;
  if (regex2.test(content)) {
    content = content.replace(regex2, '');
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function processDir(dir) {
  let modifiedCount = 0;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && f !== 'node_modules' && f !== '.git') {
      modifiedCount += processDir(full);
    } else if (f.endsWith('.html')) {
      if (removeTopbarFromHtml(full)) {
        console.log('Removed topbar from:', full);
        modifiedCount++;
      }
    }
  });
  return modifiedCount;
}

const count = processDir('.');
console.log(`Successfully removed topbar from ${count} HTML files!`);
