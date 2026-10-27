const fs = require('fs');
const path = require('path');

function findTopbar(dir) {
  let list = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory() && f !== 'node_modules' && f !== '.git') {
      list = list.concat(findTopbar(p));
    } else if (f.endsWith('.html')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes('class="topbar"') || c.includes("class='topbar'")) {
        list.push(p);
      }
    }
  });
  return list;
}

const res = findTopbar('.');
console.log('Pages containing topbar:', res.length);
res.forEach(p => console.log(p));
