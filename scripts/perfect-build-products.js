const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'build-products.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Fix matrix title to be completely clean
code = code.replace(/<span class="matrix-title">.*?Technical Application/g, '<span class="matrix-title">Technical Application');

// 2. Add inline styles block to headHtml
const inlineStyles = `
  <style>
    /* Hallmark · theme: minimal · genre: modern-minimal */
    :root {
      --accent: #FF1493;
    }
    html, body {
      overflow-x: clip;
    }
    :focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    .btn:active, button:active, a:active {
      transform: translateY(1px);
    }
    .btn:disabled, button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>
</head>`;

code = code.replace('</head>', inlineStyles);

// 3. Remove eyebrows
code = code.replace(/<span class="section-tag">[^<]*<\/span>\s*<h1/g, '<h1');
code = code.replace(/<span class="section-tag">[^<]*<\/span>\s*<h2/g, '<h2');

// 4. Clean up social links in footer
code = code.replace(/<div style="margin-top: 14px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">[\s\S]*?Google Maps<\/a>\s*<\/div>/g, 
`<div style="margin-top: 14px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
  <a href="https://www.facebook.com/profile.php?id=61594625407272" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Facebook</a>
  <a href="https://www.instagram.com/jjandcompany313/" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Instagram</a>
  <a href="https://www.indiamart.com/kgn-works-pune/" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">IndiaMART</a>
  <a href="https://g.page/r/CQrB9YNt2nTFEBM" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Google Maps</a>
</div>`);

// 5. Clean Google Business Profile link in footer
code = code.replace(/<span aria-hidden="true">🌐<\/span>/g, '');
code = code.replace(/&rarr;/g, '');

// 6. Clean up inline styles in specifications table and specs card
code = code.replace(/style="background:\s*#F8FAFC;"/g, 'class="row-alt"');
code = code.replace(/style="background:\s*#FAFAFA;"/g, 'class="row-alt"');
code = code.replace(/style="background:\s*#FFFFFF;"/g, '');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully perfected build-products.js');
