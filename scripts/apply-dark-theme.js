const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace Root Tokens with Dark Theme
const darkTokens = `/* --- Root Variables / Design Tokens (Dark Industrial Palette: Deep Obsidian Plum #0D0714, Medium Purple #9370DB, Deep Pink #FF1493, Magenta #FF00FF) --- */
:root {
  /* Company Brand Color Palette — Dedicated Palette */
  --primary: #180D2B;           /* Midnight Deep Plum */
  --primary-dark: #0B0414;      /* Deepest Obsidian Plum */
  --primary-light: #2D184C;     /* Medium Deep Plum */
  --primary-surface: #3D2066;   /* Elevated Plum Surface */

  --brand-purple: #9370DB;      /* Medium Purple #9370DB (Brand Sub-accents, Badges, Tabs) */
  --brand-purple-soft: rgba(147, 112, 219, 0.16);
  --brand-purple-glow: rgba(147, 112, 219, 0.35);

  --accent: #FF1493;            /* Vivid Deep Pink #FF1493 (Primary CTAs, High-Energy Highlights) */
  --accent-hover: #E01080;
  --accent-soft: rgba(255, 20, 147, 0.18);
  --accent-glow: rgba(255, 20, 147, 0.35);

  --accent-magenta: #FF00FF;    /* Electric Magenta #FF00FF */
  --accent-magenta-soft: rgba(255, 0, 255, 0.15);

  --whatsapp: #25D366;          /* Official WhatsApp Brand Green */
  --whatsapp-hover: #1EBE5D;
  --whatsapp-soft: rgba(37, 211, 102, 0.15);

  /* Sophisticated Dark Canvas (Wooster-Inspired High Contrast) */
  --bg-main: #0D0714;           /* Deep obsidian plum background */
  --bg-section: #140A20;        /* Secondary layered dark ground */
  --bg-subtle: #190D2A;         /* Tertiary subtle ground */
  --bg-card: #160B24;           /* Card surface */
  --bg-card-hover: #1F0F33;     /* Card hover */
  --bg-dark: #08030D;           /* Deepest contrast */

  /* Crisp Borders */
  --border-color: rgba(147, 112, 219, 0.22);
  --border-subtle: rgba(147, 112, 219, 0.12);
  --border-focus: #FF1493;

  /* Typography Colors */
  --text-main: #FFFFFF;         /* Crisp White */
  --text-body: #E2D9F3;         /* Soft readable lavender slate */
  --text-muted: #A594BE;        /* Muted captions */
  --text-light: #C4B5DC;
  --text-white: #FFFFFF;`;

css = css.replace(/\/\* --- Root Variables[\s\S]*?--text-white:\s*#FFFFFF;/, darkTokens);

// Update header styling for dark theme
css = css.replace(/\.site-header\s*\{[\s\S]*?\}/, `.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(13, 7, 20, 0.94);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-color);
  transition: transform var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast);
}`);

// Add Wooster Headline Banner Styles
const woosterHeroStyles = `
/* --- Wooster Hero Graphic Headline Banners --- */
.wooster-headline-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 24px;
}

.wooster-banner-pill {
  display: inline-block;
  background-color: var(--accent);
  color: #FFFFFF;
  font-family: var(--font-heading);
  font-size: clamp(1.85rem, 3.6vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.01em;
  line-height: 1.1;
  padding: 8px 18px;
  border-radius: var(--radius-xs);
  text-transform: uppercase;
  box-shadow: 0 4px 16px rgba(255, 20, 147, 0.3);
}

.wooster-banner-pill.banner-purple {
  background-color: var(--brand-purple);
  box-shadow: 0 4px 16px rgba(147, 112, 219, 0.3);
}

.hero-wooster-subline {
  font-size: 1.1rem;
  color: var(--text-body);
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 32px;
}

.hero-wooster-subline strong {
  color: #FFFFFF;
}

.hero-action-view {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #FFFFFF;
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 12px 0;
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.hero-action-view:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.hero-action-view svg {
  transition: transform var(--transition-fast);
}

.hero-action-view:hover svg {
  transform: translateY(3px);
}

.review-box {
  background: var(--bg-card);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.review-box:hover {
  transform: translateY(-2px);
  border-color: var(--brand-purple);
}

.banner-title {
  color: #FFFFFF;
  font-size: 1.4rem;
  margin-bottom: 8px;
  font-weight: 800;
}

.banner-sub {
  color: var(--text-body);
  font-size: 0.95rem;
  margin: 0;
}
`;

if (!css.includes('.wooster-headline-block')) {
  css += `\n${woosterHeroStyles}\n`;
}

// Update card backgrounds for dark theme
css = css.replace(/\.category-card\s*\{[\s\S]*?\}/, `.category-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--transition-normal), background-color var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
  display: flex;
  flex-direction: column;
  position: relative;
}`);

css = css.replace(/\.category-card:hover\s*\{[\s\S]*?\}/, `.category-card:hover {
  background-color: var(--bg-card-hover);
  border-color: var(--accent);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}`);

css = css.replace(/\.category-image-wrap\s*\{[\s\S]*?\}/, `.category-image-wrap {
  position: relative;
  height: 220px;
  overflow: hidden;
  background-color: #1A0D28;
}`);

// Update hero-section background
css = css.replace(/\.hero-section\s*\{[\s\S]*?\}/, `.hero-section {
  position: relative;
  background: radial-gradient(circle at 80% 20%, rgba(147, 112, 219, 0.12) 0%, transparent 60%), var(--bg-main);
  padding: 80px 0 100px 0;
  overflow: hidden;
}`);

css = css.replace(/\.hero-section::before\s*\{[\s\S]*?\}/, `.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(255, 20, 147, 0.08) 0%, transparent 70%);
  z-index: 0;
}`);

// Update hero product stage
css = css.replace(/\.hero-product-stage\s*\{[\s\S]*?\}/, `.hero-product-stage {
  position: relative;
  background: linear-gradient(145deg, #170C28 0%, #10061E 100%);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
}`);

css = css.replace(/\.hero-stage-img-wrap\s*\{[\s\S]*?\}/, `.hero-stage-img-wrap {
  width: 100%;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #140822;
  border-radius: var(--radius-lg);
  padding: 12px;
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}`);

css = css.replace(/\.hero-spec-pill\s*\{[\s\S]*?\}/, `.hero-spec-pill {
  background: #1B0F2E;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: var(--font-xs);
  color: var(--text-body);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.4;
  box-shadow: var(--shadow-sm);
}`);

// Update applicator tool styles for dark theme
css = css.replace(/\.applicator-tool-card\s*\{[\s\S]*?\}/, `.applicator-tool-card {
  background: linear-gradient(145deg, #160B26 0%, #10061E 100%);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 36px 32px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
}`);

css = css.replace(/\.applicator-step-box\s*\{[\s\S]*?\}/, `.applicator-step-box {
  background: #1A0D2D;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 20px;
}`);

css = css.replace(/\.tool-choice-btn\s*\{[\s\S]*?\}/, `.tool-choice-btn {
  background: #12071E;
  border: 1.5px solid var(--border-color);
  color: var(--text-body);
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: transform var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}`);

css = css.replace(/\.tool-choice-btn:hover\s*\{[\s\S]*?\}/, `.tool-choice-btn:hover {
  background: #23123B;
  border-color: var(--brand-purple);
  color: #FFFFFF;
}`);

css = css.replace(/\.tool-choice-btn\.active\s*\{[\s\S]*?\}/, `.tool-choice-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #FFFFFF;
  box-shadow: 0 4px 14px rgba(255, 20, 147, 0.35);
}`);

css = css.replace(/\.applicator-result-box\s*\{[\s\S]*?\}/, `.applicator-result-box {
  background: #1F1037;
  border: 1.5px solid var(--accent);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}`);

// Update master catalog banner
css = css.replace(/\.master-catalog-banner\s*\{[\s\S]*?\}/, `.master-catalog-banner {
  background: linear-gradient(135deg, #1C0F32 0%, #120722 100%);
  border: 1.5px solid rgba(255, 20, 147, 0.35);
  border-radius: var(--radius-lg);
  padding: 32px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  margin-top: 36px;
}`);

// Update warehouse cards
css = css.replace(/\.warehouse-card\s*\{[\s\S]*?\}/, `.warehouse-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), border-color var(--transition-normal);
}`);

css = css.replace(/\.warehouse-caption\s*\{[\s\S]*?\}/, `.warehouse-caption {
  padding: 16px 20px;
  background-color: var(--bg-card);
}`);

// Update FAQ accordion
css = css.replace(/\.faq-accordion-item\s*\{[\s\S]*?\}/, `.faq-accordion-item {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
  overflow: hidden;
  transition: border-color var(--transition-fast);
}`);

css = css.replace(/\.faq-accordion-item\[open\]\s*\{[\s\S]*?\}/, `.faq-accordion-item[open] {
  border-color: var(--brand-purple);
}`);

css = css.replace(/\.faq-answer\s*\{[\s\S]*?\}/, `.faq-answer {
  padding: 18px 24px 22px 24px;
  color: var(--text-body);
  font-size: var(--font-sm);
  line-height: 1.7;
  border-top: 1px solid var(--border-subtle);
  background-color: var(--bg-card);
}`);

// Update dealer form card & perks
css = css.replace(/\.dealer-form-card\s*\{[\s\S]*?\}/, `.dealer-form-card {
  background-color: var(--bg-card);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-card);
}`);

css = css.replace(/\.perk-card\s*\{[\s\S]*?\}/, `.perk-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}`);

// Update footer
css = css.replace(/\.site-footer\s*\{[\s\S]*?\}/, `.site-footer {
  background-color: #07030C;
  color: #FFFFFF;
  padding: 72px 0 28px 0;
  border-top: 1px solid var(--border-color);
}`);

// Form controls on dark ground
css = css.replace(/\.form-control\s*\{[\s\S]*?\}/, `.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  background-color: #12071E;
  color: #FFFFFF;
  font-size: var(--font-sm);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}`);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated css/style.css to Dark Theme!');
