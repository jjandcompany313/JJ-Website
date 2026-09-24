# 📋 JJ & Company — Website Content & Asset Replacement Checklist

This document is based on **Page 3 of the Website Template Specification**.
The site structure, design system, responsive templates, and JavaScript logic are **100% complete and fully working**.

When you are ready with your real business assets, photos, contact numbers, and catalog, use this checklist to swap them in effortlessly.

---

## 📸 1. Photos & Media To Supply
All images are neatly organized in the `assets/images/` folder. You can simply replace them with your real factory photos using the same names (or update the paths in HTML):

- [x] **Warehouse & Ready Stock Infrastructure:** (INTEGRATED) 4 authentic photos added across Home, About, Dealer, and Contact pages:
  - `assets/images/warehouse-roller-assembly.jpg` (Roller assembly & packaging bins)
  - `assets/images/warehouse-brush-inventory.jpg` (Panama paint brushes master carton stacks)
  - `assets/images/warehouse-aisle-stock.jpg` (Central warehouse high-density racking aisles)
  - `assets/images/warehouse-dispatch-dock.jpg` (Dispatch staging dock & distributor cartons)
- [ ] **Factory Exterior:** Replace `assets/images/factory-hero.jpg` with your plant's front elevation / entrance photo (or keep current factory visual).
- [ ] **Production Line / Machinery:** Replace `assets/images/rollers-production.jpg` with additional machinery photos if available.
- [ ] **QC / Inspection Step:** Replace `assets/images/qc-inspection.jpg` with a photo of your quality testing / inspection table.
- [ ] **Individual Product SKU Photos:** Replace product photos when you have isolated clean-background photos per SKU.

---

## 🔢 2. Numbers, Facts & Legal Information
You can update these in **`js/site-data.js`** (single place) or directly inside the HTML files:

- [ ] **Factory Established Year:** (Currently set to `2008` / `18+ Years`)
- [ ] **Monthly Production Capacity:** (Currently set to `350,000+ Units/Month`)
- [ ] **Districts Currently Supplied:** (Currently mapped to 6 districts: Mumbai, Thane, Pune, Nashik, Kolhapur, Aurangabad)
- [ ] **Official GST Number:** (Currently set to `27AABCJ1234D1Z5`)
- [ ] **Factory Certifications:** (Currently placeholder ISO 9001:2015 & MSME Udyam)
- [ ] **MOQ (Minimum Order Quantities):** Confirm per category (Rollers: 100 doz, Brushes: 50 doz, Sandpaper: 500 bundles, Thinner: 50 cans)

---

## 📝 3. Contact & Business Details
Update inside **`js/site-data.js`**:

```javascript
const SITE_CONFIG = {
  companyName: "JJ & Company",
  phone: "+91 98765 43210",       // Your official calling number
  whatsappRaw: "919876543210",    // Your WhatsApp number (country code + number, no spaces)
  email: "sales@jjandcompany.com",// Your official email
  gstNumber: "27AABCJ1234D1Z5",   // Your registered GSTIN
  factoryAddress: "Plot No. 42-45, Industrial Growth Centre, Phase II, Manufacturing Zone",
  cityStatePincode: "Mumbai / Maharashtra, 400001",
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
