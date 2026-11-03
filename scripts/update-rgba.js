const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Replace green rgba with purple/pink
css = css.replace(/rgba\(\s*5,\s*138,\s*94,\s*0\.3\s*\)/g, 'rgba(255, 20, 147, 0.35)');
css = css.replace(/rgba\(\s*5,\s*138,\s*94,\s*0\.15\s*\)/g, 'rgba(147, 112, 219, 0.22)');
css = css.replace(/rgba\(\s*5,\s*138,\s*94,\s*0\.03\s*\)/g, 'rgba(147, 112, 219, 0.05)');
css = css.replace(/rgba\(\s*5,\s*138,\s*94,\s*0\.04\s*\)/g, 'rgba(147, 112, 219, 0.08)');
css = css.replace(/rgba\(\s*5,\s*138,\s*94,\s*0\.22\s*\)/g, 'rgba(147, 112, 219, 0.22)');
css = css.replace(/rgba\(\s*5,\s*138,\s*94,\s*0\.18\s*\)/g, 'rgba(255, 20, 147, 0.20)');
css = css.replace(/rgba\(\s*5,\s*138,\s*94,\s*0\.25\s*\)/g, 'rgba(147, 112, 219, 0.25)');
css = css.replace(/rgba\(\s*6,\s*57,\s*42,\s*0\.94\s*\)/g, 'rgba(24, 13, 43, 0.94)');
css = css.replace(/rgba\(\s*6,\s*57,\s*42,\s*0\.45\s*\)/g, 'rgba(24, 13, 43, 0.45)');

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Updated RGBA values in style.css');
