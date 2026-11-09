const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  if (!matches) return;
  matches.forEach((m, idx) => {
    const jsonStr = m.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
    try {
      const parsed = JSON.parse(jsonStr);
      const relPath = path.relative(rootDir, filePath);
      
      // Check schema.org issues
      const ctx = parsed['@context'];
      if (!ctx || (!ctx.includes('schema.org') && ctx !== 'http://schema.org' && ctx !== 'https://schema.org')) {
        console.log(`[SCHEMA.ORG CONTEXT ERROR] ${relPath} block ${idx}: @context is "${ctx}"`);
      }
      
      const type = parsed['@type'];
      if (!type) {
        console.log(`[SCHEMA.ORG TYPE ERROR] ${relPath} block ${idx}: missing @type`);
      }

      // Check for Google Product rich results requirements
      if (type === 'Product') {
        if (!parsed.offers && !parsed.review && !parsed.aggregateRating) {
          console.log(`[GOOGLE RICH RESULT ERROR] ${relPath}: Product missing offers, review, or aggregateRating`);
        }
      }

      // Check for Category page ItemList
      if (relPath.includes('products') && (type === 'CollectionPage' || relPath === 'products.html' || relPath.startsWith('products\\rollers.html') || relPath.startsWith('products/rollers.html'))) {
        // Check if ItemList exists
      }

    } catch (e) {
      console.log(`[JSON PARSE ERROR] ${path.relative(rootDir, filePath)} block ${idx}:`, e.message);
    }
  });
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.agents') walk(full);
    } else if (f.endsWith('.html')) {
      checkFile(full);
    }
  });
}

walk(rootDir);
console.log('Finished schema check.');
