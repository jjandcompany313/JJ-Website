const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html') || file === 'build-products.js' || file === 'build-locations.js') {
      results.push(full);
    }
  });
  return results;
}

const files = getHtmlFiles('.');
let totalReplaced = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Pattern: <a [^>]*target=["']_blank["'][^>]*>
  content = content.replace(/<a\b([^>]*?)target=["']_blank["']([^>]*?)>/gi, (match, before, after) => {
    // If it already has rel, inspect it
    const fullTag = before + ' ' + after;
    if (/rel=["'][^"']*["']/i.test(fullTag)) {
      // Ensure rel contains noopener noreferrer nofollow
      return match.replace(/rel=["']([^"']*)["']/i, (relMatch, relVal) => {
        const parts = new Set(relVal.split(/\s+/).filter(Boolean));
        parts.add('noopener');
        parts.add('noreferrer');
        parts.add('nofollow');
        return `rel="${Array.from(parts).join(' ')}"`;
      });
    } else {
      // Add rel attribute
      return `<a${before}target="_blank" rel="noopener noreferrer nofollow"${after}>`;
    }
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalReplaced++;
    console.log(`Updated rel attribute in: ${file}`);
  }
});

console.log(`Finished! Updated ${totalReplaced} files.`);
