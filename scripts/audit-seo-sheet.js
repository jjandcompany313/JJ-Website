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
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const files = getHtmlFiles('.');
console.log('Total HTML files found:', files.length);

const missingCanonicals = [];
const titles = [];
const metas = [];
const targetBlanksWithoutNoopener = [];
const h2sByFile = {};
const longH2s = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const rel = path.relative('.', f).replace(/\\/g, '/');

  // Canonical
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonMatch) missingCanonicals.push(rel);

  // Title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  titles.push({ file: rel, title, len: title.length });

  // Meta description
  const metaMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const meta = metaMatch ? metaMatch[1].trim() : '';
  metas.push({ file: rel, meta, len: meta.length });

  // target='_blank' without noopener
  const blankRegex = /<a\s+[^>]*target=["']_blank["'][^>]*>/gi;
  let m;
  while ((m = blankRegex.exec(content)) !== null) {
    const tag = m[0];
    if (!tag.includes('noopener')) {
      targetBlanksWithoutNoopener.push({ file: rel, tag });
    }
  }

  // H2s
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let h2m;
  const listH2 = [];
  while ((h2m = h2Regex.exec(content)) !== null) {
    const text = h2m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    listH2.push(text);
    if (text.length > 70) {
      longH2s.push({ file: rel, text, len: text.length });
    }
  }
  h2sByFile[rel] = listH2;
});

console.log('\n--- Missing Canonicals (Count: ' + missingCanonicals.length + ') ---');
console.log(missingCanonicals);

console.log('\n--- Titles Over 60 chars (Count: ' + titles.filter(t => t.len > 60).length + ') ---');
titles.filter(t => t.len > 60).forEach(t => console.log(`${t.len} chars [${t.file}]: "${t.title}"`));

console.log('\n--- Titles Under 30 chars (Count: ' + titles.filter(t => t.len < 30).length + ') ---');
titles.filter(t => t.len < 30).forEach(t => console.log(`${t.len} chars [${t.file}]: "${t.title}"`));

console.log('\n--- Meta Descriptions Over 155 chars (Count: ' + metas.filter(m => m.len > 155).length + ') ---');
metas.filter(m => m.len > 155).forEach(m => console.log(`${m.len} chars [${m.file}]: "${m.meta}"`));

console.log('\n--- Target _blank without noopener (Count: ' + targetBlanksWithoutNoopener.length + ') ---');
targetBlanksWithoutNoopener.slice(0, 10).forEach(t => console.log(`[${t.file}]: ${t.tag}`));

console.log('\n--- H2s Over 70 chars (Count: ' + longH2s.length + ') ---');
longH2s.forEach(h => console.log(`${h.len} chars [${h.file}]: "${h.text}"`));

// H2 Duplicate Analysis
const h2Counts = {};
Object.entries(h2sByFile).forEach(([file, h2s]) => {
  h2s.forEach(h => {
    if (!h2Counts[h]) h2Counts[h] = [];
    h2Counts[h].push(file);
  });
});

console.log('\n--- Duplicate H2s appearing across multiple files ---');
Object.entries(h2Counts)
  .filter(([h, flist]) => flist.length > 1)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([h, flist]) => {
    console.log(`"${h}" -> appears in ${flist.length} files (e.g. ${flist.slice(0, 3).join(', ')}...)`);
  });
