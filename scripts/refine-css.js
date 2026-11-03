const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Fix html & body overflow-x to clip
css = css.replace(/html\s*\{([^}]*)\}/, (match, p1) => {
  if (!p1.includes('overflow-x')) {
    return `html {\n  overflow-x: clip;${p1}}`;
  }
  return match.replace(/overflow-x:\s*[^;]+;/, 'overflow-x: clip;');
});

css = css.replace(/body\s*\{([^}]*)\}/, (match, p1) => {
  return match.replace(/overflow-x:\s*[^;]+;/, 'overflow-x: clip;');
});

// Also responsive media queries overflow-x
css = css.replace(/overflow-x:\s*hidden;/g, 'overflow-x: clip;');

// 2. Add :focus-visible and :active rules if not already present
if (!css.includes(':focus-visible')) {
  const focusAndActiveRules = `
/* --- Global Focus Visible & Active States (Hallmark & Accessibility) --- */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

button:focus-visible, 
a:focus-visible, 
input:focus-visible, 
select:focus-visible, 
textarea:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.btn:active, 
button:active, 
.tool-choice-btn:active,
.category-card:active {
  transform: translateY(1px);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;
  css = css.replace('/* --- Base & Reset --- */', `/* --- Base & Reset --- */\n${focusAndActiveRules}`);
}

// 3. Replace transition: all with explicit transition properties
css = css.replace(/transition:\s*all\s+var\(--transition-fast\);/g, 'transition: transform var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);');
css = css.replace(/transition:\s*all\s+var\(--transition-normal\);/g, 'transition: transform var(--transition-normal), background-color var(--transition-normal), border-color var(--transition-normal), color var(--transition-normal), box-shadow var(--transition-normal);');
css = css.replace(/transition:\s*all\s+0\.3s\s+ease;/g, 'transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease, background-color 0.3s ease;');
css = css.replace(/transition:\s*all\s+0\.2s\s+ease;/g, 'transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;');
css = css.replace(/transition:\s*all\s+0\.15s\s+ease;/g, 'transition: transform 0.15s ease, opacity 0.15s ease, background-color 0.15s ease;');

// 4. Ensure .btn has explicit transition
css = css.replace(/\.btn\s*\{([^}]+)\}/, (match, p1) => {
  return `.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px 28px;\n  font-weight: 600;\n  font-size: var(--font-sm);\n  border-radius: var(--radius-sm);\n  border: none;\n  cursor: pointer;\n  transition: transform var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);\n  text-align: center;\n  white-space: nowrap;\n  letter-spacing: 0.01em;\n}`;
});

// 5. Add SVG icon utility styles for clean, crisp icons (replacing emojis)
const svgUtilities = `
/* --- Clean Industrial SVG Icon Utilities (Zero Emojis) --- */
.svg-icon {
  display: inline-block;
  width: 1.1em;
  height: 1.1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  vertical-align: -0.18em;
  flex-shrink: 0;
}

.svg-icon-stroke {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.btn .svg-icon,
.btn .svg-icon-stroke {
  width: 1.15em;
  height: 1.15em;
}

.icon-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: var(--brand-purple-soft);
  color: var(--brand-purple);
  flex-shrink: 0;
}
`;

if (!css.includes('.svg-icon {')) {
  css += `\n${svgUtilities}\n`;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully refined css/style.css');
