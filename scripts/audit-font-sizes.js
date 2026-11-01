const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

const regex = /font-size:\s*([^;!]+)/gi;
let m;
const sizes = {};
while ((m = regex.exec(css)) !== null) {
  const s = m[1].trim();
  sizes[s] = (sizes[s] || 0) + 1;
}

console.log('Font sizes in style.css:');
console.log(sizes);
