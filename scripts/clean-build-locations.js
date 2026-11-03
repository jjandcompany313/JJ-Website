const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'build-locations.js');
let code = fs.readFileSync(filePath, 'utf8');

const svgBlock = `
const SVG_PDF = \`<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>\`;
const SVG_WA = \`<svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 01-5.82 2.41h-.01c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.95-.19-.3a8.196 8.196 0 01-1.26-4.55c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>\`;
const SVG_MENU = \`<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>\`;
const SVG_CLOSE = \`<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\`;
const SVG_PHONE = \`<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>\`;
const SVG_MAIL = \`<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\`;
const SVG_PIN = \`<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>\`;
const SVG_STAR = \`<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="#F59E0B" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>\`;
`;

if (!code.includes('SVG_PDF')) {
  code = svgBlock + '\n' + code;
}

// Add inline styles block to headHtml
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

// Clean emoji references
code = code.replace(/<span aria-hidden="true">📥<\/span>\s*Master Catalogue/g, '${SVG_PDF} Master Catalogue');
code = code.replace(/<span aria-hidden="true">💬<\/span>\s*WhatsApp/g, '${SVG_WA} WhatsApp');
code = code.replace(/<button id="mobileToggle" class="mobile-toggle" aria-label="Open Navigation Menu">☰<\/button>/g, '<button id="mobileToggle" class="mobile-toggle" aria-label="Open Navigation Menu">${SVG_MENU}</button>');
code = code.replace(/<button id="mobileClose" class="mobile-toggle" aria-label="Close Menu">✕<\/button>/g, '<button id="mobileClose" class="mobile-toggle" aria-label="Close Menu">${SVG_CLOSE}</button>');
code = code.replace(/<span aria-hidden="true">📥<\/span>\s*Download Master Catalogue/g, '${SVG_PDF} Download Master Catalogue');
code = code.replace(/<span aria-hidden="true">💬<\/span>\s*Chat on WhatsApp/g, '${SVG_WA} Chat on WhatsApp');
code = code.replace(/<span aria-hidden="true">💬<\/span>\s*Get Wholesale Rates on WhatsApp/g, '${SVG_WA} Get Wholesale Rates on WhatsApp');
code = code.replace(/<span aria-hidden="true">💬<\/span>\s*Chat Directly on WhatsApp/g, '${SVG_WA} Chat Directly on WhatsApp');
code = code.replace(/<span aria-hidden="true">⭐<\/span>\s*Google Verified Profile/g, '${SVG_STAR} Google Verified Profile');
code = code.replace(/⭐ Read \/ Leave Reviews/g, '${SVG_STAR} Read Reviews');
code = code.replace(/<span aria-hidden="true">📥<\/span>/g, '${SVG_PDF}');
code = code.replace(/<span aria-hidden="true">💬<\/span>/g, '${SVG_WA}');
code = code.replace(/<span aria-hidden="true">📍<\/span>/g, '${SVG_PIN}');
code = code.replace(/<span aria-hidden="true">📞<\/span>/g, '${SVG_PHONE}');
code = code.replace(/<span aria-hidden="true">✉️<\/span>/g, '${SVG_MAIL}');
code = code.replace(/<span aria-hidden="true">⭐<\/span>/g, '${SVG_STAR}');
code = code.replace(/<span aria-hidden="true">🏛️<\/span>/g, '');
code = code.replace(/<span aria-hidden="true">®️<\/span>/g, '');
code = code.replace(/&rarr;/g, '');

// Clean up social links
code = code.replace(/<div style="margin-top: 14px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">[\s\S]*?Google Maps<\/a>\s*<\/div>/g, 
`<div style="margin-top: 14px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
  <a href="https://www.facebook.com/profile.php?id=61594625407272" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Facebook</a>
  <a href="https://www.instagram.com/jjandcompany313/" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Instagram</a>
  <a href="https://www.indiamart.com/kgn-works-pune/" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">IndiaMART</a>
  <a href="https://g.page/r/CQrB9YNt2nTFEBM" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Google Maps</a>
</div>`);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully cleaned build-locations.js');
