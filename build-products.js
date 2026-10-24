/**
 * JJ & COMPANY — STATIC PRODUCT PAGE GENERATOR
 * Generates:
 * 1. 3 Dedicated Category Hub Pages (/products/rollers.html, /products/brushes.html, /products/accessories.html)
 * 2. 29 Individual Product Pages in /products/
 * 3. Updates /sitemap.xml
 */

const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'));
const productsDir = path.join(__dirname, 'products');

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getHeaderHtml(activeNav = 'products') {
  return `
  <!-- Top Utility Bar -->
  <aside class="topbar" aria-label="Top Announcement Bar">
    <div class="container topbar-container">
      <div class="topbar-info">
        <span class="topbar-badge">DIRECT FACTORY</span>
        <span class="topbar-item"><span aria-hidden="true">📍</span> Plot No-8, Dixit Wadi, Jalgaon, Maharashtra 425001</span>
      </div>
      <div class="topbar-actions">
        <span class="topbar-item" style="color: var(--accent-gold); font-weight: 600;"><span aria-hidden="true">🇮🇳</span> Active supply in Jalgaon, Dhule, Nandurbar, Buldhana and MP</span>
        <a href="tel:+919422775429" class="topbar-item"><span aria-hidden="true">📞</span> +91 94227 75429</a>
      </div>
    </div>
  </aside>

  <!-- Main Header -->
  <header class="site-header">
    <div class="container header-container">
      <a href="/" class="brand-logo" title="JJ &amp; Company Home">
        <img src="/assets/images/jj-company-logo.png" alt="JJ &amp; Company Logo" class="logo-img" width="44" height="44">
        <div class="brand-text">
          <span class="brand-name">JJ &amp; COMPANY</span>
          <span class="brand-tagline">Paint Accessories Manufacturer</span>
        </div>
      </a>

      <nav class="nav-menu" aria-label="Main Navigation">
        <a href="/" class="nav-link">Home</a>
        <a href="/products.html" class="nav-link active">Catalog</a>
        <a href="/dealer.html" class="nav-link">Dealership</a>
        <a href="/about.html" class="nav-link">About</a>
        <a href="/contact.html" class="nav-link">Contact</a>
      </nav>

      <div class="header-cta-group">
        <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-secondary btn-sm"><span aria-hidden="true">📥</span> Master Catalogue</a>
        <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20I%20am%20inquiring%20about%20your%20products."
          target="_blank" class="btn btn-whatsapp btn-sm" aria-label="WhatsApp Direct Support">
          <span aria-hidden="true">💬</span> WhatsApp
        </a>
        <button id="mobileToggle" class="mobile-toggle" aria-label="Open Navigation Menu">☰</button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div id="mobileBackdrop" class="mobile-backdrop"></div>
  <aside id="mobileDrawer" class="mobile-nav-drawer" aria-label="Mobile Menu">
    <div>
      <div class="mobile-drawer-header">
        <div class="brand-logo">
          <img src="/assets/images/jj-company-logo.png" alt="JJ &amp; Company Logo" class="logo-img" width="40" height="40">
          <span class="brand-name">JJ &amp; COMPANY</span>
        </div>
        <button id="mobileClose" class="mobile-toggle" aria-label="Close Menu">✕</button>
      </div>
      <nav class="mobile-nav-links">
        <a href="/" class="nav-link">Home</a>
        <a href="/products.html" class="nav-link active">Catalog</a>
        <a href="/dealer.html" class="nav-link">Dealership</a>
        <a href="/about.html" class="nav-link">About</a>
        <a href="/contact.html" class="nav-link">Contact</a>
      </nav>
    </div>
    <div>
      <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-primary btn-block" style="margin-bottom: 10px;"><span aria-hidden="true">📥</span> Download Master Catalogue (PDF)</a>
      <a href="https://wa.me/919422775429" target="_blank" class="btn btn-whatsapp btn-block"><span aria-hidden="true">💬</span> Chat on WhatsApp</a>
    </div>
  </aside>
  `;
}

function getFooterHtml() {
  return `
  <!-- Clean Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top-grid">
        <div class="footer-col-brand">
          <div class="brand-logo">
            <img src="/assets/images/jj-company-logo.png" alt="JJ &amp; Company Logo" class="logo-img" width="44" height="44">
            <span class="brand-name">JJ &amp; COMPANY</span>
          </div>
          <p class="footer-desc">
            Direct manufacturer of Wallfin™ paint rollers (TM Application ID: 8027912), direct importer of authentic Panama paint brushes, and distributor of finishing accessories in Jalgaon, Maharashtra.
          </p>
          <div class="gst-badge">
            <span><span aria-hidden="true">🏛️</span> GSTIN:</span>
            <strong>27ACXPN6682N1ZC</strong>
          </div>
          <div class="gst-badge" style="margin-top: 6px;">
            <span><span aria-hidden="true">®️</span> Registered Brand:</span>
            <strong>Wallfin (TM: 8027912)</strong>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Navigation</h4>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/products.html">Product Catalog</a></li>
            <li><a href="/dealer.html">Dealership</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/privacy-policy.html">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Product Lines</h4>
          <ul class="footer-links">
            <li><a href="/products/rollers.html">1. Wallfin™ Paint Rollers</a></li>
            <li><a href="/products/brushes.html">2. Panama Paint Brushes</a></li>
            <li><a href="/products/accessories.html">3. Thinners, Polish &amp; Abrasives</a></li>
            <li><a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download><span aria-hidden="true">📥</span> Master Catalogue (PDF)</a></li>
            <li><a href="/assets/docs/Wall_Fin_Paint_Roller_Catalogue_2026.pdf" download><span aria-hidden="true">📥</span> Wall Fin Catalogue (PDF)</a></li>
            <li><a href="/assets/docs/JJ_Company_Panama_Brush_Catalog.pdf" download><span aria-hidden="true">📥</span> Panama Brush Catalogue (PDF)</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Factory &amp; Head Office</h4>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <span aria-hidden="true">📍</span>
              <span>
                Plot No-8, Dixit Wadi, Swatantrya Chowk - Pande Chowk Rd,<br>
                Jalgaon, Maharashtra 425001, India<br>
                <small style="color:var(--text-muted);">(Plus Code: 2H5C+678 | GPS: 21°00'28.7"N 75°34'14.2"E)</small>
              </span>
            </div>
            <div class="footer-contact-item">
              <span aria-hidden="true">📞</span>
              <a href="tel:+919422775429">+91 94227 75429</a> / <a href="tel:+919890003539">+91 98900 03539</a>
            </div>
            <div class="footer-contact-item">
              <span aria-hidden="true">💬</span>
              <a href="https://wa.me/919422775429" target="_blank">WhatsApp: +91 94227 75429</a>
            </div>
            <div class="footer-contact-item">
              <span aria-hidden="true">✉️</span>
              <a href="mailto:jjandcompany313@gmail.com">jjandcompany313@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          &copy; <span id="currentYear">2026</span> JJ &amp; Company. All rights reserved. Direct Factory Supply.
        </div>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <span>Active supply in Jalgaon, Dhule, Nandurbar, Buldhana and Madhya Pradesh; other regions by transport on request.</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp -->
  <a id="floatingWhatsApp" href="https://wa.me/919422775429" target="_blank" class="floating-whatsapp"
    aria-label="Chat on WhatsApp">
    <span aria-hidden="true">💬</span>
    <span class="floating-whatsapp-tooltip">Chat with Us</span>
  </a>

  <script src="/js/site-data.js?v=2.4"></script>
  <script src="/js/main.js?v=2.4"></script>
  <script>
    document.getElementById("currentYear").textContent = new Date().getFullYear();
  </script>
  `;
}

// Map category IDs to their dedicated subpages
const categoryUrlMap = {
  'paint-rollers': '/products/rollers.html',
  'panama-brushes': '/products/brushes.html',
  'accessories': '/products/accessories.html'
};

// 1. Generate Individual Product Pages
data.products.forEach(p => {
  const pageUrl = `https://jjandcompany.net/products/${p.id}.html`;
  const categoryObj = data.categories.find(c => c.id === p.category);
  const categoryUrl = categoryUrlMap[p.category];

  const waText = encodeURIComponent(`Hello JJ & Company, I am interested in wholesale dealer rates for: ${p.name}. Please share pricing.`);
  const waUrl = `https://wa.me/919422775429?text=${waText}`;

  // Build specs rows (NO MOQ anywhere)
  const specsRowsHtml = Object.entries(p.specs).map(([key, val]) => `
    <tr>
      <th style="padding: 12px 16px; border: 1px solid var(--border-color); background: #F8FAFC; text-align: left; width: 35%; font-weight: 600; color: var(--text-main); font-size: 0.9rem;">${escapeHtml(key)}</th>
      <td style="padding: 12px 16px; border: 1px solid var(--border-color); color: var(--text-body); font-size: 0.9rem;">${escapeHtml(val)}</td>
    </tr>
  `).join('');

  // Related products
  const relatedHtml = (p.related || []).map(relId => {
    const rel = data.products.find(x => x.id === relId);
    if (!rel) return '';
    return `
      <div style="background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 18px; display: flex; flex-direction: column;">
        <img src="${rel.thumbnail}" alt="${escapeHtml(rel.name)}" style="width: 100%; height: 180px; object-fit: contain; background: #FAFAFA; border-radius: var(--radius-sm); margin-bottom: 12px;" loading="lazy">
        <h4 style="font-size: 1rem; color: var(--text-main); margin-bottom: 6px; font-weight: 700;">${escapeHtml(rel.name)}</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px; flex-grow: 1;">${escapeHtml(rel.shortDesc.slice(0, 110))}...</p>
        <a href="/products/${rel.id}.html" class="btn btn-outline btn-sm" style="text-align: center;">View Specifications &rarr;</a>
      </div>
    `;
  }).filter(Boolean).join('');

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": p.name,
    "image": `https://jjandcompany.net${p.pageImage}`,
    "description": p.shortDesc,
    "brand": {
      "@type": "Brand",
      "name": p.brand
    },
    "manufacturer": {
      "@type": "Organization",
      "name": p.inHouseManufactured ? "JJ & Company" : (p.category === 'panama-brushes' ? "Panama Brush Partner (Imported)" : p.brand)
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jjandcompany.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Catalog",
        "item": "https://jjandcompany.net/products.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryObj.shortName,
        "item": `https://jjandcompany.net${categoryUrl}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": p.name,
        "item": pageUrl
      }
    ]
  };

  const pageHtml = `<!DOCTYPE html>
<html lang="en-IN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(p.name)} | JJ &amp; Company Jalgaon</title>
  <meta name="description" content="${escapeHtml(p.shortDesc.slice(0, 155))}">

  <link rel="canonical" href="${pageUrl}">
  <link rel="stylesheet" href="/css/style.css?v=2.4">

  <!-- Standard Favicons & Google Search Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="144x144" href="/assets/icons/favicon-144x144.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#06392A">

  <!-- Open Graph / Meta -->
  <meta property="og:type" content="product">
  <meta property="og:title" content="${escapeHtml(p.name)} | JJ &amp; Company">
  <meta property="og:description" content="${escapeHtml(p.shortDesc.slice(0, 155))}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="https://jjandcompany.net${p.pageImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(p.name)} | JJ &amp; Company">
  <meta name="twitter:description" content="${escapeHtml(p.shortDesc.slice(0, 155))}">
  <meta name="twitter:image" content="https://jjandcompany.net${p.pageImage}">

  <!-- Structured Data: Product + Breadcrumbs -->
  <script type="application/ld+json">
  ${JSON.stringify(productJsonLd, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbJsonLd, null, 2)}
  </script>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T22MWNL11C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T22MWNL11C');
  </script>
</head>

<body>
  ${getHeaderHtml('products')}

  <!-- Breadcrumbs Bar -->
  <nav class="breadcrumb-nav" aria-label="Breadcrumbs" style="background: #F1F5F9; border-bottom: 1px solid var(--border-color); padding: 12px 0;">
    <div class="container" style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
      <a href="/" style="color: var(--primary); text-decoration: none;">Home</a>
      <span>&rsaquo;</span>
      <a href="/products.html" style="color: var(--primary); text-decoration: none;">Catalog</a>
      <span>&rsaquo;</span>
      <a href="${categoryUrl}" style="color: var(--primary); text-decoration: none;">${escapeHtml(categoryObj.shortName)}</a>
      <span>&rsaquo;</span>
      <span style="color: var(--text-main); font-weight: 600;">${escapeHtml(p.name)}</span>
    </div>
  </nav>

  <!-- Product Detail Section -->
  <main class="section" style="padding-top: 36px;">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: start; margin-bottom: 56px;">

        <!-- Product Image & Preview -->
        <div>
          <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-color); background: #FFFFFF; box-shadow: var(--shadow-card); padding: 16px;">
            <img src="${p.pageImage}" alt="${escapeHtml(p.name)} - JJ &amp; Company Jalgaon" style="width: 100%; height: auto; display: block; border-radius: var(--radius-md);" loading="eager" fetchpriority="high">
          </div>
          <div style="margin-top: 14px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            ${p.inHouseManufactured ? '<span class="topbar-badge" style="background:#E0F2FE; color:#0369A1; font-weight:700;">IN-HOUSE MANUFACTURED • JALGAON PLANT</span>' : ''}
            ${p.trademarkAppId ? '<span class="topbar-badge" style="background:#FEF3C7; color:#B45309; font-weight:700;">REGISTERED TRADEMARK: ' + p.trademarkAppId + '</span>' : ''}
            ${p.category === 'panama-brushes' ? '<span class="topbar-badge" style="background:#DCFCE7; color:#15803D; font-weight:700;">AUTHENTIC DIRECT IMPORT</span>' : ''}
          </div>
        </div>

        <!-- Product Summary & Action Details -->
        <div>
          <div style="margin-bottom: 8px;">
            <span class="section-tag" style="margin-bottom: 6px;">${escapeHtml(categoryObj.name)}</span>
            <h1 style="font-size: 2.1rem; color: var(--text-main); font-weight: 800; line-height: 1.25; margin-bottom: 12px;">
              ${escapeHtml(p.name)}
            </h1>
          </div>

          <p style="font-size: 1.05rem; color: var(--text-body); line-height: 1.65; margin-bottom: 24px;">
            ${escapeHtml(p.shortDesc)}
          </p>

          <div style="background: var(--bg-section); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 24px;">
            <h3 style="font-size: 0.95rem; color: var(--text-main); font-weight: 700; margin-bottom: 8px;">Wholesale &amp; Dealer Inquiries</h3>
            <p style="font-size: 0.88rem; color: var(--text-body); line-height: 1.5; margin-bottom: 16px;">
              Direct factory supply for hardware shops, paint counters, and regional stockists. Message our sales desk with your requirements for trade rates and dispatch schedules.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg" style="flex: 1; text-align: center; justify-content: center;">
                <span aria-hidden="true">💬</span> Get Dealer Rate on WhatsApp
              </a>
              <a href="/dealer.html" class="btn btn-secondary btn-lg" style="flex: 1; text-align: center; justify-content: center;">
                Apply for Dealership
              </a>
            </div>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-outline btn-sm">
              <span aria-hidden="true">📥</span> Download Master Catalogue (PDF)
            </a>
            ${p.category === 'paint-rollers' ? '<a href="/assets/docs/Wall_Fin_Paint_Roller_Catalogue_2026.pdf" download class="btn btn-outline btn-sm"><span aria-hidden="true">📥</span> Download Wall Fin Catalogue (PDF)</a>' : ''}
            ${p.category === 'panama-brushes' ? '<a href="/assets/docs/JJ_Company_Panama_Brush_Catalog.pdf" download class="btn btn-outline btn-sm"><span aria-hidden="true">📥</span> Download Panama Brush Catalogue (PDF)</a>' : ''}
          </div>
        </div>

      </div>

      <!-- Full Specifications Table -->
      <section style="margin-bottom: 56px;">
        <h2 style="font-size: 1.5rem; color: var(--text-main); font-weight: 800; margin-bottom: 18px;">
          Product Specifications
        </h2>
        <div style="overflow-x: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
          <table style="width: 100%; border-collapse: collapse; background: #FFFFFF;">
            <tbody>
              ${specsRowsHtml}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Related Products -->
      ${relatedHtml ? `
      <section style="border-top: 1px solid var(--border-color); padding-top: 40px; margin-bottom: 40px;">
        <div class="section-header" style="text-align: left; margin-bottom: 24px;">
          <span class="section-tag">Related Models</span>
          <h2 style="font-size: 1.5rem; color: var(--text-main); font-weight: 800;">Recommended Companion Products</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
          ${relatedHtml}
        </div>
      </section>
      ` : ''}

    </div>
  </main>

  ${getFooterHtml()}
</body>

</html>
`;

  const filePath = path.join(productsDir, `${p.id}.html`);
  fs.writeFileSync(filePath, pageHtml);
  console.log(`Generated: products/${p.id}.html`);
});

// 2. Generate the 3 Dedicated Category Hub Pages
const categoriesDef = [
  {
    id: 'paint-rollers',
    fileName: 'rollers.html',
    title: 'Wallfin Paint Rollers & Refills Catalog | JJ & Company',
    metaDesc: 'Explore Wallfin paint rollers and refills manufactured in Jalgaon. Registered brand (TM: 8027912). Standard, 38mm, epoxy and foam rollers.',
    h1: 'Wallfin™ Paint Rollers &amp; Refills Range',
    badge: 'In-House Manufactured • TM: 8027912',
    intro: 'Manufactured directly at our Jalgaon plant under registered brand <strong>Wallfin™</strong> (Trademark Application ID: <strong>8027912</strong>). Built with solvent-proof polypropylene cores, high-density microfiber, and heavy-gauge cage frames across standard 20mm and heavy 38mm diameters.',
    filterCat: 'paint-rollers',
    catalogDownload: '/assets/docs/Wall_Fin_Paint_Roller_Catalogue_2026.pdf',
    catalogName: 'Wall Fin Paint Roller Catalogue (PDF)'
  },
  {
    id: 'panama-brushes',
    fileName: 'brushes.html',
    title: 'Panama Paint Brushes Wholesale Catalog | JJ & Company',
    metaDesc: 'Browse imported Panama paint brushes from 1 to 5 inch sizes with 100% shed-free epoxy potting. Direct wholesale supply from Jalgaon.',
    h1: 'Panama Paint Brushes Collection',
    badge: 'Direct Import • Signature Collection',
    intro: 'Directly imported from specialized brush manufacturing partners and distributed at direct wholesale rates. Built with 100% computerized epoxy bristle potting, stainless steel ferrules, and ergonomic handles to eliminate bristle shedding.',
    filterCat: 'panama-brushes',
    catalogDownload: '/assets/docs/JJ_Company_Panama_Brush_Catalog.pdf',
    catalogName: 'Panama Paint Brush Catalogue (PDF)'
  },
  {
    id: 'accessories',
    fileName: 'accessories.html',
    title: 'Thinners, Polish, Abrasives & Pata Catalog | JJ & Company',
    metaDesc: 'Wholesale companion range: Maruti Auto Gloss thinners, Nico wood polish, Cumi abrasives and wooden/steel putty pata for hardware dealers.',
    h1: 'Thinners, Polish, Abrasives &amp; Putty Pata',
    badge: 'Available Companion Range',
    intro: 'Wholesale surface preparation supplies for retail hardware stores and paint stockists. Complete companion stock of Maruti Auto Gloss thinners, Nico wood polish, Cumi abrasives, and precision putty pata.',
    filterCat: 'accessories',
    catalogDownload: '/assets/docs/JJ_Company_Master_Catalogue_2026.pdf',
    catalogName: 'Master Product Catalogue (PDF)'
  }
];

categoriesDef.forEach(cat => {
  const catProducts = data.products.filter(p => p.category === cat.filterCat);
  const pageUrl = `https://jjandcompany.net/products/${cat.fileName}`;

  const cardsHtml = catProducts.map(p => `
    <article class="category-card" style="display: flex; flex-direction: column;">
      <div class="category-image-wrap">
        <img src="${p.thumbnail}" alt="${escapeHtml(p.name)}" loading="lazy">
        <span class="category-badge">${p.inHouseManufactured ? 'Wallfin™ (TM: 8027912)' : (p.category === 'panama-brushes' ? 'Direct Import' : 'Available Range')}</span>
      </div>
      <div class="category-content" style="display: flex; flex-direction: column; flex-grow: 1;">
        <h3 class="category-title" style="font-size: 1.15rem;">${escapeHtml(p.name)}</h3>
        <p class="category-desc" style="font-size: 0.9rem; margin-bottom: 16px;">
          ${escapeHtml(p.shortDesc.slice(0, 140))}...
        </p>
        <div class="category-specs-list" style="margin-bottom: 18px;">
          ${(p.availableSizes || []).slice(0, 4).map(s => `<span class="spec-pill">${escapeHtml(s)}</span>`).join('')}
        </div>
        <div style="margin-top: auto; display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="/products/${p.id}.html" class="btn btn-primary btn-sm" style="flex: 1; text-align: center;">View Specs</a>
          <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20please%20send%20wholesale%20rates%20for%20${encodeURIComponent(p.name)}." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="text-align: center;">💬 WhatsApp</a>
        </div>
      </div>
    </article>
  `).join('');

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jjandcompany.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Catalog",
        "item": "https://jjandcompany.net/products.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cat.h1.replace(/&amp;/g, '&'),
        "item": pageUrl
      }
    ]
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": cat.h1.replace(/&amp;/g, '&'),
    "description": cat.metaDesc,
    "numberOfItems": catProducts.length,
    "itemListElement": catProducts.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://jjandcompany.net/products/${p.id}.html`,
      "name": p.name
    }))
  };

  const catPageHtml = `<!DOCTYPE html>
<html lang="en-IN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(cat.title)}</title>
  <meta name="description" content="${escapeHtml(cat.metaDesc)}">

  <link rel="canonical" href="${pageUrl}">
  <link rel="stylesheet" href="/css/style.css?v=2.4">

  <!-- Standard Favicons & Google Search Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="144x144" href="/assets/icons/favicon-144x144.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#06392A">

  <!-- Open Graph / Meta -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(cat.title)}">
  <meta property="og:description" content="${escapeHtml(cat.metaDesc)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="https://jjandcompany.net/assets/images/factory-hero.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(cat.title)}">
  <meta name="twitter:description" content="${escapeHtml(cat.metaDesc)}">
  <meta name="twitter:image" content="https://jjandcompany.net/assets/images/factory-hero.jpg">

  <!-- Structured Data: Breadcrumbs -->
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbJsonLd, null, 2)}
  </script>

  <!-- Structured Data: ItemList -->
  <script type="application/ld+json">
  ${JSON.stringify(itemListJsonLd, null, 2)}
  </script>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T22MWNL11C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T22MWNL11C');
  </script>
</head>

<body>
  ${getHeaderHtml('products')}

  <!-- Breadcrumbs Bar -->
  <nav class="breadcrumb-nav" aria-label="Breadcrumbs" style="background: #F1F5F9; border-bottom: 1px solid var(--border-color); padding: 12px 0;">
    <div class="container" style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
      <a href="/" style="color: var(--primary); text-decoration: none;">Home</a>
      <span>&rsaquo;</span>
      <a href="/products.html" style="color: var(--primary); text-decoration: none;">Catalog</a>
      <span>&rsaquo;</span>
      <span style="color: var(--text-main); font-weight: 600;">${cat.h1}</span>
    </div>
  </nav>

  <!-- Page Header -->
  <section class="page-header">
    <div class="container">
      <div class="hero-badge" style="color: var(--accent-lime); margin-bottom: 12px;">
        <span class="hero-badge-dot" style="background-color: var(--accent-lime);" aria-hidden="true"></span>
        ${cat.badge}
      </div>
      <h1 class="page-header-title">
        ${cat.h1}
      </h1>
      <p class="page-header-sub">
        ${cat.intro}
      </p>
      <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <a href="${cat.catalogDownload}" download class="btn btn-primary btn-sm">
          <span aria-hidden="true">📥</span> Download ${cat.catalogName}
        </a>
        <a href="/dealer.html" class="btn btn-secondary btn-sm">
          Apply for Dealership
        </a>
      </div>
    </div>
  </section>

  <!-- Products Grid Section -->
  <main class="section">
    <div class="container">
      <div class="category-grid" style="margin-bottom: 48px;">
        ${cardsHtml}
      </div>

      <!-- Quick Category Switcher -->
      <div style="background: var(--bg-section); padding: 28px; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
        <h3 style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 12px; font-weight: 700;">Explore Other Product Categories</h3>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="/products/rollers.html" class="btn btn-outline btn-sm">1. Wallfin™ Paint Rollers</a>
          <a href="/products/brushes.html" class="btn btn-outline btn-sm">2. Panama Paint Brushes</a>
          <a href="/products/accessories.html" class="btn btn-outline btn-sm">3. Thinners &amp; Polish</a>
          <a href="/products.html" class="btn btn-secondary btn-sm">View Full Catalog Hub</a>
        </div>
      </div>
    </div>
  </main>

  ${getFooterHtml()}
</body>

</html>
`;

  const catPath = path.join(productsDir, cat.fileName);
  fs.writeFileSync(catPath, catPageHtml);
  console.log(`Generated category: products/${cat.fileName}`);
});

// 3. Update sitemap.xml with all new products and category hubs
const sitemapPath = path.join(__dirname, 'sitemap.xml');
const dateToday = '2026-10-24';

const allUrls = [
  'https://jjandcompany.net/',
  'https://jjandcompany.net/products.html',
  'https://jjandcompany.net/dealer.html',
  'https://jjandcompany.net/about.html',
  'https://jjandcompany.net/contact.html',
  'https://jjandcompany.net/privacy-policy.html',
  // Category hubs
  'https://jjandcompany.net/products/rollers.html',
  'https://jjandcompany.net/products/brushes.html',
  'https://jjandcompany.net/products/accessories.html',
  // Individual products
  ...data.products.map(p => `https://jjandcompany.net/products/${p.id}.html`)
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u}</loc>
    <lastmod>${dateToday}</lastmod>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(sitemapPath, sitemapXml);
console.log(`Updated sitemap.xml with ${allUrls.length} total URLs.`);

console.log('Build completed successfully!');
