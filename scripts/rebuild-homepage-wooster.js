const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const currentHtml = fs.readFileSync(indexPath, 'utf8');

// Extract everything from <head> to </head> exactly as it is, to preserve all SEO, JSON-LD, GTAG, Verification
const headMatch = currentHtml.match(/<head>([\s\S]*?)<\/head>/i);
if (!headMatch) {
  console.error("Could not find <head> tag");
  process.exit(1);
}
let headContent = headMatch[1];
// Strip any previous inline style blocks
headContent = headContent.replace(/<style>[\s\S]*?<\/style>/gi, '').trim();

// Clean SVGs for replacing all emojis sitewide
const SVG_PDF = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`;
const SVG_WA = `<svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 01-5.82 2.41h-.01c-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.95-.19-.3a8.196 8.196 0 01-1.26-4.55c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/></svg>`;
const SVG_MENU = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
const SVG_CLOSE = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
const SVG_CHEVRON = `<svg class="svg-icon-stroke faq-chevron-svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
const SVG_PLAY = `<svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
const SVG_PHONE = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
const SVG_MAIL = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
const SVG_PIN = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
const SVG_STAR = `<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="#F59E0B" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
const FIVE_STARS = `${SVG_STAR}${SVG_STAR}${SVG_STAR}${SVG_STAR}${SVG_STAR}`;
const SVG_SHIELD = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
const SVG_TRUCK = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`;
const SVG_BOX = `<svg class="svg-icon-stroke" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>`;

const newBody = `
<body>

  <!-- Main Header: Clean, Minimal, Wooster-Inspired -->
  <header class="site-header">
    <div class="container header-container">
      <a href="/" class="brand-logo" title="JJ &amp; Company Home">
        <picture>
          <source srcset="/assets/images/jj-company-logo-nav.webp" type="image/webp">
          <img src="/assets/images/jj-company-logo-nav.png" alt="JJ &amp; Company Logo" class="logo-img" width="44" height="44">
        </picture>
        <div class="brand-text">
          <span class="brand-name">JJ &amp; COMPANY</span>
          <span class="brand-tagline">Paint Applicators · Est. 2016</span>
        </div>
      </a>

      <nav class="nav-menu" aria-label="Main Navigation">
        <a href="/" class="nav-link active">Home</a>
        <a href="/products/rollers.html" class="nav-link">Rollers</a>
        <a href="/products/brushes.html" class="nav-link">Brushes</a>
        <a href="/products/accessories.html" class="nav-link">Accessories</a>
        <a href="/#applicator-selector" class="nav-link">Applicator Guide</a>
        <a href="/dealer.html" class="nav-link">Dealership</a>
        <a href="/contact.html" class="nav-link">Contact</a>
      </nav>

      <div class="header-cta-group">
        <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-secondary btn-sm" aria-label="Download Master Catalogue">
          ${SVG_PDF} <span>Catalogue (PDF)</span>
        </a>
        <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20I%20am%20interested%20in%20your%20paint%20accessories%20manufacturing%20and%20dealer%20pricing."
          target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp btn-sm" aria-label="WhatsApp Direct Support">
          ${SVG_WA} <span>WhatsApp Desk</span>
        </a>
        <button id="mobileToggle" class="mobile-toggle" aria-label="Open Navigation Menu">
          ${SVG_MENU}
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div id="mobileBackdrop" class="mobile-backdrop"></div>
  <aside id="mobileDrawer" class="mobile-nav-drawer" aria-label="Mobile Navigation">
    <div>
      <div class="mobile-drawer-header">
        <div class="brand-logo">
          <picture>
            <source srcset="/assets/images/jj-company-logo-nav.webp" type="image/webp">
            <img src="/assets/images/jj-company-logo-nav.png" alt="JJ &amp; Company Logo" class="logo-img" width="40" height="40">
          </picture>
          <span class="brand-name">JJ &amp; COMPANY</span>
        </div>
        <button id="mobileClose" class="mobile-toggle" aria-label="Close Menu">
          ${SVG_CLOSE}
        </button>
      </div>
      <nav class="mobile-nav-links">
        <a href="/" class="nav-link active">Home</a>
        <a href="/products/rollers.html" class="nav-link">Rollers (Wallfin™)</a>
        <a href="/products/brushes.html" class="nav-link">Brushes (Panama)</a>
        <a href="/products/accessories.html" class="nav-link">Accessories &amp; Tools</a>
        <a href="/#applicator-selector" class="nav-link">Applicator Selector</a>
        <a href="/dealer.html" class="nav-link">Dealership</a>
        <a href="/about.html" class="nav-link">About Company</a>
        <a href="/contact.html" class="nav-link">Contact &amp; Depo</a>
      </nav>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-primary btn-block">
        ${SVG_PDF} <span>Master Catalogue (PDF)</span>
      </a>
      <a href="https://wa.me/919422775429" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp btn-block">
        ${SVG_WA} <span>Chat on WhatsApp</span>
      </a>
    </div>
  </aside>

  <!-- Main Landmark -->
  <main id="main-content">

    <!-- Hero Section: Wooster-Style Graphic Banner (Dark Canvas, Product-First) -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="wooster-headline-block">
              <h1 class="wooster-banner-pill">BETTER FINISH,</h1>
              <div class="wooster-banner-pill banner-purple">LESS EFFORT</div>
            </div>

            <p class="hero-wooster-subline">
              <strong>Wallfin™</strong> (Registered TM: 8027912) offers professional heavy-cage paint rollers manufactured directly by <strong>J. J. &amp; Company</strong> at our Jalgaon Depo, giving trade painters smoother coverage with less effort, every coat, every time.
            </p>

            <div class="hero-metrics">
              <div class="metric-item">
                <div class="metric-value">2016</div>
                <div class="metric-label">Established in Jalgaon</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">350K+</div>
                <div class="metric-label">Units Monthly Capacity</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">Zero MOQ</div>
                <div class="metric-label">Direct Depo Supply</div>
              </div>
            </div>

            <div class="hero-ctas" style="align-items: center; margin-top: 8px;">
              <a href="#product-categories" class="hero-action-view">
                <span>VIEW PRODUCTS</span>
                <svg class="svg-icon-stroke" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </a>
              <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-primary btn-sm">
                ${SVG_PDF} <span>Master Catalogue</span>
              </a>
              <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20please%20share%20wholesale%20dealer%20rates."
                target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp-subtle btn-sm">
                ${SVG_WA} <span>Direct Depo Rates</span>
              </a>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-product-stage">
              <div class="hero-stage-img-wrap">
                <picture>
                  <source srcset="/assets/images/rollers-collection.webp" type="image/webp">
                  <img src="/assets/images/rollers-collection.jpg" alt="Wallfin Precision Paint Rollers Manufactured by JJ and Company"
                    width="800" height="450" loading="eager" fetchpriority="high">
                </picture>
              </div>
              <div class="hero-stage-specs">
                <div class="hero-spec-pill">
                  <span class="pill-dot" aria-hidden="true"></span>
                  <div>
                    <strong>Wallfin™ Heavy Cage</strong>
                    <span>20mm &amp; 38mm Core · Solvent-Bonded</span>
                  </div>
                </div>
                <div class="hero-spec-pill">
                  <span class="pill-dot" aria-hidden="true"></span>
                  <div>
                    <strong>Panama™ Paint Brushes</strong>
                    <span>Shed-Free Epoxy Potting · Stainless Ferrule</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Category Showcase (Wooster 3-Column Visual Grid) -->
    <section class="section section-subtle" id="product-categories">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Product Categories</h2>
          <p class="section-subtitle">
            Direct depo supply engineered for smooth coverage, durability, and trade counter margins.
          </p>
        </div>

        <div class="category-grid">
          <!-- 1. Paint Rollers -->
          <article class="category-card">
            <div class="category-image-wrap">
              <picture>
                <source srcset="/assets/images/rollers-collection.webp" type="image/webp">
                <img src="/assets/images/rollers-collection.jpg" alt="Wallfin Paint Rollers and Refills" loading="lazy" width="800" height="450">
              </picture>
              <span class="category-badge">Wallfin™ (TM: 8027912)</span>
            </div>
            <div class="category-content">
              <h3 class="category-title">1. Paint Rollers &amp; Refills</h3>
              <p class="category-desc">
                Manufactured on-site in Jalgaon. Standard 20mm and 38mm heavy-gauge polypropylene cores, high-density microfiber, epoxy rollers, and foam fix in sizes 2" to 9".
              </p>
              <div class="category-specs-list">
                <span class="spec-pill">Standard 20mm &amp; 38mm Cores</span>
                <span class="spec-pill">Sizes 2" to 9"</span>
                <span class="spec-pill">Solvent Proof</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a href="/products/rollers.html" class="btn btn-outline btn-block">Explore Rollers</a>
              </div>
            </div>
          </article>

          <!-- 2. Brushes (Panama Collection) -->
          <article class="category-card">
            <div class="category-image-wrap">
              <picture>
                <source srcset="/assets/images/brushes-collection.webp" type="image/webp">
                <img src="/assets/images/brushes-collection.jpg" alt="Panama Paint Brushes Collection" loading="lazy" width="800" height="450">
              </picture>
              <span class="category-badge">Panama™ Import</span>
            </div>
            <div class="category-content">
              <h3 class="category-title">2. Professional Paint Brushes</h3>
              <p class="category-desc">
                Directly imported with 100% shed-free epoxy potting, stainless steel ferrules, and durable balanced handles from 1" to 5" trade sizes.
              </p>
              <div class="category-specs-list">
                <span class="spec-pill">Sizes 1" to 5"</span>
                <span class="spec-pill">Epoxy Potting</span>
                <span class="spec-pill">Stainless Ferrule</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a href="/products/brushes.html" class="btn btn-outline btn-block">Explore Brushes</a>
              </div>
            </div>
          </article>

          <!-- 3. Accessories -->
          <article class="category-card">
            <div class="category-image-wrap">
              <picture>
                <source srcset="/assets/images/accessories-range.webp" type="image/webp">
                <img src="/assets/images/accessories-range.jpg" alt="Thinners, Polish and Abrasives Range" loading="lazy" width="800" height="450">
              </picture>
              <span class="category-badge">Trade Consumables</span>
            </div>
            <div class="category-content">
              <h3 class="category-title">3. Thinners, Polish &amp; Tools</h3>
              <p class="category-desc">
                Maruti Auto Gloss thinners (250ml to 20L), Nico wood polish, Cumi waterproof abrasive sheets, 230mm disc paper, and steel and wooden pata.
              </p>
              <div class="category-specs-list">
                <span class="spec-pill">Maruti Thinners</span>
                <span class="spec-pill">Cumi Abrasives</span>
                <span class="spec-pill">Steel &amp; Wood Pata</span>
              </div>
              <div style="margin-top: auto; padding-top: 16px;">
                <a href="/products/accessories.html" class="btn btn-outline btn-block">Explore Accessories</a>
              </div>
            </div>
          </article>
        </div>

        <!-- Wooster-Inspired "Find Your Applicator" Interactive Selector Tool -->
        <section class="applicator-tool-card" id="applicator-selector" style="margin-top: 48px;">
          <div class="applicator-tool-header">
            <h2 style="font-size: var(--font-xl); color: var(--text-main); font-weight: 800; margin-bottom: 8px;">Interactive Paint Tool &amp; Applicator Guide</h2>
            <p style="font-size: var(--font-sm); color: var(--text-muted); margin: 0;">Select your surface and paint coating to instantly find the recommended Wallfin™ roller or Panama™ brush.</p>
          </div>

          <div class="applicator-steps-grid">
            <!-- Step 1: Surface -->
            <div class="applicator-step-box">
              <div class="step-label">Step 1: Surface Texture</div>
              <div class="tool-btn-group" id="surfaceButtonGroup">
                <button type="button" class="tool-choice-btn active" data-surface="smooth">Smooth Putty &amp; Plaster</button>
                <button type="button" class="tool-choice-btn" data-surface="semi-rough">Interior Walls &amp; Ceilings</button>
                <button type="button" class="tool-choice-btn" data-surface="rough">Rough Exterior &amp; Brick</button>
                <button type="button" class="tool-choice-btn" data-surface="epoxy">Floors &amp; Epoxy Screed</button>
                <button type="button" class="tool-choice-btn" data-surface="wood">Doors, Trim &amp; Woodwork</button>
              </div>
            </div>

            <!-- Step 2: Coating -->
            <div class="applicator-step-box">
              <div class="step-label">Step 2: Coating Type</div>
              <div class="tool-btn-group" id="coatingButtonGroup">
                <button type="button" class="tool-choice-btn active" data-coating="emulsion">Interior Emulsion / Acrylic</button>
                <button type="button" class="tool-choice-btn" data-coating="exterior">Exterior Weather Coat</button>
                <button type="button" class="tool-choice-btn" data-coating="enamel">Oil Primer &amp; Enamel</button>
                <button type="button" class="tool-choice-btn" data-coating="epoxy">Epoxy &amp; PU Resin</button>
                <button type="button" class="tool-choice-btn" data-coating="polish">Wood Polish &amp; Stains</button>
              </div>
            </div>
          </div>

          <!-- Result Box -->
          <div class="applicator-result-box" id="applicatorResult">
            <div>
              <span class="result-badge" id="recBadge">Best for Smooth Interior Walls</span>
              <div class="result-name" id="recTitle">Wallfin™ Blue Line Paint Roller (9" / 20mm Core)</div>
              <p class="result-desc" id="recDesc">High-density woven poly fabric engineered for ultra-smooth lint-free emulsion finish on plaster, putty, and gypsum.</p>
            </div>
            <div style="display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap;">
              <a href="/products/wallfin-blue-line-paint-roller.html" id="recLink" class="btn btn-outline btn-sm">View Full Specs</a>
              <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20please%20share%20wholesale%20dealer%20rates%20for%20Wallfin%20Blue%20Line." id="recWa" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm">
                ${SVG_WA} <span>Order Dealer Carton</span>
              </a>
            </div>
          </div>
        </section>

        <!-- Clean Master Catalog Download Banner -->
        <div class="master-catalog-banner">
          <div>
            <h3 class="banner-title">Official 2026 Master Product Catalogue</h3>
            <p class="banner-sub">Complete specifications for Paint Rollers, Panama Brushes, Thinners, Wood Polish, and Cumi Abrasives in one PDF.</p>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-primary btn-lg">
              ${SVG_PDF} <span>Download Master Catalogue</span>
            </a>
            <button type="button" class="btn btn-outline-white btn-lg btn-video-trigger" onclick="openCompanyVideoModal()">
              ${SVG_PLAY} <span>Watch Video Tour</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Depo Facility & Standing Inventory Reality -->
    <section class="section" id="warehouse-facility">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Direct Plant Output &amp; Standing Inventory</h2>
          <p class="section-subtitle">
            Ready stock across primary roller and brush lines. Daily transport dispatches from Jalgaon across Maharashtra, MP, and pan-India.
          </p>
        </div>

        <div class="facility-video-bar">
          <div class="facility-video-info">
            <div class="icon-pill">
              ${SVG_PLAY}
            </div>
            <div>
              <strong class="facility-video-title">Virtual Facility Walkthrough</strong>
              <span class="facility-video-desc">Watch roller assembly, Panama brush sorting, and dispatch operations in Jalgaon</span>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-video-trigger" aria-haspopup="dialog" onclick="openCompanyVideoModal()">
            ${SVG_PLAY} <span>Watch Video Tour</span>
          </button>
        </div>

        <div class="warehouse-grid">
          <!-- Photo 1: Roller Assembly -->
          <div class="warehouse-card">
            <div class="warehouse-img-wrap">
              <picture>
                <source srcset="/assets/images/warehouse-roller-assembly.webp" type="image/webp">
                <img src="/assets/images/warehouse-roller-assembly.jpg" alt="Roller Assembly Floor at Jalgaon Plant" loading="lazy" width="600" height="400">
              </picture>
              <span class="warehouse-badge">Assembly Floor</span>
            </div>
            <div class="warehouse-caption">
              <h3>Roller Assembly Floor</h3>
              <p>Cage frame assembly and high-density microfiber sleeve packaging lines.</p>
            </div>
          </div>

          <!-- Photo 2: Brush Inventory -->
          <div class="warehouse-card">
            <div class="warehouse-img-wrap">
              <picture>
                <source srcset="/assets/images/warehouse-brush-inventory.webp" type="image/webp">
                <img src="/assets/images/warehouse-brush-inventory.jpg" alt="Panama Brush Master Cartons" loading="lazy" width="600" height="400">
              </picture>
              <span class="warehouse-badge">Brush Inventory</span>
            </div>
            <div class="warehouse-caption">
              <h3>Brush Master Cartons</h3>
              <p>Ready master cartons of Panama paint brushes stored for immediate wholesale dispatch.</p>
            </div>
          </div>

          <!-- Photo 3: Central Aisles -->
          <div class="warehouse-card">
            <div class="warehouse-img-wrap">
              <picture>
                <source srcset="/assets/images/warehouse-aisle-stock.webp" type="image/webp">
                <img src="/assets/images/warehouse-aisle-stock.jpg" alt="High-Density Storage Aisles" loading="lazy" width="600" height="400">
              </picture>
              <span class="warehouse-badge">Storage Aisles</span>
            </div>
            <div class="warehouse-caption">
              <h3>Central Storage Aisles</h3>
              <p>High-density racking holding roller refills, sandpaper, scrapers, and consumables.</p>
            </div>
          </div>

          <!-- Photo 4: Dispatch Bay -->
          <div class="warehouse-card">
            <div class="warehouse-img-wrap">
              <picture>
                <source srcset="/assets/images/warehouse-dispatch-dock.webp" type="image/webp">
                <img src="/assets/images/warehouse-dispatch-dock.jpg" alt="Dispatch and Logistics Bay" loading="lazy" width="600" height="400">
              </picture>
              <span class="warehouse-badge">Dispatch Bay</span>
            </div>
            <div class="warehouse-caption">
              <h3>Dispatch &amp; Loading Bay</h3>
              <p>Consignments staged for daily scheduled route transport and pan-India freight.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Verified Trade Reviews: Clean & Minimal -->
    <section class="section section-subtle" id="reviews">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Verified Dealer &amp; Painter Reviews</h2>
          <p class="section-subtitle">
            Trusted by hardware retailers, paint stockists, and professional contractors across Maharashtra and Madhya Pradesh.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div class="review-box">
            <div style="margin-bottom: 8px;">${FIVE_STARS}</div>
            <p style="font-size: var(--font-sm); color: var(--text-body); line-height: 1.6; margin-bottom: 12px;">
              "Wallfin rollers have excellent microfiber quality with zero fabric shedding on emulsion and exterior paints. Direct depo supply gives us unbeatable wholesale rates in Jalgaon."
            </p>
            <div style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600;">
              Hardware Retail Stockist, Jalgaon
            </div>
          </div>

          <div class="review-box">
            <div style="margin-bottom: 8px;">${FIVE_STARS}</div>
            <p style="font-size: var(--font-sm); color: var(--text-body); line-height: 1.6; margin-bottom: 12px;">
              "Panama brushes imported by JJ &amp; Company feature genuine epoxy bristle potting. No loose hairs during enamel painting. Timely parcel delivery to Dhule every time."
            </p>
            <div style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600;">
              Paint Counter Dealer, Dhule
            </div>
          </div>

          <div class="review-box">
            <div style="margin-bottom: 8px;">${FIVE_STARS}</div>
            <p style="font-size: var(--font-sm); color: var(--text-body); line-height: 1.6; margin-bottom: 12px;">
              "Direct manufacturer cooperation with zero middleman hassle. Heavy 38mm cage rollers and refills arrive securely strapped in master cartons with GST invoice."
            </p>
            <div style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 600;">
              Commercial Painting Contractor, MP Corridor
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 32px;">
          <a href="https://g.page/r/CQrB9YNt2nTFEBM/review" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-outline">
            ${SVG_STAR} <span>Verified Google Business Reviews</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Direct Answers for AI Search & AEO -->
    <section class="section" id="faq">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Common Questions About JJ &amp; Company Supply</h2>
          <p class="section-subtitle">
            Direct, verifiable answers regarding manufacturing, wholesale supply, and transport logistics.
          </p>
        </div>

        <div class="faq-accordion-list">
          <details class="faq-accordion-item" open>
            <summary class="faq-accordion-summary">
              <h3 class="faq-question">Who is the direct manufacturer of paint rollers in Jalgaon, Maharashtra?</h3>
              ${SVG_CHEVRON}
            </summary>
            <div class="faq-answer">
              <p>
                <strong>J. J. &amp; Company</strong> (established in 2016) is a direct manufacturer of <strong>Wallfin™ paint rollers</strong> (Trademark Application ID: 8027912) and wholesale supplier of authentic <strong>Panama paint brushes</strong>, operating from Plot No-8, Dixit Wadi, Jalgaon, Maharashtra 425001. We supply hardware retail shops, paint stockists, and painting contractors directly with wholesale rates.
              </p>
            </div>
          </details>

          <details class="faq-accordion-item">
            <summary class="faq-accordion-summary">
              <h3 class="faq-question">Where can hardware dealers buy wholesale paint accessories in Maharashtra &amp; MP?</h3>
              ${SVG_CHEVRON}
            </summary>
            <div class="faq-answer">
              <p>
                Hardware counters across Jalgaon, Dhule, Nandurbar, Buldhana, and Madhya Pradesh (Burhanpur, Khandwa) can buy wholesale paint rollers, roller refills, and Panama brushes directly from JJ &amp; Company's Jalgaon Depo with same-day to 48-hour transport dispatch and full GST invoicing.
              </p>
            </div>
          </details>

          <details class="faq-accordion-item">
            <summary class="faq-accordion-summary">
              <h3 class="faq-question">What paint accessories and roller types are manufactured at the Jalgaon Depo?</h3>
              ${SVG_CHEVRON}
            </summary>
            <div class="faq-answer">
              <p>
                JJ &amp; Company manufactures Wallfin™ 20mm standard and 38mm heavy cage paint rollers (Blue Line, Yellow Line, Green Line, Brown Line, Epoxy, Tiger, Foam Fix, and Texture Rollers), paint roller refills, handles, and frames, alongside authentic imported Panama brushes, Maruti thinners, Nico wood polish, and Cumi abrasives.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- Trade Partnership & Direct Depo Dispatch -->
    <section class="section section-subtle" id="dealership">
      <div class="container">
        <div class="dealer-lead-grid">
          <div class="dealer-pitch">
            <h2 class="dealer-pitch-title">Partner Directly with the Manufacturer</h2>
            <p class="dealer-pitch-sub">
              Receive genuine depo pricing, guaranteed replacement on manufacturing defects, and dependable scheduled logistics.
            </p>

            <div class="perk-cards-col">
              <div class="perk-card">
                <div class="icon-pill">${SVG_SHIELD}</div>
                <div class="perk-text">
                  <h3>Direct Depo Pricing</h3>
                  <p>Protected distributor-tier pricing for maximum retail and wholesale counter margins.</p>
                </div>
              </div>

              <div class="perk-card">
                <div class="icon-pill">${SVG_BOX}</div>
                <div class="perk-text">
                  <h3>Ready Standing Inventory</h3>
                  <p>Ready stock on primary lines. Direct dealer carton dispatches from Jalgaon.</p>
                </div>
              </div>

              <div class="perk-card">
                <div class="icon-pill">${SVG_TRUCK}</div>
                <div class="perk-text">
                  <h3>Scheduled Transport Logistics</h3>
                  <p>Direct scheduled daily transport serving Jalgaon, Dhule, Nandurbar, Buldhana, MP, and pan-India freight.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Dealership Partnership -->
          <div class="dealer-form-card" style="height: fit-content;">
            <div class="form-header">
              <h3>Become a Dealer or Stockist</h3>
              <p>Connect with JJ &amp; Company for commercial rates, regional distributor supply, and steady dispatches.</p>
            </div>

            <div style="background-color: var(--bg-section); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 20px;">
              <h4 style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 6px; font-weight: 700;">Submit Dealer Application</h4>
              <p style="font-size: 0.88rem; color: var(--text-body); margin-bottom: 16px; line-height: 1.5;">
                Fill our business enquiry form to receive wholesale price tiers, sample kits, and direct transport quotes.
              </p>
              <a href="/dealer.html#dealerForm" class="btn btn-primary btn-block btn-lg" style="text-align: center;">
                Apply for Dealership Online
              </a>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20I%20am%20inquiring%20about%20dealership%20and%20wholesale%20rates." target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp btn-block">
                ${SVG_WA} <span>Direct WhatsApp Inquiry</span>
              </a>
              <a href="/assets/docs/JJ_Company_Master_Catalogue_2026.pdf" download class="btn btn-outline btn-block">
                ${SVG_PDF} <span>Download Master Catalogue (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Clean Minimal Footer: Zero Emojis, Structured, Industrial -->
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
            Direct manufacturer of Wallfin™ paint rollers (TM Application ID: 8027912), direct importer of authentic Panama paint brushes, and distributor of finishing accessories in Jalgaon, Maharashtra.
          </p>
          <div class="gst-badge">
            <span>GSTIN:</span> <strong>27ACXPN6682N1ZC</strong>
          </div>
          <div class="gst-badge" style="margin-top: 6px;">
            <span>Registered Brand:</span> <strong>Wallfin (TM: 8027912)</strong>
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
            <li><a href="/products/rollers.html">Paint Rollers</a></li>
            <li><a href="/products/brushes.html">Paint Brushes</a></li>
            <li><a href="/products/accessories.html">Accessories</a></li>
            <li><a href="/dealer.html">Dealership</a></li>
            <li><a href="/about.html">About Us</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/privacy-policy.html">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-heading">Product Lines</h3>
          <ul class="footer-links">
            <li><a href="/products/rollers.html">Wallfin™ Paint Rollers</a></li>
            <li><a href="/products/brushes.html">Panama Paint Brushes</a></li>
            <li><a href="/products/accessories.html">Thinners, Polish &amp; Abrasives</a></li>
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
              <a href="https://g.page/r/CQrB9YNt2nTFEBM/review" target="_blank" rel="noopener noreferrer nofollow">Read &amp; Post Google Reviews</a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          &copy; <span id="currentYear">2026</span> JJ &amp; Company. Direct Depo Supply.
        </div>
        <div style="display: flex; gap: 20px;">
          <span>Active in MH &amp; MP</span>
          <a href="/privacy-policy.html">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Company Intro Video Modal -->
  <div id="companyVideoModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="companyVideoModalTitle" onclick="if(event.target === this) closeCompanyVideoModal();">
    <div class="modal-video-card" onclick="event.stopPropagation();">
      <div class="modal-video-header">
        <div class="modal-video-title" id="companyVideoModalTitle">
          <span style="display: inline-block; width: 8px; height: 8px; background: var(--whatsapp); border-radius: 50%;" aria-hidden="true"></span>
          JJ &amp; COMPANY: Introduction Video
        </div>
        <button type="button" class="modal-video-close" id="closeCompanyVideoModal" onclick="closeCompanyVideoModal()" aria-label="Close Video">
          ${SVG_CLOSE}
        </button>
      </div>
      <div class="modal-video-body">
        <video 
          id="modalVideoElement" 
          controls 
          playsinline 
          preload="none" 
          poster="/assets/images/jj-intro-poster.webp"
          width="360" 
          height="640">
          Your browser does not support HTML5 video playback.
        </video>
      </div>
      <div style="padding: 10px 4px 2px 4px; text-align: center;">
        <p style="color: var(--text-light); font-size: 0.78rem; margin: 0 0 10px 0;">
          Plot No-8, Dixit Wadi, Jalgaon · Direct Depo Dispatch
        </p>
        <a href="https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20I%20watched%20your%20company%20intro%20video%20and%20would%20like%20factory%20rates." 
           target="_blank" rel="noopener noreferrer nofollow" class="btn btn-whatsapp btn-sm btn-block">
          ${SVG_WA} <span>Get Direct Depo Rates on WhatsApp</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Floating WhatsApp with SVG -->
  <a id="floatingWhatsApp" href="https://wa.me/919422775429" target="_blank" rel="noopener noreferrer nofollow" class="floating-whatsapp"
    aria-label="Chat on WhatsApp">
    ${SVG_WA}
    <span class="floating-whatsapp-tooltip">Chat with Us</span>
  </a>

  <script defer src="/js/site-data.js?v=3.0"></script>
  <script defer src="/js/main.js?v=3.0"></script>
  <script>
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    function openCompanyVideoModal() {
      var modal = document.getElementById("companyVideoModal");
      var video = document.getElementById("modalVideoElement");
      if (!modal) return;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      if (video) {
        if (!video.src || video.src === "" || video.src.indexOf("jj-company-intro.mp4") === -1) {
          video.src = "/assets/videos/jj-company-intro.mp4";
          video.load();
        }
        try {
          video.currentTime = 0;
        } catch (e) {}
        var p = video.play();
        if (p !== undefined) {
          p.catch(function(err) {
            console.log("Play gesture required by browser:", err);
          });
        }
      }
    }

    function closeCompanyVideoModal() {
      var modal = document.getElementById("companyVideoModal");
      var video = document.getElementById("modalVideoElement");
      if (!modal) return;
      modal.classList.remove("open");
      document.body.style.overflow = "";
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    }

    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        closeCompanyVideoModal();
      }
    });

    // Wooster-Inspired Applicator Selector Tool Logic
    (function() {
      var recommendations = {
        'smooth': {
          'emulsion': {
            badge: 'Best for Smooth Interior Walls',
            name: 'Wallfin™ Blue Line Paint Roller (9" / 20mm Core)',
            desc: 'High-density woven poly fabric engineered for ultra-smooth lint-free emulsion finish on plaster, putty, and gypsum.',
            link: '/products/wallfin-blue-line-paint-roller.html',
            waText: 'Wallfin Blue Line Paint Roller'
          },
          'exterior': {
            badge: 'Best Exterior Universal',
            name: 'Wallfin™ Yellow Line Paint Roller',
            desc: 'Balanced paint absorption and controlled release for exterior primers and acrylic coatings.',
            link: '/products/wallfin-yellow-line-paint-roller.html',
            waText: 'Wallfin Yellow Line Paint Roller'
          },
          'enamel': {
            badge: 'Best for Gloss & Enamels',
            name: 'Wallfin™ Foam Fix Roller & Refills',
            desc: 'High-density fine-pore foam designed for streak-free gloss enamel finishes on smooth surfaces.',
            link: '/products/wallfin-foam-fix-roller.html',
            waText: 'Wallfin Foam Fix Roller'
          },
          'epoxy': {
            badge: 'Best for Industrial Floors',
            name: 'Wallfin™ Epoxy Paint Roller (Phenolic Core)',
            desc: '100% solvent-proof core resistant to aggressive resins, polyurethane, and epoxy paints.',
            link: '/products/wallfin-epoxy-paint-roller.html',
            waText: 'Wallfin Epoxy Paint Roller'
          },
          'polish': {
            badge: 'Best for Wood Stains & Polish',
            name: 'Panama™ Wood Finishing Brush (1.5" - 3")',
            desc: 'Precision soft bristle blend with epoxy setting to prevent bristle shedding during wood polish application.',
            link: '/products/panama-gold-series-paint-brush.html',
            waText: 'Panama Wood Finishing Brush'
          }
        },
        'semi-rough': {
          'emulsion': {
            badge: 'Best for General Interior Walls',
            name: 'Wallfin™ Green Line Paint Roller',
            desc: 'Medium pile high-capacity fabric designed for standard plastered interior walls and ceilings with high pickup.',
            link: '/products/wallfin-green-line-paint-roller.html',
            waText: 'Wallfin Green Line Paint Roller'
          },
          'exterior': {
            badge: 'High Pickup Exterior',
            name: 'Wallfin™ Tiger Paint Roller',
            desc: 'Heavy-duty blended fabric that works paint deeply into textured masonry and sand-faced walls.',
            link: '/products/wallfin-tiger-paint-roller.html',
            waText: 'Wallfin Tiger Paint Roller'
          },
          'enamel': {
            badge: 'Standard Enamel Coverage',
            name: 'Panama™ Classic Paint Brush (2.5")',
            desc: 'Solid bristle backbone with epoxy potting for applying oil-based enamels on metal and trim.',
            link: '/products/panama-classic-series-paint-brush.html',
            waText: 'Panama Classic Paint Brush'
          },
          'epoxy': {
            badge: 'Floor Coating Heavy Duty',
            name: 'Wallfin™ Epoxy Paint Roller (Phenolic Core)',
            desc: 'Engineered specifically for heavy screed and high-build PU floor coatings.',
            link: '/products/wallfin-epoxy-paint-roller.html',
            waText: 'Wallfin Epoxy Paint Roller'
          },
          'polish': {
            badge: 'Timber & Veneer Application',
            name: 'Panama™ Gold Series Paint Brush',
            desc: 'Chiseled trim for controlled flow on furniture, door frames, and veneer panels.',
            link: '/products/panama-gold-series-paint-brush.html',
            waText: 'Panama Gold Series Paint Brush'
          }
        },
        'rough': {
          'emulsion': {
            badge: 'Heavy Texture Emulsion',
            name: 'Wallfin™ Brown Line Paint Roller',
            desc: 'Deep pile fabric designed to penetrate rough cement plaster and exterior textures with minimal passes.',
            link: '/products/wallfin-brown-line-paint-roller.html',
            waText: 'Wallfin Brown Line Paint Roller'
          },
          'exterior': {
            badge: 'Heavy Exterior Masonry',
            name: 'Wallfin™ Tiger Paint Roller (38mm Core)',
            desc: 'Extra-long durable fibers for rough brickwork, unplastered concrete, and exterior facades.',
            link: '/products/wallfin-tiger-paint-roller.html',
            waText: 'Wallfin Tiger Paint Roller'
          },
          'enamel': {
            badge: 'Industrial Primer & Enamel',
            name: 'Panama™ Master Series Brush',
            desc: 'Stiff bristle formulation capable of pushing anti-corrosive primer into rough cast metal and gates.',
            link: '/products/panama-master-series-paint-brush.html',
            waText: 'Panama Master Series Brush'
          },
          'epoxy': {
            badge: 'Anti-Skid & Heavy Industrial',
            name: 'Wallfin™ Heavy Duty Epoxy Roller',
            desc: 'Solvent-bonded sleeve built to endure tough industrial aggregate floor primers.',
            link: '/products/wallfin-epoxy-paint-roller.html',
            waText: 'Wallfin Heavy Duty Epoxy Roller'
          },
          'polish': {
            badge: 'Rough Wood Preparation',
            name: 'Cumi Waterproof Abrasive Paper & Panama Brush',
            desc: 'Level rough surfaces with Cumi Silicon Carbide paper before applying Nico wood polish with a Panama brush.',
            link: '/products/accessories.html',
            waText: 'Cumi Abrasives and Panama Brush'
          }
        },
        'epoxy': {
          'emulsion': {
            badge: 'Not Recommended',
            name: 'Use Epoxy Coating for Floors',
            desc: 'Water-based emulsions are not recommended for high-traffic epoxy surfaces. Please select Epoxy or PU Coating.',
            link: '/products/wallfin-epoxy-paint-roller.html',
            waText: 'Floor coating advice'
          },
          'exterior': {
            badge: 'Exterior Concrete Floors',
            name: 'Wallfin™ Tiger Paint Roller',
            desc: 'Durable long-nap roller designed to distribute exterior masonry and paving paints evenly.',
            link: '/products/wallfin-tiger-paint-roller.html',
            waText: 'Wallfin Tiger Roller for floors'
          },
          'enamel': {
            badge: 'Floor Enamel Coating',
            name: 'Wallfin™ Blue Line 9" Paint Roller',
            desc: 'Controlled release preventing pooling or lap marks on non-slip primed surfaces.',
            link: '/products/wallfin-blue-line-paint-roller.html',
            waText: 'Wallfin Blue Line for floor enamel'
          },
          'epoxy': {
            badge: 'Solvent-Proof Floor Specialist',
            name: 'Wallfin™ Epoxy Paint Roller (Phenolic Core)',
            desc: 'Manufactured with high-purity solvent-resistant phenolic core and short lint-free woven fabric.',
            link: '/products/wallfin-epoxy-paint-roller.html',
            waText: 'Wallfin Epoxy Paint Roller'
          },
          'polish': {
            badge: 'Floor Sealer / Clear PU',
            name: 'Panama™ Master Brush (4" or 5")',
            desc: 'Wide coverage bristle head for laying down uniform coats of clear polyurethane or floor sealer.',
            link: '/products/panama-master-series-paint-brush.html',
            waText: 'Panama Master Brush for floor sealer'
          }
        },
        'wood': {
          'emulsion': {
            badge: 'Wood Primer / Undercoat',
            name: 'Panama™ Classic Series Paint Brush (2" or 3")',
            desc: 'Soft flagged bristle ends for applying water-based wood primer smoothly without lap marks.',
            link: '/products/panama-classic-series-paint-brush.html',
            waText: 'Panama Classic Brush for wood primer'
          },
          'exterior': {
            badge: 'Exterior Timber Coating',
            name: 'Panama™ Master Series Paint Brush (3")',
            desc: 'Weather-resistant epoxy potting for exterior wood stains, varnishes, and protective sealers.',
            link: '/products/panama-master-series-paint-brush.html',
            waText: 'Panama Master Brush for exterior wood'
          },
          'enamel': {
            badge: 'Doors & Trim Enamel',
            name: 'Wallfin™ Foam Fix Roller or Panama™ Brush',
            desc: 'High-density foam roller eliminates brush strokes on flat flush doors; Panama brush handles carved mouldings.',
            link: '/products/wallfin-foam-fix-roller.html',
            waText: 'Wallfin Foam Fix or Panama Brush for doors'
          },
          'epoxy': {
            badge: 'Epoxy Resin Coating for Wood',
            name: 'Wallfin™ Epoxy Roller & Panama Brush',
            desc: 'Solvent-proof core and shed-free epoxy bristle construction designed for bar-top resins and table epoxies.',
            link: '/products/wallfin-epoxy-paint-roller.html',
            waText: 'Wallfin Epoxy Roller and Panama Brush for wood resin'
          },
          'polish': {
            badge: 'Hand French Polish & Melamine',
            name: 'Nico Wood Polish & Panama™ Gold Brush',
            desc: 'Premium spirit-based wood polish combined with 100% shed-free soft Panama bristles for an heirloom piano finish.',
            link: '/products/accessories.html',
            waText: 'Nico Wood Polish with Panama Gold Brush'
          }
        }
      };

      var surfaceBtns = document.querySelectorAll('#surfaceButtonGroup .tool-choice-btn');
      var coatingBtns = document.querySelectorAll('#coatingButtonGroup .tool-choice-btn');
      var selectedSurface = 'smooth';
      var selectedCoating = 'emulsion';

      function updateRecommendation() {
        var rec = recommendations[selectedSurface] && recommendations[selectedSurface][selectedCoating];
        if (!rec) return;

        var badgeEl = document.getElementById('recBadge');
        var titleEl = document.getElementById('recTitle');
        var descEl = document.getElementById('recDesc');
        var linkEl = document.getElementById('recLink');
        var waEl = document.getElementById('recWa');

        if (badgeEl) badgeEl.textContent = rec.badge;
        if (titleEl) titleEl.textContent = rec.name;
        if (descEl) descEl.textContent = rec.desc;
        if (linkEl) linkEl.href = rec.link;
        if (waEl) {
          waEl.href = 'https://wa.me/919422775429?text=Hello%20JJ%20%26%20Company,%20please%20share%20wholesale%20dealer%20rates%20for%20' + encodeURIComponent(rec.waText) + '.';
        }
      }

      surfaceBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          surfaceBtns.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          selectedSurface = btn.getAttribute('data-surface');
          updateRecommendation();
        });
      });

      coatingBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          coatingBtns.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          selectedCoating = btn.getAttribute('data-coating');
          updateRecommendation();
        });
      });
    })();
  </script>
</body>
</html>
`;

headContent = headContent.replace(/<meta name="theme-color" content="[^"]*">/i, '<meta name="theme-color" content="#0D0714">');

const finalHtml = `<!DOCTYPE html>
<html lang="en-IN">
<head>
${headContent}
  <style>
    /* Hallmark · theme: minimal · genre: modern-minimal */
    :root {
      --accent: #FF1493;
      --bg-main: #0D0714;
      --text-body: #E2D9F3;
    }
    html, body {
      background-color: var(--bg-main);
      color: var(--text-body);
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
${newBody}
`;

fs.writeFileSync(indexPath, finalHtml, 'utf8');
console.log('Successfully rebuilt index.html to Wooster & Hallmark standards!');
