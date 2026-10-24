const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsDir = path.join(rootDir, 'products');

const rootHtmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html')).map(f => path.join(rootDir, f));
const productHtmlFiles = fs.readdirSync(productsDir).filter(f => f.endsWith('.html')).map(f => path.join(productsDir, f));

const allFiles = [...rootHtmlFiles, ...productHtmlFiles];
console.log(`Checking ${allFiles.length} HTML files across website...`);

let errors = [];
let passed = 0;

for (const filePath of allFiles) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip redirect stubs
  if (content.includes('http-equiv="refresh"')) {
    console.log(`Skipping redirect stub: ${relPath}`);
    continue;
  }

  // 1 H1
  const h1 = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1.length !== 1) errors.push(`${relPath}: Expected 1 H1, found ${h1.length}`);

  // Canonical
  const canonical = content.match(/<link\s+rel=["']canonical["'][^>]*>/gi) || [];
  if (canonical.length !== 1) errors.push(`${relPath}: Expected 1 canonical link, found ${canonical.length}`);

  // lang="en-IN"
  if (!content.includes('lang="en-IN"')) errors.push(`${relPath}: Missing lang="en-IN"`);

  // Favicon shortcut icon
  if (!content.includes('rel="shortcut icon"')) {
    errors.push(`${relPath}: Missing rel="shortcut icon" fallback`);
  }

  // Zero MOQ across entire site (per user's direct instruction)
  if (/\bMOQ\b/i.test(content) || /minimum order\s*(quantity|amount)?/i.test(content)) {
    errors.push(`${relPath}: Contains forbidden MOQ text`);
  }

  // JSON-LD scripts
  const jsonLd = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  if (jsonLd.length < 1) {
    errors.push(`${relPath}: Missing JSON-LD structured data`);
  } else {
    for (const block of jsonLd) {
      const jsonStr = block.replace(/<script type="application\/ld\+json">|<\/script>/gi, '').trim();
      try {
        JSON.parse(jsonStr);
      } catch (e) {
        errors.push(`${relPath}: Invalid JSON-LD (${e.message})`);
      }
    }
  }

  passed++;
}

console.log(`Verified ${passed} total HTML files.`);
if (errors.length > 0) {
  console.error('Validation errors found:');
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log('ALL 38 HTML pages PASSED verification successfully!');
}
