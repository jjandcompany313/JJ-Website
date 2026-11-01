const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Remove text-transform: uppercase from long labels (Issue 7)
css = css.replace(/\.hero-badge\s*\{([^}]+)\}/, (match, body) => {
  return '.hero-badge {' + body.replace(/text-transform:\s*uppercase;?/gi, '') + '}';
});

css = css.replace(/\.metric-label\s*\{([^}]+)\}/, (match, body) => {
  return '.metric-label {' + body.replace(/text-transform:\s*uppercase;?/gi, '') + '}';
});

css = css.replace(/\.brand-tagline\s*\{([^}]+)\}/, (match, body) => {
  return '.brand-tagline {' + body.replace(/text-transform:\s*uppercase;?/gi, '') + '}';
});

css = css.replace(/\.compliance-item\s+span\s*\{([^}]+)\}/, (match, body) => {
  return '.compliance-item span {' + body.replace(/text-transform:\s*uppercase;?/gi, '') + '}';
});

css = css.replace(/\.about-stat-lbl\s*\{([^}]+)\}/, (match, body) => {
  return '.about-stat-lbl {' + body.replace(/text-transform:\s*uppercase;?/gi, '') + '}';
});

// 2. Normalize responsive title clamps
css = css.replace(/clamp\(1\.[467]rem,\s*[\d.]+vw,\s*2\.[015]?rem\)/gi, 'clamp(var(--font-xl), 5vw, var(--font-2xl))');

// 3. Normalize all rem / px font-sizes to design tokens (Issues 3, 5, 6)
function normalizeFontSize(val) {
  val = val.trim();
  if (val.startsWith('var(')) return val;
  if (val === 'inherit') return val;
  if (val.startsWith('clamp')) return 'clamp(var(--font-xl), 5vw, var(--font-2xl))';
  
  let rem = null;
  if (val.endsWith('rem')) {
    rem = parseFloat(val);
  } else if (val.endsWith('px')) {
    rem = parseFloat(val) / 16;
  }
  
  if (rem !== null) {
    if (rem <= 0.8) return 'var(--font-xs)';    // 12px / 0.75rem
    if (rem <= 0.94) return 'var(--font-sm)';   // 14px / 0.875rem
    if (rem <= 1.08) return 'var(--font-base)'; // 16px / 1rem
    if (rem <= 1.22) return 'var(--font-md)';   // 18px / 1.125rem
    if (rem <= 1.45) return 'var(--font-lg)';   // 20px / 1.25rem
    if (rem <= 1.85) return 'var(--font-xl)';   // 24px / 1.5rem
    if (rem <= 2.6) return 'var(--font-2xl)';   // 32px / 2rem
    return 'var(--font-3xl)';                   // 44px / 2.75rem
  }
  return val;
}

// Preserve root definitions:
const rootDefs = {};
const rootMatch = css.match(/(:root\s*\{[^}]+\})/);
let rootBlock = rootMatch ? rootMatch[1] : '';

css = css.replace(/font-size:\s*([^;!}]+)/gi, (match, p1) => {
  return 'font-size: ' + normalizeFontSize(p1);
});

// Restore root tokens
if (rootBlock) {
  css = css.replace(/:root\s*\{[^}]+\}/, rootBlock);
}

fs.writeFileSync('css/style.css', css, 'utf8');

// Audit final counts
const distinctAfter = new Set();
const matchesAfter = css.match(/font-size:\s*([^;!}]+)/gi) || [];
matchesAfter.forEach(m => {
  const v = m.replace(/font-size:\s*/i, '').trim();
  distinctAfter.add(v);
});

console.log('Distinct font sizes count:', distinctAfter.size);
console.log('Unique sizes:', [...distinctAfter]);
