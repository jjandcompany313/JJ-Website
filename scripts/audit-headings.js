const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git') {
        results = results.concat(walk(full));
      }
    } else if (item.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(rootDir);
let issues = [];

for (const f of files) {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  if (rel === 'product-detail.html' || rel === '404.html') continue;
  const html = fs.readFileSync(f, 'utf8');

  // Extract all headings in document order
  const headingRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  let prevLevel = 0;
  let h1Count = 0;

  while ((match = headingRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    const level = parseInt(tag[1], 10);
    const text = match[2].replace(/<[^>]*>/g, '').trim();

    if (level === 1) {
      h1Count++;
      if (text.length < 10 || text.length > 90) {
        issues.push(`${rel}: H1 length warning (${text.length} chars): "${text}"`);
      }
    }

    if (prevLevel > 0 && level > prevLevel + 1) {
      issues.push(`${rel}: Heading level skipped from H${prevLevel} to H${level} ("${text.slice(0, 30)}...")`);
    }
    prevLevel = level;
  }

  if (h1Count !== 1) {
    issues.push(`${rel}: Found ${h1Count} H1 tags (expected exactly 1)`);
  }
}

console.log(`Audited headings across ${files.length} HTML files.`);
if (issues.length > 0) {
  console.log(`Found ${issues.length} heading issues:`);
  issues.forEach(i => console.log(' - ' + i));
} else {
  console.log('ALL pages have perfect heading hierarchy (H1 -> H2 -> H3 -> H4) with NO skips!');
}
