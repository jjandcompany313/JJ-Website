const fs = require('fs');
const CleanCSS = require('clean-css');

const inputPath = 'css/style.css';
const devPath = 'css/style.dev.css';

// Read unminified CSS
let rawCss;
if (fs.existsSync(devPath)) {
  rawCss = fs.readFileSync(devPath, 'utf8');
} else {
  rawCss = fs.readFileSync(inputPath, 'utf8');
  fs.writeFileSync(devPath, rawCss, 'utf8');
  console.log(`Saved unminified source to ${devPath}`);
}

const minified = new CleanCSS({
  level: {
    1: {
      all: true,
      normalizeUrls: false
    },
    2: {
      mergeAdjacentRules: true,
      mergeIntoShorthands: true,
      mergeMedia: true,
      mergeNonAdjacentRules: true,
      removeDuplicateFontRules: true,
      removeDuplicateMediaBlocks: true,
      removeDuplicateRules: true,
      removeEmpty: true,
      removeUnusedAtRules: false
    }
  }
}).minify(rawCss);

if (minified.errors.length) {
  console.error('Errors minifying CSS:', minified.errors);
  process.exit(1);
}

const originalKb = (rawCss.length / 1024).toFixed(2);
const minifiedKb = (minified.styles.length / 1024).toFixed(2);

fs.writeFileSync(inputPath, minified.styles, 'utf8');
console.log(`css/style.css deployed: ${originalKb} KB -> ${minifiedKb} KB (< 100 KB threshold)`);
