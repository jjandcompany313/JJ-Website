
const SVG_PDF = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`;
const SVG_WA = `<svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 01-5.82 2.41h-.01c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.95-.19-.3a8.196 8.196 0 01-1.26-4.55c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>`;
const SVG_MENU = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
const SVG_CLOSE = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
const SVG_PHONE = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
const SVG_MAIL = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
const SVG_PIN = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
const SVG_STAR = `<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="#F59E0B" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const locationsDir = path.join(rootDir, 'locations');
if (!fs.existsSync(locationsDir)) fs.mkdirSync(locationsDir, { recursive: true });

const locationsData = JSON.parse(fs.readFileSync(path.join(rootDir, 'locations.json'), 'utf8'));

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateHeader(activeNav = 'dealer') {
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

      <!-- Desktop Navigation -->
      <nav class="nav-links">
        <a href="/" class="nav-link">Home</a>
        <a href="/products.html" class="nav-link">Catalog</a>
        <a href="/dealer.html" class="nav-link active">Dealership</a>
        <a href="/about.html" class="nav-link">About</a>
        <a href="/contact.html" class="nav-link">Contact</a>
      </nav>

      <div class="header-cta-group">
        <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-secondary btn-sm">${SVG_PDF} Master Catalogue</a>
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
        <a href="/products.html" class="nav-link">Catalog</a>
        <a href="/dealer.html" class="nav-link active">Dealership</a>
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

function generateFooter() {
  return `
  <!-- Critical Footer Layout Styles -->
  <style>
    .footer-pre-bar { background-color: #0B0414; padding: 24px 0; border-top: 1px solid rgba(147, 112, 219, 0.16); width: 100%; }
    .footer-pre-inner { display: flex; justify-content: space-between; align-items: center; gap: 32px; width: 100%; }
    .footer-pre-heading { font-family: var(--font-heading); font-size: 1rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #FFFFFF; margin: 0; line-height: 1.35; }
    .footer-pre-form { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 320px; flex-shrink: 0; }
    .footer-pre-input { background-color: rgba(147, 112, 219, 0.08); color: #FFFFFF; border: 1px solid rgba(147, 112, 219, 0.25); border-radius: var(--radius-sm); padding: 10px 14px; font-size: var(--font-sm); outline: none; width: 100%; box-sizing: border-box; }
    .footer-pre-input:focus { border-color: var(--deep-pink); }
    .footer-pre-btn { align-self: flex-start; background: linear-gradient(135deg, var(--deep-pink) 0%, #D80F7B 100%); color: #FFFFFF; font-weight: 800; font-size: var(--font-xs); letter-spacing: 0.08em; text-transform: uppercase; padding: 9px 26px; border: none; border-radius: var(--radius-sm); cursor: pointer; font-family: var(--font-heading); }
    .footer-pre-btn:hover { background: linear-gradient(135deg, var(--fuchsia) 0%, var(--deep-pink) 100%); }
    .site-footer { background-color: #140520; color: #FFFFFF; padding: 52px 0 36px 0; border-top: 1px solid rgba(255, 255, 255, 0.06); width: 100%; }
    .wooster-footer-grid { display: grid; grid-template-columns: 1.3fr 1fr 1fr 1.2fr; gap: 40px; align-items: start; width: 100%; }
    .wooster-brand-logo { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
    .wooster-brand-name { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; letter-spacing: 0.06em; color: #FFFFFF; }
    .wooster-tagline { margin: 10px 0 14px 0; font-size: var(--font-sm); color: #CBD5E1; font-weight: 500; line-height: 1.5; }
    .wooster-address { font-style: normal; font-size: var(--font-xs); line-height: 1.7; color: #CBD5E1; letter-spacing: 0.02em; margin-bottom: 16px; }
    .wooster-address strong { color: #FFFFFF; font-weight: 700; }
    .wooster-legal-line { font-size: 0.72rem; color: #94A3B8; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; text-transform: uppercase; letter-spacing: 0.04em; font-family: var(--font-heading); }
    .wooster-legal-line a { color: #CBD5E1; text-decoration: none; }
    .wooster-legal-line a:hover { color: #FFFFFF; text-decoration: underline; }
    .wooster-sep { color: #64748B; }
    .wooster-col-title { font-family: var(--font-heading); font-size: var(--font-xs); font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #FFFFFF; margin: 0 0 16px 0; }
    .wooster-nav-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
    .wooster-nav-links a { color: #CBD5E1; font-family: var(--font-heading); font-size: var(--font-xs); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; }
    .wooster-nav-links a:hover { color: #FFFFFF; }
    .wooster-contact-info { font-size: var(--font-xs); color: #CBD5E1; line-height: 1.6; margin-top: 16px; display: flex; flex-direction: column; gap: 6px; }
    .wooster-contact-info a { color: #CBD5E1; text-decoration: none; }
    .wooster-contact-info a:hover { color: #FFFFFF; text-decoration: underline; }
    .wooster-social-icons { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
    .wooster-social-btn { width: 38px; height: 38px; display: inline-flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: var(--radius-sm); color: #FFFFFF; text-decoration: none; }
    .wooster-social-btn:hover { background: var(--primary); border-color: var(--primary); color: #FFFFFF; transform: translateY(-2px); }
    @media (max-width: 992px) { .wooster-footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
    @media (max-width: 576px) { .wooster-footer-grid { grid-template-columns: 1fr; gap: 28px; } .footer-pre-inner { flex-direction: column; align-items: flex-start; } .footer-pre-form { max-width: 100%; } }
  </style>

  <!-- Pre-Footer Strip: Wholesale & Trade Updates -->
  <aside class="footer-pre-bar" aria-label="Trade Updates Subscription">
    <div class="container footer-pre-inner">
      <p class="footer-pre-heading">RECEIVE THE LATEST ARTICLES, ADVICE, AND UPDATES</p>
      <form class="footer-pre-form" action="/contact.html" method="get">
        <input type="email" name="email" class="footer-pre-input" placeholder="Enter your email..." required aria-label="Enter your email for trade updates">
        <button type="submit" class="footer-pre-btn">JOIN</button>
      </form>
    </div>
  </aside>

  <!-- Wooster-Style Balanced 4-Column Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="wooster-footer-grid">
        <!-- Col 1: Brand & Headquarters (Left) -->
        <div class="wooster-col">
          <a href="/" class="wooster-brand-logo" aria-label="JJ &amp; Company Home">
            <picture>
              <source srcset="/assets/images/jj-company-logo-nav.webp" type="image/webp">
              <img src="/assets/images/jj-company-logo-nav.png" alt="JJ &amp; Company Logo" class="wooster-logo-img" width="38" height="38">
            </picture>
            <span class="wooster-brand-name">JJ &amp; COMPANY</span>
          </a>
          <p class="wooster-tagline">Engineered for Professional Finish™</p>
          <address class="wooster-address">
            <strong>THE J. J. &amp; COMPANY</strong><br>
            Plot No-8, Dixit Wadi, Pande Chowk Rd<br>
            Jalgaon, Maharashtra 425001<br>
            GSTIN: 27ACXPN6682N1ZC
          </address>
          <div class="wooster-legal-line">
            <span>&copy; <span id="currentYear">2026</span> JJ &amp; COMPANY</span>
            <span class="wooster-sep">|</span>
            <a href="/privacy-policy.html">PRIVACY</a>
            <span class="wooster-sep">|</span>
            <a href="/sitemap.xml">SITEMAP</a>
            <span class="wooster-sep">|</span>
            <span>HUBS:</span>
            <a href="/locations/jalgaon.html">JALGAON</a>
            <span class="wooster-sep">&middot;</span>
            <a href="/locations/dhule.html">DHULE</a>
            <span class="wooster-sep">&middot;</span>
            <a href="/locations/nandurbar.html">NANDURBAR</a>
            <span class="wooster-sep">&middot;</span>
            <a href="/locations/buldhana.html">BULDHANA</a>
            <span class="wooster-sep">&middot;</span>
            <a href="/locations/madhya-pradesh.html">MADHYA PRADESH</a>
          </div>
        </div>

        <!-- Col 2: Navigation & Dealership (Left-Center) -->
        <div class="wooster-col">
          <p class="wooster-col-title">NAVIGATION</p>
          <ul class="wooster-nav-links">
            <li><a href="/">HOME</a></li>
            <li><a href="/about.html">ABOUT US</a></li>
            <li><a href="/dealer.html">DEALERSHIP</a></li>
            <li><a href="/contact.html">CONTACT US</a></li>
            <li><a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download>CATALOGUE (PDF)</a></li>
          </ul>
        </div>

        <!-- Col 3: Products (Right-Center) -->
        <div class="wooster-col">
          <p class="wooster-col-title">PRODUCTS</p>
          <ul class="wooster-nav-links">
            <li><a href="/products/rollers.html">WALLFIN™ ROLLERS</a></li>
            <li><a href="/products/brushes.html">PANAMA BRUSHES</a></li>
            <li><a href="/products/accessories.html">THINNERS &amp; POLISH</a></li>
            <li><a href="/products/accessories.html">ABRASIVES &amp; PATA</a></li>
            <li><a href="/products.html">ALL PRODUCTS</a></li>
          </ul>
        </div>

        <!-- Col 4: Connect & Direct Inquiries (Right) -->
        <div class="wooster-col">
          <p class="wooster-col-title">CONNECT WITH US</p>
          <div class="wooster-social-icons">
            <a href="https://www.instagram.com/jjandcompany313/" target="_blank" rel="noopener noreferrer nofollow" class="wooster-social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.indiamart.com/kgn-works-pune/" target="_blank" rel="noopener noreferrer nofollow" class="wooster-social-btn" aria-label="IndiaMART">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61594625407272" target="_blank" rel="noopener noreferrer nofollow" class="wooster-social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/919422775429" target="_blank" rel="noopener noreferrer nofollow" class="wooster-social-btn" aria-label="WhatsApp">
              ${SVG_WA}
            </a>
          </div>
          <div class="wooster-contact-info">
            <span>Direct: <a href="tel:+919422775429">+91 94227 75429</a></span>
            <span>Office: <a href="tel:+919890003539">+91 98900 03539</a></span>
            <span>Email: <a href="mailto:jjandcompany313@gmail.com">jjandcompany313@gmail.com</a></span>
          </div>
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

  <script defer src="/js/site-data.js?v=4.4"></script>
  <script defer src="/js/main.js?v=4.4"></script>
  <script>
    document.getElementById("currentYear").textContent = new Date().getFullYear();
  </script>
  `;
}

locationsData.forEach(loc => {
  const pageUrl = `https://jjandcompany.net/locations/${loc.slug}.html`;
  const waText = encodeURIComponent(`Hello JJ & Company, I am inquiring about wholesale dealer supply for ${loc.name}. Please share pricing and dispatch details.`);
  const waUrl = `https://wa.me/919422775429?text=${waText}`;

  // Structured Data: Breadcrumbs
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
        "name": "Dealership",
        "item": "https://jjandcompany.net/dealer.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": loc.name,
        "item": pageUrl
      }
    ]
  };

  // Structured Data: Wholesale Local Business / Service
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WholesaleStore", "LocalBusiness"],
    "name": `JJ & Company - ${loc.name} Wholesale Paint Tools Supply`,
    "description": loc.metaDesc,
    "url": pageUrl,
    "telephone": "+91-94227-75429",
    "priceRange": "₹₹",
    "image": "https://jjandcompany.net/assets/images/rollers/hero-roller-isolated.png",
    "hasMap": "https://www.google.com/maps/place/J.+J.+%26+COMPANY/@21.0080644,75.5706007,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd90fa88342dc29:0xc574da6d83f5c10a!8m2!3d21.0080644!4d75.5706007!16s%2Fg%2F11vdgxdypk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No-8, Dixit Wadi, Swatantrya Chowk - Pande Chowk Rd",
      "addressLocality": "Jalgaon",
      "addressRegion": "Maharashtra",
      "postalCode": "425001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.0080644,
      "longitude": 75.5706007
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "12",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": `${loc.name}, ${loc.state}`
    },
    "sameAs": [
      "https://g.page/r/CQrB9YNt2nTFEBM",
      "https://www.google.com/maps/place/J.+J.+%26+COMPANY/@21.0080644,75.5706007,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd90fa88342dc29:0xc574da6d83f5c10a!8m2!3d21.0080644!4d75.5706007!16s%2Fg%2F11vdgxdypk",
      "https://www.indiamart.com/kgn-works-pune/",
      "https://www.facebook.com/profile.php?id=61594625407272",
      "https://www.instagram.com/jjandcompany313/"
    ],
    "knowsAbout": [
      "Paint accessories manufacturer in India",
      "Painting tools manufacturer in India",
      "Paint roller manufacturer in India",
      "Paint accessories wholesale",
      "Paint tools wholesale market",
      "Paint roller wholesale",
      "Paint brush wholesale",
      "Painting tools wholesale suppliers",
      "Paint accessories bulk suppliers",
      "Paint accessories distributor",
      "Paint tools wholesale dealer",
      "Paint accessories dealer",
      "Painting tools dealer near me",
      "Paint roller dealers",
      "Paint brush dealers",
      "Paint accessories supplier in India",
      "Paint tools dealers in Maharashtra",
      "Paint accessories dealership",
      "Wallfin paint rollers",
      "Panama paint brushes",
      "Paint roller refills",
      "Texture painting tools",
      "Wall paint roller"
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "JJ & Company",
      "legalName": "J. J. & Company",
      "url": "https://jjandcompany.net"
    }
  };

  // Build FAQ Schema & HTML
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (loc.faq || []).map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const faqHtml = (loc.faq || []).map(f => `
    <div style="background: transparent; padding: 20px 0; border-bottom: 1px solid rgba(147, 112, 219, 0.16);">
      <h3 style="font-size: 1.05rem; color: #FFFFFF; margin-bottom: 8px; font-weight: 700;">
        ${escapeHtml(f.q)}
      </h3>
      <p style="font-size: 0.92rem; color: var(--text-body); line-height: 1.6; margin: 0;">
        ${escapeHtml(f.a)}
      </p>
    </div>
  `).join('');

  // Other 4 locations for cross linking
  const otherLocationsHtml = locationsData
    .filter(other => other.slug !== loc.slug)
    .map(other => `
      <a href="/locations/${other.slug}.html" class="spec-pill" style="text-decoration: none; padding: 10px 16px; font-size: 0.9rem; background: rgba(147, 112, 219, 0.08); border: 1px solid rgba(147, 112, 219, 0.25); border-radius: var(--radius-md); color: #FFFFFF; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
        ${SVG_PIN} ${escapeHtml(other.name)} Supply 
      </a>
    `).join('');

  const pageHtml = `<!DOCTYPE html>
<html lang="en-IN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(loc.title)}</title>
  <meta name="description" content="${escapeHtml(loc.metaDesc)}">

  <link rel="canonical" href="${pageUrl}">
  <link rel="alternate" hreflang="en-IN" href="${pageUrl}">
  <link rel="alternate" hreflang="x-default" href="${pageUrl}">

  <!-- High-Priority Font Preconnections (Eliminates Render Blocking & FCP Delay) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="/css/style.css?v=4.4">

  <!-- Standard Favicons & Google Search Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="144x144" href="/assets/icons/favicon-144x144.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#08030E">

  <!-- Open Graph / Meta -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(loc.title)}">
  <meta property="og:description" content="${escapeHtml(loc.metaDesc)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="https://jjandcompany.net/assets/images/rollers/hero-roller-isolated.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(loc.title)}">
  <meta name="twitter:description" content="${escapeHtml(loc.metaDesc)}">
  <meta name="twitter:image" content="https://jjandcompany.net/assets/images/rollers/hero-roller-isolated.png">

  <!-- Structured Data: Breadcrumbs -->
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbJsonLd, null, 2)}
  </script>

  <!-- Structured Data: Local Wholesale Supply -->
  <script type="application/ld+json">
  ${JSON.stringify(localBusinessJsonLd, null, 2)}
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
    :root {
      --fuchsia: #FF00FF;
      --deep-pink: #FF1493;
      --medium-purple: #9370DB;
      --accent: #FF1493;
      --accent-hover: #FF00FF;
      --bg-main: #08030E;
      --text-main: #FFFFFF;
      --text-body: #E4D9F5;
      --text-muted: #B8A7D4;
      --border-color: rgba(147, 112, 219, 0.18);
    }
    html, body {
      background-color: var(--bg-main);
      color: var(--text-body);
      overflow-x: clip;
    }
    ::selection {
      background-color: #FF00FF;
      color: #FFFFFF;
    }
    :focus-visible {
      outline: 2px solid #FF1493;
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
  ${generateHeader('dealer')}

  <!-- Breadcrumbs Bar -->
  <nav class="breadcrumb-nav" aria-label="Breadcrumbs" style="background: transparent; border-bottom: 1px solid rgba(147, 112, 219, 0.16); padding: 14px 0;">
    <div class="container" style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
      <a href="/" style="color: var(--medium-purple); text-decoration: none;">Home</a>
      <span>&rsaquo;</span>
      <a href="/dealer.html" style="color: var(--medium-purple); text-decoration: none;">Dealership</a>
      <span>&rsaquo;</span>
      <span style="color: #FFFFFF; font-weight: 600;">${escapeHtml(loc.name)}</span>
    </div>
  </nav>

  <!-- Page Header -->
  <section class="page-header" style="text-align: left; padding: 48px 0 40px 0;">
    <div class="container">
      <div class="hero-badge" style="color: var(--accent-lime); margin-bottom: 12px; display: inline-flex;">
        <span class="hero-badge-dot" style="background-color: var(--accent-lime);" aria-hidden="true"></span>
        Direct Depo Supply • ${escapeHtml(loc.name)}, ${escapeHtml(loc.state)}
      </div>
      <h1 class="page-header-title" style="margin-bottom: 12px; font-size: 2.2rem; line-height: 1.25;">
        ${loc.h1}
      </h1>
      <p class="page-header-sub" style="margin: 0 0 24px 0; max-width: 820px; font-size: 1.05rem;">
        ${escapeHtml(loc.subtitle)}
      </p>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-lg">
          ${SVG_WA} Get Wholesale Rates on WhatsApp
        </a>
        <a href="https://g.page/r/CQrB9YNt2nTFEBM/review" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-outline btn-lg" style="display: inline-flex; align-items: center; gap: 6px;">
          ${SVG_STAR} Google Verified Profile
        </a>
        <a href="#inquiryForm" class="btn btn-secondary btn-lg">
          Apply for Dealership
        </a>
        <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-outline btn-lg">
          ${SVG_PDF} Master Catalogue (PDF)
        </a>
      </div>
    </div>
  </section>

  <!-- Logistics & Route Snapshot Strip -->
  <div style="background: rgba(147, 112, 219, 0.04); border-bottom: 1px solid rgba(147, 112, 219, 0.16); padding: 20px 0;">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <div>
            <strong style="display: block; font-size: 0.9rem; color: #FFFFFF; margin-bottom: 2px;">Transit &amp; Delivery</strong>
            <span style="font-size: 0.88rem; color: var(--text-muted);">${escapeHtml(loc.transitTime)}</span>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <div>
            <strong style="display: block; font-size: 0.9rem; color: #FFFFFF; margin-bottom: 2px;">Logistics Route</strong>
            <span style="font-size: 0.88rem; color: var(--text-muted);">${escapeHtml(loc.logistics)}</span>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <div>
            <strong style="display: block; font-size: 0.9rem; color: #FFFFFF; margin-bottom: 2px;">Key Towns Served</strong>
            <span style="font-size: 0.88rem; color: var(--text-muted);">${escapeHtml(loc.coverage)}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Body Content -->
  <main class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: start;">

        <!-- Left Column: Rich Local Copy -->
        <article style="line-height: 1.75; color: var(--text-body);">
          
          <!-- AEO Direct Answer Block for AI Search & Featured Snippets -->
          <section class="aeo-summary-box" style="background: rgba(147, 112, 219, 0.05); border: 1px solid rgba(147, 112, 219, 0.2); border-radius: var(--radius-md); padding: 24px 26px; margin-bottom: 32px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <span style="display: inline-block; width: 10px; height: 10px; background: var(--fuchsia); border-radius: 50%;" aria-hidden="true"></span>
              <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--medium-purple);">Trade Dispatch Summary</span>
            </div>
            <h2 style="font-size: 1.25rem; color: #FFFFFF; font-weight: 800; margin-bottom: 12px; line-height: 1.35;">
              Wholesale Supply &amp; Transport for ${escapeHtml(loc.name)}
            </h2>
            <p style="font-size: 0.96rem; color: var(--text-body); line-height: 1.65; margin-bottom: 16px;">
              Direct factory supply of Wallfin™ paint rollers and imported Panama™ brushes to hardware dealers and paint stockists across ${escapeHtml(loc.name)}.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.85rem; color: #D5C7ED;">
              <div><strong>Transit Time:</strong> ${escapeHtml(loc.transitTime)}</div>
              <div><strong>Route:</strong> ${escapeHtml(loc.logistics)}</div>
              <div><strong>Coverage:</strong> ${escapeHtml(loc.coverage)}</div>
              <div><strong>Order Desk:</strong> +91 94227 75429</div>
            </div>
          </section>

          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.55rem; color: #FFFFFF; font-weight: 800; margin-bottom: 14px;">
              Wholesale Market Context for ${escapeHtml(loc.name)}
            </h2>
            <p style="font-size: 1rem; margin-bottom: 16px;">
              ${escapeHtml(loc.intro)}
            </p>
            <p style="font-size: 1rem;">
              ${escapeHtml(loc.marketContext)}
            </p>
          </section>

          <section style="margin-bottom: 40px; background: rgba(147, 112, 219, 0.04); padding: 24px; border-radius: var(--radius-md); border: 1px solid rgba(147, 112, 219, 0.18);">
            <h2 style="font-size: 1.3rem; color: #FFFFFF; font-weight: 800; margin-bottom: 12px;">
              Available Catalogue Lines for ${escapeHtml(loc.name)}
            </h2>
            <p style="margin-bottom: 18px; font-size: 0.95rem;">
              ${escapeHtml(loc.productSupply)}
            </p>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="/products/rollers.html" class="btn btn-outline btn-sm">Wallfin™ Rollers</a>
              <a href="/products/brushes.html" class="btn btn-outline btn-sm">Panama Brushes</a>
              <a href="/products/accessories.html" class="btn btn-outline btn-sm">Thinners &amp; Prep Tools</a>
            </div>
          </section>

          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.4rem; color: #FFFFFF; font-weight: 800; margin-bottom: 14px;">
              Why Hardware Counters in ${escapeHtml(loc.name)} Partner with JJ &amp; Company
            </h2>
            <ul style="padding-left: 20px; margin: 0 0 20px 0; display: flex; flex-direction: column; gap: 10px;">
              ${(loc.tradeAdvantages || []).map(adv => `<li style="font-size: 0.95rem;">${escapeHtml(adv)}</li>`).join('')}
            </ul>
          </section>

          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.4rem; color: #FFFFFF; font-weight: 800; margin-bottom: 14px;">
              Packaging &amp; Transport Logistics for ${escapeHtml(loc.name)}
            </h2>
            <p style="font-size: 0.95rem; margin-bottom: 16px;">
              ${escapeHtml(loc.transportDetails)}
            </p>
            <div style="background: rgba(147, 112, 219, 0.08); border: 1px solid rgba(147, 112, 219, 0.25); padding: 16px 20px; border-radius: var(--radius-md); font-size: 0.88rem; color: #FFFFFF;">
              <strong>Flexible Trial Consignments:</strong> We support newly onboarded hardware shops and regional stockists with flexible order quantities and mixed-carton assortments to test local painter preference before committing to bulk seasonal dispatches.
            </div>
          </section>

          <!-- Frequently Asked Questions -->
          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.4rem; color: #FFFFFF; font-weight: 800; margin-bottom: 16px;">
              Frequently Asked Questions for ${escapeHtml(loc.name)} Dealers
            </h2>
            <div>
              ${faqHtml}
            </div>
          </section>

          <!-- Other Supply Locations -->
          <section style="border-top: 1px solid var(--border-color); padding-top: 24px; margin-bottom: 30px;">
            <h2 style="font-size: 1.15rem; color: #FFFFFF; font-weight: 700; margin-bottom: 12px;">
              Connected Wholesale Hubs &amp; Transport Routes from ${escapeHtml(loc.name)}
            </h2>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${otherLocationsHtml}
            </div>
          </section>

        </article>

        <!-- Right Column: Dealer Application Form Card -->
        <aside id="inquiryForm" style="position: sticky; top: 90px; background: rgba(147, 112, 219, 0.04); padding: 32px 28px; border-radius: var(--radius-lg); border: 1px solid rgba(147, 112, 219, 0.18);">
          <div style="margin-bottom: 20px;">
            <span class="section-tag" style="margin-bottom: 6px;">Wholesale Dealership</span>
            <h2 style="font-size: 1.4rem; color: #FFFFFF; font-weight: 800; margin-bottom: 6px;">
              Apply for Dealership in ${escapeHtml(loc.name)}
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
              Direct depo trade rates on Wallfin™ rollers, Panama brushes, thinners, and polish for retail shops in ${escapeHtml(loc.name)}.
            </p>
          </div>

          <form id="dealerApplicationForm" class="inquiry-form" method="POST">
            <input type="hidden" name="region" value="${escapeHtml(loc.name)}">

            <div class="form-group" style="margin-bottom: 14px;">
              <label for="contactPerson" class="form-label" style="font-size: 0.85rem;">Contact Person *</label>
              <input type="text" id="contactPerson" name="contactPerson" class="form-control" required placeholder="Your full name">
            </div>

            <div class="form-group" style="margin-bottom: 14px;">
              <label for="firmName" class="form-label" style="font-size: 0.85rem;">Hardware Shop / Firm Name *</label>
              <input type="text" id="firmName" name="firmName" class="form-control" required placeholder="e.g. ${escapeHtml(loc.name)} Paint Counter">
            </div>

            <div class="form-group" style="margin-bottom: 14px;">
              <label for="phone" class="form-label" style="font-size: 0.85rem;">WhatsApp / Phone Number *</label>
              <input type="tel" id="phone" name="phone" class="form-control" required pattern="[0-9]{10}" placeholder="10-digit mobile number">
            </div>

            <div class="form-group" style="margin-bottom: 14px;">
              <label for="city" class="form-label" style="font-size: 0.85rem;">City / Town in ${escapeHtml(loc.name)} *</label>
              <input type="text" id="city" name="city" class="form-control" required value="${escapeHtml(loc.name)}">
            </div>

            <div class="form-group" style="margin-bottom: 14px;">
              <label for="monthlyVolume" class="form-label" style="font-size: 0.85rem;">Estimated Monthly Requirement</label>
              <select id="monthlyVolume" name="monthlyVolume" class="form-control">
                <option value="Trial Consignment">Initial Trial Consignment</option>
                <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 / month</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 / month</option>
                <option value="₹1,00,000+">₹1,00,000+ / month (Stockist)</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 18px;">
              <label for="message" class="form-label" style="font-size: 0.85rem;">Products Required *</label>
              <textarea id="message" name="message" class="form-control" rows="3" required placeholder="e.g. Wallfin rollers, Panama brushes, thinners..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-block" style="padding: 12px; font-weight: 700; width: 100%;">
              Send Dealership Inquiry 
            </button>
          </form>

          <div style="margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--border-color); text-align: center;">
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">Need immediate trade rates?</p>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp btn-sm btn-block" style="width: 100%; text-align: center;">
              ${SVG_WA} Chat Directly on WhatsApp
            </a>
          </div>
        </aside>

      </div>
    </div>
  </main>

  ${generateFooter()}
</body>

</html>
`;

  const filePath = path.join(locationsDir, `${loc.slug}.html`);
  fs.writeFileSync(filePath, pageHtml, 'utf8');
  console.log(`Generated location page: locations/${loc.slug}.html`);
});

// Update sitemap.xml to include the 5 location pages
// Regenerate full standard sitemap with all 43 URLs
require('./scripts/generate-sitemap.js');

console.log('All 5 location pages generated successfully!');
