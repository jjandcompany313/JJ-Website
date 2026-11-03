const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const minimalStyles = `
/* ==========================================================================
   MINIMAL SEAMLESS THEME (NO BOXES, NO RECTANGULAR BLOCKS, PURE WOOSTER CRAFT)
   ========================================================================== */

/* Universal single seamless background */
:root {
  --bg-main: #0B0612;
  --bg-section: #0B0612;
  --bg-subtle: #0B0612;
  --bg-card: transparent;
  --bg-card-hover: transparent;
  --bg-dark: #06030A;
  --border-color: rgba(147, 112, 219, 0.15);
  --border-subtle: rgba(147, 112, 219, 0.08);
  --text-main: #FFFFFF;
  --text-body: #D4C7E8;
  --text-muted: #9584AD;
}

body {
  background-color: #0B0612;
  color: #D4C7E8;
}

.section-subtle,
.section-light {
  background-color: transparent !important;
}

/* 1. Seamless Hero Section */
.minimal-hero-section {
  padding: 88px 0 96px 0;
  position: relative;
  background-color: transparent;
}

.minimal-hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
}

@media (max-width: 991px) {
  .minimal-hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.minimal-hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4.25rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}

.minimal-hero-subline {
  font-size: 1.15rem;
  color: var(--text-body);
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 36px;
}

.minimal-hero-subline strong {
  color: #FFFFFF;
}

.minimal-hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.minimal-view-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #FFFFFF;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 10px 0;
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.minimal-view-link:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.minimal-view-link svg {
  transition: transform var(--transition-fast);
}

.minimal-view-link:hover svg {
  transform: translateY(3px);
}

.minimal-product-hero-img {
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7));
  display: block;
}

/* 2. Seamless Section Components */
.minimal-section {
  padding: 88px 0;
  position: relative;
  background-color: transparent;
}

.minimal-section-header {
  max-width: 700px;
  margin-bottom: 56px;
}

.minimal-section-title {
  font-family: var(--font-heading);
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.15;
  letter-spacing: -0.025em;
  margin-bottom: 12px;
}

.minimal-section-subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
}

/* 3. Open Product Showcase (No Box Cards) */
.minimal-products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

@media (max-width: 900px) {
  .minimal-products-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

.minimal-product-item {
  display: flex;
  flex-direction: column;
}

.minimal-img-anchor {
  display: block;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #12071E;
  border-radius: var(--radius-sm);
}

.minimal-img-anchor img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.minimal-img-anchor:hover img {
  transform: scale(1.03);
}

.minimal-product-name {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}

.minimal-product-name a {
  color: #FFFFFF;
  transition: color var(--transition-fast);
}

.minimal-product-name a:hover {
  color: var(--accent);
}

.minimal-product-text {
  font-size: 0.95rem;
  color: var(--text-body);
  line-height: 1.65;
  margin-bottom: 16px;
  flex-grow: 1;
}

.minimal-text-link {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--accent);
  letter-spacing: 0.02em;
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.minimal-text-link:hover {
  color: #FFFFFF;
  transform: translateX(3px);
}

/* 4. Minimal Applicator Guide Layout */
.minimal-tool-layout {
  max-width: 900px;
}

.minimal-step-heading {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.minimal-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.minimal-pill-row .tool-choice-btn {
  background: #140822;
  border: 1px solid var(--border-color);
  color: var(--text-body);
  padding: 10px 18px;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.minimal-pill-row .tool-choice-btn:hover {
  border-color: var(--brand-purple);
  color: #FFFFFF;
}

.minimal-pill-row .tool-choice-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #FFFFFF;
}

.minimal-result-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 24px 0 0 0;
  border-top: 1px dashed var(--border-color);
}

.minimal-rec-badge {
  display: inline-block;
  color: var(--brand-purple);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}

.minimal-rec-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 6px;
}

.minimal-rec-desc {
  font-size: 0.95rem;
  color: var(--text-body);
  max-width: 600px;
  margin: 0;
}

/* 5. Minimal Reviews Layout */
.minimal-reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

@media (max-width: 860px) {
  .minimal-reviews-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.minimal-review-item {
  display: flex;
  flex-direction: column;
}

.minimal-quote {
  font-size: 1rem;
  color: var(--text-body);
  line-height: 1.7;
  margin: 0 0 16px 0;
  font-style: normal;
}

.minimal-author {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: normal;
  font-weight: 600;
}

/* 6. Minimal Dealership Section */
.minimal-dealer-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .minimal-dealer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.minimal-trust-points {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.minimal-point strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.05rem;
  color: #FFFFFF;
  margin-bottom: 4px;
}

.minimal-point p {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}
`;

if (!css.includes('/* ==========================================================================\n   MINIMAL SEAMLESS THEME')) {
  css += `\n${minimalStyles}\n`;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully added minimal seamless CSS!');
