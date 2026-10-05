# 📋 JJ & Company — Website Content & Asset Replacement Checklist

This document is based on **Page 3 of the Website Template Specification**.
The site structure, design system, responsive templates, and JavaScript logic are **100% complete and fully working**.

When you are ready with your real business assets, photos, contact numbers, and catalog, use this checklist to swap them in effortlessly.

---

## 📸 1. Photos & Media To Supply
All images are neatly organized in the `assets/images/` folder. You can simply replace them with your real factory photos using the same names (or update the paths in HTML):

- [x] **Warehouse & Ready Stock Infrastructure:** (INTEGRATED) Authentic photos arranged across Home, About, Dealer, and Contact pages:
  - `assets/images/jj-company-building.jpg` (Cleaned authentic photo of JJ & Company commercial building & warehouse depot at Dixit Wadi, with bike and power cables removed)
  - `assets/images/warehouse-roller-assembly.jpg` (Roller assembly & packaging bins)
  - `assets/images/warehouse-brush-inventory.jpg` (Panama paint brushes master carton stacks)
  - `assets/images/warehouse-aisle-stock.jpg` (Central warehouse high-density racking aisles)
  - `assets/images/warehouse-dispatch-dock.jpg` (Dispatch staging dock & distributor cartons)
- [x] **Factory / Building Exterior:** (INTEGRATED) Real Dixit Wadi building photo cleaned and featured in Hero, About, and Contact pages.
- [ ] **Individual Product SKU Photos:** Replace product photos when you have isolated clean-background photos per SKU.

---

## 🔢 2. Numbers, Facts & Legal Information
You can update these in **`js/site-data.js`** (single place) or directly inside the HTML files:

- [x] **Factory Address:** Set to `Plot No-8, Dixit Wadi, Maharashtra, India`
- [x] **Official Phones:** Set to `+91 94227 75429` / `+91 94227 79339`
- [x] **WhatsApp:** Set to `+91 94227 75429` (raw `919422775429`)
- [ ] **Official GST Number:** (Currently set to `27AABCJ1234D1Z5`)
- [ ] **Monthly Production Capacity:** (350,000+ Units/Month)
- [ ] **Districts Currently Supplied:** (6 districts: Mumbai, Thane, Pune, Nashik, Kolhapur, Aurangabad)

---

## 📝 3. Contact & Business Details
Configured in **`js/site-data.js`**:

```javascript
const SITE_CONFIG = {
  companyName: "JJ & Company",
  phone: "+91 94227 75429",       // Primary office desk
  phoneSecondary: "+91 94227 79339",
  whatsappRaw: "919422775429",    // WhatsApp number for lead capture
  email: "sales@jjandcompany.com",
  gstNumber: "27AABCJ1234D1Z5",   // Registered GSTIN
  factoryAddress: "Plot No-8, Dixit Wadi",
  cityStatePincode: "Maharashtra, India",
  workingHours: "Monday to Saturday: 8:30 AM – 6:30 PM (Sunday Closed)"
};
```

---

## 📦 4. Product Catalog & Pricing
- [ ] **Catalog PDF:** Place your official PDF catalog in `assets/docs/JJ_Company_Product_Catalog_2026.pdf`. Clicking any "Download Catalog" button across the site downloads this file directly.
- [ ] **Product SKUs & Specifications:** Edit or add new products in `js/site-data.js` under `PRODUCTS_DATA`.

---

## 🤝 5. Testimonials & Client Logos
- [ ] Edit the 3 dealer review quotes on `index.html` (Lines 265–310) with names of actual hardware retailers or distributors from your region.

---

## 🎯 6. Strategic Decisions (From Page 3)
1. **Wholesale vs Retail Pricing:**
   - As implemented in accordance with manufacturing best practices, the site displays **"Dealer Rate on Request"** and prompts visitors to inquire via WhatsApp or the Dealership Form. This protects wholesale distributor margins.
2. **Primary CTA for Facebook Ads:**
   - Both the **Dealership Form** (`dealer.html`) and direct **WhatsApp Chat** are ready. When a lead submits the Dealership Form, it auto-formats and forwards the application directly to your WhatsApp!
