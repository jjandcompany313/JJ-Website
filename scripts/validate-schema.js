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
let totalBlocks = 0;

for (const f of files) {
  const rel = path.relative(rootDir, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    totalBlocks++;
    const jsonStr = match[1].trim();
    try {
      const obj = JSON.parse(jsonStr);
      if (!obj['@context']) issues.push(`${rel}: Missing @context`);
      if (!obj['@type']) issues.push(`${rel}: Missing @type`);
      
      // Check BreadcrumbList
      if (obj['@type'] === 'BreadcrumbList') {
        if (!Array.isArray(obj.itemListElement)) {
          issues.push(`${rel}: BreadcrumbList missing itemListElement array`);
        } else {
          obj.itemListElement.forEach((item, idx) => {
            if (!item.name) issues.push(`${rel}: Breadcrumb item ${idx} missing name`);
            if (!item.item) issues.push(`${rel}: Breadcrumb item ${idx} missing item URL`);
          });
        }
      }

      // Check Product
      if (obj['@type'] === 'Product') {
        if (!obj.name) issues.push(`${rel}: Product missing name`);
        if (!obj.description) issues.push(`${rel}: Product missing description`);
        if (!obj.image) issues.push(`${rel}: Product missing image`);
      }

      // Check FAQPage
      if (obj['@type'] === 'FAQPage') {
        if (!Array.isArray(obj.mainEntity)) {
          issues.push(`${rel}: FAQPage missing mainEntity array`);
        } else {
          obj.mainEntity.forEach((q, idx) => {
            if (!q.name) issues.push(`${rel}: FAQ item ${idx} missing question name`);
            if (!q.acceptedAnswer || !q.acceptedAnswer.text) {
              issues.push(`${rel}: FAQ item ${idx} missing acceptedAnswer.text`);
            }
          });
        }
      }

    } catch (e) {
      issues.push(`${rel}: JSON parse error: ${e.message}`);
    }
  }
}

console.log(`Inspected ${totalBlocks} JSON-LD blocks across ${files.length} HTML files.`);
if (issues.length > 0) {
  console.log(`Found ${issues.length} issues:`);
  issues.forEach(i => console.log(' - ' + i));
} else {
  console.log('ALL JSON-LD blocks are completely valid Schema.org markup!');
}
