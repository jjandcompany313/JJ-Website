const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(getAllHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles('.');
console.log('Auditing', htmlFiles.length, 'HTML files...');

const stats = {
  h1Issues: [],
  missingTitles: [],
  duplicateTitles: {},
  missingMetaDesc: [],
  duplicateMetaDesc: {},
  missingCanonical: [],
  missingOgImage: [],
  missingGa: [],
  missingBreadcrumbs: [],
  missingOrgSchema: [],
  totalImages: 0,
  imagesMissingAlt: [],
  imagesWebp: 0,
  imagesNonWebp: 0,
  imagesWithLazy: 0,
  imagesWithoutLazy: 0,
  formCheck: {
    hasForm: 0,
    hasAction: 0
  }
};

htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');

  // H1 check
  const h1s = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1s.length !== 1) {
    stats.h1Issues.push({ file: f, count: h1s.length });
  }

  // Title check
  const tMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!tMatch) {
    stats.missingTitles.push(f);
  } else {
    const t = tMatch[1].trim();
    stats.duplicateTitles[t] = stats.duplicateTitles[t] || [];
    stats.duplicateTitles[t].push(f);
  }

  // Meta description
  const mMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!mMatch) {
    stats.missingMetaDesc.push(f);
  } else {
    const d = mMatch[1].trim();
    stats.duplicateMetaDesc[d] = stats.duplicateMetaDesc[d] || [];
    stats.duplicateMetaDesc[d].push(f);
  }

  // Canonical
  const cMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!cMatch) stats.missingCanonical.push(f);

  // OG Image
  const ogMatch = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (!ogMatch) stats.missingOgImage.push(f);

  // Google Analytics (GA4)
  if (!content.includes('googletagmanager.com/gtag/js?id=G-T22MWNL11C')) {
    stats.missingGa.push(f);
  }

  // Organization Schema
  if (content.includes('"Organization"') || content.includes('"WholesaleStore"')) {
    // found
  } else {
    stats.missingOrgSchema.push(f);
  }

  // Breadcrumbs
  if (f !== 'index.html' && !content.includes('BreadcrumbList')) {
    stats.missingBreadcrumbs.push(f);
  }

  // Contact form
  if (content.includes('<form')) {
    stats.formCheck.hasForm++;
    if (content.includes('action=') || content.includes('data-form') || content.includes('form-submit')) {
      stats.formCheck.hasAction++;
    }
  }

  // Images
  const imgMatches = content.match(/<img[^>]+>/gi) || [];
  imgMatches.forEach(img => {
    stats.totalImages++;
    const altMatch = img.match(/alt=["']([^"']*)["']/i);
    const isAriaHidden = /aria-hidden=["']true["']/i.test(img);
    if (!altMatch || (altMatch[1].trim() === '' && !isAriaHidden)) {
      stats.imagesMissingAlt.push({ file: f, img: img.slice(0, 80) });
    }
    const srcMatch = img.match(/src=["']([^"']+)["']/i);
    if (srcMatch) {
      if (srcMatch[1].toLowerCase().endsWith('.webp')) {
        stats.imagesWebp++;
      } else {
        stats.imagesNonWebp++;
      }
    }
    if (/loading=["']lazy["']/i.test(img)) {
      stats.imagesWithLazy++;
    } else {
      stats.imagesWithoutLazy++;
    }
  });
});

console.log('\n--- AUDIT RESULTS ---');
console.log('1. H1 Issues:', stats.h1Issues);
console.log('2. Missing Titles:', stats.missingTitles);
const dupeTitles = Object.entries(stats.duplicateTitles).filter(([_, list]) => list.length > 1);
console.log('3. Duplicate Titles:', dupeTitles.length);
console.log('4. Missing Meta Descriptions:', stats.missingMetaDesc);
const dupeDesc = Object.entries(stats.duplicateMetaDesc).filter(([_, list]) => list.length > 1);
console.log('5. Duplicate Meta Descriptions:', dupeDesc.length);
console.log('6. Missing Canonicals:', stats.missingCanonical);
console.log('7. Missing OG Images:', stats.missingOgImage);
console.log('8. Missing Google Analytics:', stats.missingGa);
console.log('9. Missing Breadcrumbs (on non-home):', stats.missingBreadcrumbs);
console.log('10. Images count:', stats.totalImages);
console.log('   - WebP:', stats.imagesWebp, 'Non-WebP:', stats.imagesNonWebp);
console.log('   - Lazy loading:', stats.imagesWithLazy, 'Without lazy:', stats.imagesWithoutLazy);
console.log('   - Missing/empty alt without aria-hidden:', stats.imagesMissingAlt.length);
if (stats.imagesMissingAlt.length > 0) {
  console.log('     Samples:', stats.imagesMissingAlt.slice(0, 3));
}
console.log('11. Forms check: pages with form =', stats.formCheck.hasForm);
console.log('12. robots.txt exists:', fs.existsSync('robots.txt'));
console.log('13. sitemap.xml exists:', fs.existsSync('sitemap.xml'));
console.log('14. 404.html exists:', fs.existsSync('404.html'));
console.log('15. .htaccess (301 redirects) exists:', fs.existsSync('.htaccess'));
