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
        <img src="/assets/images/jj-company-logo.png" alt="JJ &amp; Company Logo" class="logo-img" width="44" height="44">
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
        <a href="/products.html" class="nav-link">Catalog</a>
        <a href="/dealer.html" class="nav-link active">Dealership</a>
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

function generateFooter() {
  return `
  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top-grid">
        <div class="footer-col-brand">
          <div class="brand-logo">
            <img src="/assets/images/jj-company-logo.png" alt="JJ &amp; Company Logo" class="logo-img" width="40" height="40">
            <span class="brand-name">JJ &amp; COMPANY</span>
          </div>
          <p class="footer-desc">
            Direct distributor &amp; brand supplier of Wallfin™ paint rollers (TM Application ID: 8027912), direct importer of authentic Panama paint brushes, and distributor of finishing accessories at our Jalgaon Depo, Maharashtra.
          </p>
          <div class="gst-badge">
            <span><span aria-hidden="true">🏛️</span> GSTIN:</span>
            <strong>27ACXPN6682N1ZC</strong>
          </div>
          <div class="gst-badge" style="margin-top: 6px;">
            <span><span aria-hidden="true">®️</span> Registered Brand:</span>
            <strong>Wallfin (TM: 8027912)</strong>
          </div>
          <div style="margin-top: 14px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <a href="https://www.facebook.com/profile.php?id=61594625407272" target="_blank" rel="noopener noreferrer" style="color: #CBD5E1; font-size: 0.85rem;" title="Facebook">Facebook</a>
            <span style="color: #475569;">•</span>
            <a href="https://www.instagram.com/jjandcompany313/" target="_blank" rel="noopener noreferrer" style="color: #CBD5E1; font-size: 0.85rem;" title="Instagram">Instagram</a>
            <span style="color: #475569;">•</span>
            <a href="https://www.indiamart.com/kgn-works-pune/" target="_blank" rel="noopener noreferrer" style="color: #CBD5E1; font-size: 0.85rem;" title="IndiaMART">IndiaMART</a>
            <span style="color: #475569;">•</span>
            <a href="https://g.page/r/CQrB9YNt2nTFEBM" target="_blank" rel="noopener noreferrer" style="color: #CBD5E1; font-size: 0.85rem;" title="Google Maps">Google Maps</a>
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
            <li><a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download><span aria-hidden="true">📥</span> Master Catalogue (PDF)</a></li>
            <li><a href="/assets/docs/Wall_Fin_Paint_Roller_Catalogue_2026.pdf" download><span aria-hidden="true">📥</span> Wall Fin Catalogue (PDF)</a></li>
            <li><a href="/assets/docs/JJ_Company_Panama_Brush_Catalog.pdf" download><span aria-hidden="true">📥</span> Panama Brush Catalogue (PDF)</a></li>
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
              <span aria-hidden="true">📍</span>
              <span>
                Plot No-8, Dixit Wadi, Swatantrya Chowk - Pande Chowk Rd,<br>
                Jalgaon, Maharashtra 425001, India<br>
                <small style="color:var(--text-muted);">(Plus Code: 2H5C+678 | GPS: 21.0080644, 75.5706007)</small>
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
            <div class="footer-contact-item" style="margin-top: 6px;">
              <span aria-hidden="true">⭐</span>
              <a href="https://g.page/r/CQrB9YNt2nTFEBM/review" target="_blank" rel="noopener">Read &amp; Post Google Reviews &rarr;</a>
            </div>
            <div class="footer-contact-item">
              <span aria-hidden="true">🌐</span>
              <a href="https://g.page/r/CQrB9YNt2nTFEBM" target="_blank" rel="noopener">Google Business Profile &rarr;</a>
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
          <a href="/privacy-policy.html" style="color: #CBD5E1;">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp -->
  <a id="floatingWhatsApp" href="https://wa.me/919422775429" target="_blank" class="floating-whatsapp"
    aria-label="Chat on WhatsApp">
    💬
    <span class="floating-whatsapp-tooltip">Chat with Us</span>
  </a>

  <script defer src="/js/site-data.js?v=2.6"></script>
  <script defer src="/js/main.js?v=2.6"></script>
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
    "image": "https://jjandcompany.net/assets/images/factory-hero.jpg",
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
    <div style="background: #FFFFFF; padding: 22px 24px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 14px;">
      <h3 style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 8px; font-weight: 700;">
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
      <a href="/locations/${other.slug}.html" class="spec-pill" style="text-decoration: none; padding: 10px 16px; font-size: 0.9rem; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--primary); font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
        <span aria-hidden="true">📍</span> ${escapeHtml(other.name)} Supply &rarr;
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
  <link rel="stylesheet" href="/css/style.css?v=2.6">

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
  <meta property="og:title" content="${escapeHtml(loc.title)}">
  <meta property="og:description" content="${escapeHtml(loc.metaDesc)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="https://jjandcompany.net/assets/images/factory-hero.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(loc.title)}">
  <meta name="twitter:description" content="${escapeHtml(loc.metaDesc)}">
  <meta name="twitter:image" content="https://jjandcompany.net/assets/images/factory-hero.jpg">

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
</head>

<body>
  ${generateHeader('dealer')}

  <!-- Breadcrumbs Bar -->
  <nav class="breadcrumb-nav" aria-label="Breadcrumbs" style="background: #F1F5F9; border-bottom: 1px solid var(--border-color); padding: 12px 0;">
    <div class="container" style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
      <a href="/" style="color: var(--primary); text-decoration: none;">Home</a>
      <span>&rsaquo;</span>
      <a href="/dealer.html" style="color: var(--primary); text-decoration: none;">Dealership</a>
      <span>&rsaquo;</span>
      <span style="color: var(--text-main); font-weight: 600;">${escapeHtml(loc.name)}</span>
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
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
          <span aria-hidden="true">💬</span> Get Wholesale Rates on WhatsApp
        </a>
        <a href="https://g.page/r/CQrB9YNt2nTFEBM/review" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-lg" style="display: inline-flex; align-items: center; gap: 6px;">
          <span aria-hidden="true">⭐</span> Google Verified Profile
        </a>
        <a href="#inquiryForm" class="btn btn-secondary btn-lg">
          <span aria-hidden="true">📝</span> Apply for Dealership
        </a>
        <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-outline btn-lg">
          <span aria-hidden="true">📥</span> Master Catalogue (PDF)
        </a>
      </div>
    </div>
  </section>

  <!-- Logistics & Route Snapshot Strip -->
  <div style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); padding: 20px 0;">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="font-size: 1.6rem;" aria-hidden="true">⏱️</span>
          <div>
            <strong style="display: block; font-size: 0.9rem; color: var(--text-main); margin-bottom: 2px;">Transit &amp; Delivery</strong>
            <span style="font-size: 0.88rem; color: var(--text-muted);">${escapeHtml(loc.transitTime)}</span>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="font-size: 1.6rem;" aria-hidden="true">🚚</span>
          <div>
            <strong style="display: block; font-size: 0.9rem; color: var(--text-main); margin-bottom: 2px;">Logistics Route</strong>
            <span style="font-size: 0.88rem; color: var(--text-muted);">${escapeHtml(loc.logistics)}</span>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="font-size: 1.6rem;" aria-hidden="true">📍</span>
          <div>
            <strong style="display: block; font-size: 0.9rem; color: var(--text-main); margin-bottom: 2px;">Key Towns Served</strong>
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
          <section class="aeo-summary-box" style="background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%); border: 1.5px solid #A7F3D0; border-radius: var(--radius-md); padding: 24px 26px; margin-bottom: 32px; box-shadow: 0 2px 6px rgba(6, 78, 59, 0.05);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <span style="display: inline-block; width: 10px; height: 10px; background: #10B981; border-radius: 50%;" aria-hidden="true"></span>
              <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #065F46;">Quick Wholesale Summary • AEO &amp; AI Search Verified</span>
            </div>
            <h2 style="font-size: 1.25rem; color: #064E3B; font-weight: 800; margin-bottom: 12px; line-height: 1.35;">
              Direct Paint Accessories Manufacturer &amp; Wholesale Supplier in ${escapeHtml(loc.name)}
            </h2>
            <p style="font-size: 0.96rem; color: #064E3B; line-height: 1.65; margin-bottom: 16px;">
              <strong>JJ &amp; Company</strong> is a direct manufacturer of <strong>Wallfin™ paint rollers</strong> (Trademark Application ID: 8027912) and wholesale supplier of <strong>Panama paint brushes</strong>, headquartered at Plot No-8, Dixit Wadi, Jalgaon, Maharashtra 425001. We supply hardware retail shops, paint stockists, and contractors in ${escapeHtml(loc.name)} with direct factory rates, zero middleman markups, and reliable ${escapeHtml(loc.transitTime)}.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.85rem; color: #047857;">
              <div><strong>✓ Brand:</strong> Wallfin™ (TM: 8027912) &amp; Panama</div>
              <div><strong>✓ Facility:</strong> Plot No-8, Dixit Wadi, Jalgaon</div>
              <div><strong>✓ Dispatch:</strong> ${escapeHtml(loc.transitTime)}</div>
              <div><strong>✓ Contact:</strong> +91 94227 75429 (WhatsApp/Call)</div>
            </div>
          </section>

          <!-- Verified Google Review & Local Entity Grounding Card -->
          <div style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px 22px; margin-bottom: 36px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 2rem;" aria-hidden="true">⭐</span>
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <strong style="color: var(--text-main); font-size: 1.02rem;">5.0 ★★★★★ Verified on Google Maps</strong>
                  <span style="background: #E0F2FE; color: #0369A1; font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">Verified Business</span>
                </div>
                <p style="font-size: 0.84rem; color: var(--text-muted); margin: 3px 0 0 0;">J. J. &amp; COMPANY — Trusted by hardware dealers, retail paint counters &amp; contractors.</p>
              </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <a href="https://g.page/r/CQrB9YNt2nTFEBM/review" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                ⭐ Read / Leave Reviews
              </a>
              <a href="https://www.google.com/maps/place/J.+J.+%26+COMPANY/@21.0080644,75.5706007,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd90fa88342dc29:0xc574da6d83f5c10a!8m2!3d21.0080644!4d75.5706007!16s%2Fg%2F11vdgxdypk" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                🗺️ Google Maps Profile
              </a>
            </div>
          </div>

          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.55rem; color: var(--text-main); font-weight: 800; margin-bottom: 14px;">
              Wholesale Paint Supply for ${escapeHtml(loc.name)} Hardware Dealers
            </h2>
            <p style="font-size: 1rem; margin-bottom: 16px;">
              ${escapeHtml(loc.intro)}
            </p>
            <p style="font-size: 1rem;">
              ${escapeHtml(loc.marketContext)}
            </p>
          </section>

          <section style="margin-bottom: 40px; background: #FFFFFF; padding: 28px; border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
            <h2 style="font-size: 1.4rem; color: var(--text-main); font-weight: 800; margin-bottom: 12px;">
              Complete Product Portfolio Available for ${escapeHtml(loc.name)}
            </h2>
            <p style="margin-bottom: 18px; font-size: 0.95rem;">
              ${escapeHtml(loc.productSupply)}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
              <div style="background: #F8FAFC; padding: 14px; border-radius: var(--radius-sm); border-left: 3px solid var(--primary);">
                <strong style="display: block; font-size: 0.9rem; color: var(--text-main);">Wallfin™ Rollers</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Standard 20mm &amp; 38mm core, epoxy &amp; foam fix.</span>
              </div>
              <div style="background: #F8FAFC; padding: 14px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent);">
                <strong style="display: block; font-size: 0.9rem; color: var(--text-main);">Panama Paint Brushes</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">1" to 5" sizes, 100% epoxy potting, zero shed.</span>
              </div>
              <div style="background: #F8FAFC; padding: 14px; border-radius: var(--radius-sm); border-left: 3px solid #0284C7;">
                <strong style="display: block; font-size: 0.9rem; color: var(--text-main);">Finishing Accessories</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Maruti thinners, Nico polish, Cumi sandpaper &amp; pata.</span>
              </div>
            </div>

            <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="/products/rollers.html" class="btn btn-outline btn-sm">Browse Wallfin™ Rollers &rarr;</a>
              <a href="/products/brushes.html" class="btn btn-outline btn-sm">Browse Panama Brushes &rarr;</a>
            </div>
          </section>

          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.4rem; color: var(--text-main); font-weight: 800; margin-bottom: 14px;">
              Why Hardware Counters in ${escapeHtml(loc.name)} Partner with JJ &amp; Company
            </h2>
            <ul style="padding-left: 20px; margin: 0 0 20px 0; display: flex; flex-direction: column; gap: 10px;">
              ${(loc.tradeAdvantages || []).map(adv => `<li style="font-size: 0.95rem;">${escapeHtml(adv)}</li>`).join('')}
            </ul>
          </section>

          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.4rem; color: var(--text-main); font-weight: 800; margin-bottom: 14px;">
              Packaging &amp; Transport Logistics for ${escapeHtml(loc.name)}
            </h2>
            <p style="font-size: 0.95rem; margin-bottom: 16px;">
              ${escapeHtml(loc.transportDetails)}
            </p>
            <div style="background: #FEF9C3; border: 1px solid #FDE047; padding: 16px 20px; border-radius: var(--radius-md); font-size: 0.88rem; color: #713F12;">
              <strong>Flexible Trial Consignments:</strong> We support newly onboarded hardware shops and regional stockists with flexible order quantities and mixed-carton assortments to test local painter preference before committing to bulk seasonal dispatches.
            </div>
          </section>

          <!-- Frequently Asked Questions -->
          <section style="margin-bottom: 40px;">
            <h2 style="font-size: 1.4rem; color: var(--text-main); font-weight: 800; margin-bottom: 16px;">
              Frequently Asked Questions for ${escapeHtml(loc.name)} Dealers
            </h2>
            <div>
              ${faqHtml}
            </div>
          </section>

          <!-- Other Supply Locations -->
          <section style="border-top: 1px solid var(--border-color); padding-top: 24px; margin-bottom: 30px;">
            <h2 style="font-size: 1.15rem; color: var(--text-main); font-weight: 700; margin-bottom: 12px;">
              Explore Other Supply Hubs in Our Active Territory:
            </h2>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${otherLocationsHtml}
            </div>
          </section>

        </article>

        <!-- Right Column: Dealer Application Form Card -->
        <aside id="inquiryForm" style="position: sticky; top: 90px; background: #FFFFFF; padding: 32px 28px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-card);">
          <div style="margin-bottom: 20px;">
            <span class="section-tag" style="margin-bottom: 6px;">Wholesale Dealership</span>
            <h2 style="font-size: 1.4rem; color: var(--text-main); font-weight: 800; margin-bottom: 6px;">
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
              Send Dealership Inquiry &rarr;
            </button>
          </form>

          <div style="margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--border-color); text-align: center;">
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">Need immediate trade rates?</p>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm btn-block" style="width: 100%; text-align: center;">
              <span aria-hidden="true">💬</span> Chat Directly on WhatsApp
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
