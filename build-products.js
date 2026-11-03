
const SVG_PDF = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`;
const SVG_WA = `<svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 01-5.82 2.41h-.01c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.95-.19-.3a8.196 8.196 0 01-1.26-4.55c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>`;
const SVG_MENU = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
const SVG_CLOSE = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
const SVG_PHONE = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
const SVG_MAIL = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
const SVG_PIN = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
const SVG_STAR = `<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="#F59E0B" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

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
  <!-- Main Header -->
  <header class="site-header">
    <div class="container header-container">
      <a href="/" class="brand-logo" title="JJ &amp; Company Home">
        <picture>
          <source srcset="/assets/images/jj-company-logo-nav.webp" type="image/webp">
          <img src="/assets/images/jj-company-logo-nav.png" alt="JJ &amp; Company Logo" class="logo-img" width="44" height="44">
        </picture>
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
        <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-secondary btn-sm">${SVG_PDF} Master Catalogue</a>
        <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20I%20am%20inquiring%20about%20your%20products."
          target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp btn-sm" aria-label="WhatsApp Direct Support">
          ${SVG_WA} WhatsApp
        </a>
        <button id="mobileToggle" class="mobile-toggle" aria-label="Open Navigation Menu">${SVG_MENU}</button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div id="mobileBackdrop" class="mobile-backdrop"></div>
  <aside id="mobileDrawer" class="mobile-nav-drawer" aria-label="Mobile Menu">
    <div>
      <div class="mobile-drawer-header">
        <div class="brand-logo">
          <picture>
            <source srcset="/assets/images/jj-company-logo-nav.webp" type="image/webp">
            <img src="/assets/images/jj-company-logo-nav.png" alt="JJ &amp; Company Logo" class="logo-img" width="40" height="40">
          </picture>
          <span class="brand-name">JJ &amp; COMPANY</span>
        </div>
        <button id="mobileClose" class="mobile-toggle" aria-label="Close Menu">${SVG_CLOSE}</button>
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
      <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-primary btn-block" style="margin-bottom: 10px;">${SVG_PDF} Download Master Catalogue (PDF)</a>
      <a href="https://wa.me/919422775429" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp btn-block">${SVG_WA} Chat on WhatsApp</a>
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
            <picture>
              <source srcset="/assets/images/jj-company-logo-nav.webp" type="image/webp">
              <img src="/assets/images/jj-company-logo-nav.png" alt="JJ &amp; Company Logo" class="logo-img" width="44" height="44">
            </picture>
            <span class="brand-name">JJ &amp; COMPANY</span>
          </div>
          <p class="footer-desc">
            Direct distributor & brand supplier of Wallfin™ paint rollers (TM Application ID: 8027912), direct importer of authentic Panama paint brushes, and distributor of finishing accessories at our Jalgaon Depo, Maharashtra.
          </p>
          <div class="gst-badge">
            <span> GSTIN:</span>
            <strong>27ACXPN6682N1ZC</strong>
          </div>
          <div class="gst-badge" style="margin-top: 6px;">
            <span> Registered Brand:</span>
            <strong>Wallfin (TM: 8027912)</strong>
          </div>
          <div style="margin-top: 14px; display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
  <a href="https://www.facebook.com/profile.php?id=61594625407272" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Facebook</a>
  <a href="https://www.instagram.com/jjandcompany313/" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Instagram</a>
  <a href="https://www.indiamart.com/kgn-works-pune/" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">IndiaMART</a>
  <a href="https://g.page/r/CQrB9YNt2nTFEBM" target="_blank" rel="noopener noreferrer nofollow" class="footer-social-link">Google Maps</a>
</div>
        </div>

        <div>
          <h3 class="footer-heading">Navigation</h3>
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
          <h3 class="footer-heading">Product Lines</h3>
          <ul class="footer-links">
            <li><a href="/products/rollers.html">1. Wallfin™ Paint Rollers</a></li>
            <li><a href="/products/brushes.html">2. Panama Paint Brushes</a></li>
            <li><a href="/products/accessories.html">3. Thinners, Polish &amp; Abrasives</a></li>
            <li><a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download>${SVG_PDF} Master Catalogue (PDF)</a></li>
            <li><a href="/assets/docs/Wall_Fin_Paint_Roller_Catalogue_2026.pdf" download>${SVG_PDF} Wall Fin Catalogue (PDF)</a></li>
            <li><a href="/assets/docs/JJ_Company_Panama_Brush_Catalog.pdf" download>${SVG_PDF} Panama Brush Catalogue (PDF)</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-heading">Supply Locations</h3>
          <ul class="footer-links">
            <li><a href="/locations/jalgaon.html">Jalgaon (Central Depo)</a></li>
            <li><a href="/locations/dhule.html">Dhule Commercial Hub</a></li>
            <li><a href="/locations/nandurbar.html">Nandurbar &amp; Shahada</a></li>
            <li><a href="/locations/buldhana.html">Buldhana &amp; Khamgaon</a></li>
            <li><a href="/locations/madhya-pradesh.html">Madhya Pradesh (Burhanpur)</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-heading">Depo &amp; Head Office</h3>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              ${SVG_PIN}
              <span>
                Plot No-8, Dixit Wadi, Swatantrya Chowk - Pande Chowk Rd,<br>
                Jalgaon, Maharashtra 425001, India<br>
                <small style="color:var(--text-muted);">(Plus Code: 2H5C+678 | GPS: 21.0080644, 75.5706007)</small>
              </span>
            </div>
            <div class="footer-contact-item">
              ${SVG_PHONE}
              <div class="footer-phone-group">
                <a href="tel:+919422775429" class="footer-contact-link">+91 94227 75429 (Primary)</a>
                <a href="tel:+919890003539" class="footer-contact-link">+91 98900 03539 (Office)</a>
              </div>
            </div>
            <div class="footer-contact-item">
              ${SVG_WA}
              <a href="https://wa.me/919422775429" target="_blank" rel="noopener noreferrer nofollow">WhatsApp: +91 94227 75429</a>
            </div>
            <div class="footer-contact-item">
              ${SVG_MAIL}
              <a href="mailto:jjandcompany313@gmail.com">jjandcompany313@gmail.com</a>
            </div>
            <div class="footer-contact-item" style="margin-top: 6px;">
              ${SVG_STAR}
              <a href="https://g.page/r/CQrB9YNt2nTFEBM/review" target="_blank" rel="noopener noreferrer nofollow">Read &amp; Post Google Reviews </a>
            </div>
            <div class="footer-contact-item">
              
              <a href="https://g.page/r/CQrB9YNt2nTFEBM" target="_blank" rel="noopener noreferrer nofollow">Google Business Profile </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          &copy; <span id="currentYear">2026</span> JJ &amp; Company. All rights reserved. Direct Depo Supply.
        </div>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <span>Active supply in Jalgaon, Dhule, Nandurbar, Buldhana and Madhya Pradesh; other regions by transport on request.</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp -->
  <a id="floatingWhatsApp" href="https://wa.me/919422775429" target="_blank" rel="noopener noreferrer nofollow" class="floating-whatsapp"
    aria-label="Chat on WhatsApp">
    ${SVG_WA}
    <span class="floating-whatsapp-tooltip">Chat with Us</span>
  </a>

  <script defer src="/js/site-data.js?v=3.0"></script>
  <script defer src="/js/main.js?v=3.0"></script>
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

// Wooster-Style Technical Application & Compatibility Matrix Generator
function getWoosterMatrixHtml(p) {
  let surfaces = [];
  let coatings = [];
  let coreInfo = '';

  const name = (p.name || '').toLowerCase();
  const cat = p.category;

  if (cat === 'paint-rollers') {
    if (name.includes('epoxy')) {
      surfaces = ['Smooth Concrete', 'Industrial Floors', 'Metal Tanks', 'Levelled Screed'];
      coatings = ['Solvent Epoxy', 'Polyurethane', 'Enamel Primers', 'Floor Resins'];
      coreInfo = 'Solvent-Proof Core • Phenolic Bonded';
    } else if (name.includes('texture')) {
      surfaces = ['Rough Exterior Walls', 'Stucco Plaster', 'Brickwork', 'Block Surfaces'];
      coatings = ['Texture Coatings', 'High-Build Emulsions', 'Heavy Acrylics'];
      coreInfo = 'High-Deflection Textured Sleeve • Extreme Nap';
    } else if (name.includes('foam')) {
      surfaces = ['Doors & Frames', 'Cabinetry & Woodwork', 'Metal Trims', 'Ultra-Smooth Surfaces'];
      coatings = ['Gloss Enamels', 'Lacquers', 'Urethane Stains', 'Clear Finishes'];
      coreInfo = 'High-Density Fine Pore Foam • Mirror Finish';
    } else if (name.includes('green') || name.includes('tiger') || name.includes('brown')) {
      surfaces = ['Semi-Rough Plaster', 'Exterior Cement', 'Boundary Walls', 'Textured Ceilings'];
      coatings = ['Exterior Acrylic Emulsions', 'Waterproof Coatings', 'Penta Primers'];
      coreInfo = 'High-Capacity Acrylic Knit • Heavy Paint Pickup';
    } else {
      // Blue Line, Yellow Line, Standard
      surfaces = ['Smooth Interior Putty', 'Plaster of Paris', 'Gypsum Boards', 'Drywall'];
      coatings = ['Interior Premium Emulsions', 'Distempers', 'Wall Primers'];
      coreInfo = 'High-Density Woven Poly • Zero-Shed Lint Free';
    }
  } else if (cat === 'panama-brushes') {
    surfaces = ['Precision Trims', 'Corners & Edges', 'Window Grills', 'Woodwork & Panelling'];
    if (name.includes('cat') || name.includes('bristol')) {
      coatings = ['Oil-Based Enamels', 'High-Gloss Paints', 'PU Varnishes', 'Stains'];
      coreInfo = 'Pure Natural Bristle Blend • Deep Solvent Hold';
    } else if (name.includes('tynex') || name.includes('swan') || name.includes('222')) {
      coatings = ['All Coatings', 'Water-Based Emulsions', 'Gloss Enamels', 'Primers'];
      coreInfo = 'Flagged Tynex Synthetic Fibres • Epoxy Potting';
    } else {
      coatings = ['Interior & Exterior Emulsions', 'Enamels', 'Universal Primers'];
      coreInfo = 'Reinforced Stainless Ferrule • Computerized Epoxy Potting';
    }
  } else {
    // Accessories
    if (name.includes('thinner')) {
      surfaces = ['Metal Degreasing', 'Equipment Wash', 'Spray Gun Cleaning'];
      coatings = ['Auto Gloss Thinning', 'PU Reduction', 'NC Lacquers'];
      coreInfo = 'Virgin Grade Fast-Evaporating Solvent';
    } else if (name.includes('polish')) {
      surfaces = ['Natural Timber', 'Wooden Furniture', 'Doors & Plywood'];
      coatings = ['French Wood Polish', 'Clear Shellac', 'Spirit Stains'];
      coreInfo = 'Hand-Applied Micro-Penetrating Natural Formula';
    } else {
      surfaces = ['Surface Sanding', 'Putty Levelling', 'Rust Removal'];
      coatings = ['Pre-Paint Surface Preparation'];
      coreInfo = 'Electro-Coated Aluminum Oxide Grain';
    }
  }

  const surfacePills = surfaces.map(s => `<span class="compat-pill compat-surface">${escapeHtml(s)}</span>`).join('');
  const coatingPills = coatings.map(c => `<span class="compat-pill compat-coating">${escapeHtml(c)}</span>`).join('');

  return `
    <div class="wooster-matrix-card">
      <div class="matrix-header">
        <span class="matrix-title">Technical Application &amp; Compatibility Guide</span>
        <span class="matrix-subtitle">${escapeHtml(coreInfo)}</span>
      </div>
      <div class="matrix-grid">
        <div class="matrix-col">
          <div class="matrix-col-lbl">Recommended Surfaces:</div>
          <div class="matrix-pills">${surfacePills}</div>
        </div>
        <div class="matrix-col">
          <div class="matrix-col-lbl">Compatible Paints &amp; Coatings:</div>
          <div class="matrix-pills">${coatingPills}</div>
        </div>
      </div>
    </div>
  `;
}

// 1. Generate Individual Product Pages
data.products.forEach(p => {
  const pageUrl = `https://jjandcompany.net/products/${p.id}.html`;
  const categoryObj = data.categories.find(c => c.id === p.category);
  const categoryUrl = categoryUrlMap[p.category];

  const waText = encodeURIComponent(`Hello JJ & Company, I am interested in wholesale dealer rates for: ${p.name}. Please share pricing.`);
  const waUrl = `https://wa.me/919422775429?text=${waText}`;

  // Concise title strictly under 55 chars / 520px for Google SERP
  const cleanName = p.name.replace(/&amp;/g, '&');
  const pageTitle = cleanName.length > 32
    ? `${cleanName.slice(0, 30).trim()}... | JJ & Company`
    : `${cleanName} | JJ & Company`;

  // Concise meta description strictly under 145 chars for Google SERP
  let cleanMeta = p.shortDesc.replace(/"/g, '&quot;').replace(/\s+/g, ' ').trim();
  if (cleanMeta.length > 138) {
    cleanMeta = cleanMeta.slice(0, 135).replace(/\s+\S*$/, '') + '...';
  }

  // Short product label for H2s to guarantee strictly <= 60 chars
  const shortProdLabel = p.name.length > 28 ? p.name.slice(0, 26).trim() + '...' : p.name;

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
        <picture>
          <source srcset="${rel.thumbnail.endsWith('.webp') ? rel.thumbnail : rel.thumbnail.replace(/\.(png|jpe?g)$/i, '.webp')}" type="image/webp">
          <img src="${rel.thumbnail.endsWith('.webp') ? rel.thumbnail.replace(/\.webp$/i, '.png') : rel.thumbnail}" alt="${escapeHtml(rel.name)}" style="width: 100%; height: 180px; object-fit: contain; background: #FAFAFA; border-radius: var(--radius-sm); margin-bottom: 12px;" loading="lazy" width="280" height="180">
        </picture>
        <h3 style="font-size: 1rem; color: var(--text-main); margin-bottom: 6px; font-weight: 700;">${escapeHtml(rel.name)}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px; flex-grow: 1;">${escapeHtml(rel.shortDesc.slice(0, 110))}...</p>
        <a href="/products/${rel.id}.html" class="btn btn-outline btn-sm" style="text-align: center;">View Specifications </a>
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
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(cleanMeta)}">

  <link rel="canonical" href="${pageUrl}">
  <link rel="alternate" hreflang="en-IN" href="${pageUrl}">
  <link rel="alternate" hreflang="x-default" href="${pageUrl}">

  <!-- High-Priority Font Preconnections (Eliminates Render Blocking & FCP Delay) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="/css/style.css?v=3.0">

  <!-- Standard Favicons & Google Search Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="144x144" href="/assets/icons/favicon-144x144.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#0D0714">

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
            <picture>
              <source srcset="${p.pageImage.endsWith('.webp') ? p.pageImage : p.pageImage.replace(/\.(png|jpe?g)$/i, '.webp')}" type="image/webp">
              <img src="${p.pageImage.endsWith('.webp') ? p.pageImage.replace(/\.webp$/i, '.png') : p.pageImage}" alt="${escapeHtml(p.name)} - JJ &amp; Company Jalgaon" style="width: 100%; height: auto; display: block; border-radius: var(--radius-md);" loading="eager" fetchpriority="high" width="800" height="800">
            </picture>
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

          ${getWoosterMatrixHtml(p)}

          <div style="background: var(--bg-section); padding: 22px; border-radius: var(--radius-md); border: 1.5px solid var(--border-color); margin-bottom: 24px;">
            <h2 style="font-size: 1.15rem; color: var(--text-main); font-weight: 700; margin-bottom: 8px;">Wholesale Supply for ${escapeHtml(shortProdLabel)}</h2>
            <p style="font-size: 0.88rem; color: var(--text-body); line-height: 1.5; margin-bottom: 16px;">
              Direct depo supply for hardware shops, paint counters, and regional stockists. Message our sales desk with your requirements for trade rates and dispatch schedules.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-lg" style="flex: 1; text-align: center; justify-content: center;">
                ${SVG_WA} Get Wholesale Rates on WhatsApp
              </a>
              <a href="/dealer.html" class="btn btn-outline btn-lg" style="flex: 1; text-align: center; justify-content: center;">
                Apply for Dealership
              </a>
            </div>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-outline btn-sm">
              ${SVG_PDF} Download Master Catalogue (PDF)
            </a>
            ${p.category === 'paint-rollers' ? '<a href="/assets/docs/Wall_Fin_Paint_Roller_Catalogue_2026.pdf" download class="btn btn-outline btn-sm">${SVG_PDF} Download Wall Fin Catalogue (PDF)</a>' : ''}
            ${p.category === 'panama-brushes' ? '<a href="/assets/docs/JJ_Company_Panama_Brush_Catalog.pdf" download class="btn btn-outline btn-sm">${SVG_PDF} Download Panama Brush Catalogue (PDF)</a>' : ''}
          </div>
        </div>

      </div>

      <!-- Full Specifications Table -->
      <section style="margin-bottom: 56px;">
        <h2 style="font-size: 1.5rem; color: var(--text-main); font-weight: 800; margin-bottom: 18px;">
          ${escapeHtml(shortProdLabel)} Specifications
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
          <h2 style="font-size: 1.5rem; color: var(--text-main); font-weight: 800;">Companion Products for ${escapeHtml(shortProdLabel)}</h2>
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
    name: 'Wallfin™ Paint Rollers',
    fileName: 'rollers.html',
    title: 'Wallfin Paint Rollers & Refills | JJ & Company',
    metaDesc: 'Explore Wallfin paint rollers and refills supplied from our Jalgaon Depo. Registered brand (TM: 8027912). Standard, 38mm, epoxy and foam rollers.',
    h1: 'Wallfin™ Paint Rollers &amp; Refills Range',
    badge: 'In-House Manufactured • TM: 8027912',
    intro: 'Manufactured directly at our Jalgaon plant under registered brand <strong>Wallfin™</strong> (Trademark Application ID: <strong>8027912</strong>). Built with solvent-proof polypropylene cores, high-density microfiber, and heavy-gauge cage frames across standard 20mm and heavy 38mm diameters.',
    filterCat: 'paint-rollers',
    catalogDownload: '/assets/docs/Wall_Fin_Paint_Roller_Catalogue_2026.pdf',
    catalogName: 'Wall Fin Paint Roller Catalogue (PDF)'
  },
  {
    id: 'panama-brushes',
    name: 'Panama Paint Brushes',
    fileName: 'brushes.html',
    title: 'Panama Paint Brushes Wholesale | JJ & Company',
    metaDesc: 'Browse imported Panama paint brushes from 1 to 5 inch sizes with 100% shed-free epoxy potting. Direct wholesale supply from our Jalgaon Depo.',
    h1: 'Panama Paint Brushes Collection',
    badge: 'Direct Import • Signature Collection',
    intro: 'Directly imported from specialized brush manufacturing partners and distributed at direct wholesale rates. Built with 100% computerized epoxy bristle potting, stainless steel ferrules, and ergonomic handles to eliminate bristle shedding.',
    filterCat: 'panama-brushes',
    catalogDownload: '/assets/docs/JJ_Company_Panama_Brush_Catalog.pdf',
    catalogName: 'Panama Paint Brush Catalogue (PDF)'
  },
  {
    id: 'accessories',
    name: 'Finishing Accessories & Tools',
    fileName: 'accessories.html',
    title: 'Thinners, Polish & Abrasives Catalog | JJ & Company',
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
        <picture>
          <source srcset="${p.thumbnail.endsWith('.webp') ? p.thumbnail : p.thumbnail.replace(/\.(png|jpe?g)$/i, '.webp')}" type="image/webp">
          <img src="${p.thumbnail.endsWith('.webp') ? p.thumbnail.replace(/\.webp$/i, '.png') : p.thumbnail}" alt="${escapeHtml(p.name)}" loading="lazy" width="400" height="260">
        </picture>
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
          <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20please%20send%20wholesale%20rates%20for%20${encodeURIComponent(p.name)}." target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp btn-sm" style="text-align: center;">${SVG_WA} <span>WhatsApp</span></a>
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
  <link rel="alternate" hreflang="en-IN" href="${pageUrl}">
  <link rel="alternate" hreflang="x-default" href="${pageUrl}">

  <!-- High-Priority Font Preconnections (Eliminates Render Blocking & FCP Delay) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="/css/style.css?v=3.0">

  <!-- Standard Favicons & Google Search Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="144x144" href="/assets/icons/favicon-144x144.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#0D0714">

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
          ${SVG_PDF} Download ${cat.catalogName}
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
      <div class="section-header" style="text-align: left; margin-bottom: 28px;">
        <h2 style="font-size: 1.45rem; color: var(--text-main); font-weight: 800; margin: 0;">
          All ${escapeHtml(cat.name)} Models &amp; Specifications
        </h2>
      </div>
      <div class="category-grid" style="margin-bottom: 48px;">
        ${cardsHtml}
      </div>

      <!-- Quick Category Switcher -->
      <div style="background: var(--bg-section); padding: 28px; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
        <h2 style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 12px; font-weight: 700;">Explore Categories Outside ${escapeHtml(cat.name)}</h2>
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

// Regenerate full standard sitemap with all 43 URLs
require('./scripts/generate-sitemap.js');

console.log('Build completed successfully!');
