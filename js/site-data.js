/**
 * JJ & COMPANY — CONFIGURATION & PLACEHOLDER DATA STORE
 * This file centralizes company details, districts, products, and contact info.
 * The business owner can update these values anytime with their real details!
 */

const SITE_CONFIG = {
  // --- Company Profile (Replace when available) ---
  companyName: "JJ & Company",
  tagline: "Paint Tools & Accessories Manufacturer",
  businessType: "Direct Factory Manufacturer",
  establishedYear: "2008",
  yearsInBusiness: "18+ Years",
  monthlyProductionCapacity: "350,000+ Units/Mo",
  
  // --- Contact & Legal Information (From verified Dixit Wadi facility) ---
  phone: "+91 94227 75429",
  phoneRaw: "919422775429",
  phoneSecondary: "+91 94227 79339",
  phoneSecondaryRaw: "919422779339",
  whatsappNumber: "+91 94227 75429",
  whatsappRaw: "919422775429", // No +, no spaces for wa.me links
  email: "sales@jjandcompany.com",
  gstNumber: "27AABCJ1234D1Z5", // Registered GST
  
  factoryAddress: "Plot No-8, Dixit Wadi",
  cityStatePincode: "Maharashtra, India",
  workingHours: "Monday to Saturday: 8:30 AM – 6:30 PM (Sunday Closed)",
  
  // --- 6 Districts Served (Proof of coverage) ---
  districtsServed: [
    { name: "Mumbai Metropolitan", transit: "Same-Day Dispatch", coverage: "Direct Factory Van" },
    { name: "Thane & Navi Mumbai", transit: "Same-Day Dispatch", coverage: "Direct Factory Van" },
    { name: "Pune Industrial Belt", transit: "24-Hour Delivery", coverage: "Express Logistics" },
    { name: "Nashik Region", transit: "24-48 Hours", coverage: "Daily Transport" },
    { name: "Kolhapur & Sangli", transit: "24-48 Hours", coverage: "Regional Carrier" },
    { name: "Aurangabad / Sambhajinagar", transit: "48 Hours", coverage: "Hub Distribution" }
  ],
  
  // --- Catalog PDF ---
  catalogPdfUrl: "assets/docs/JJ_Company_Product_Catalog_2026.pdf",

  // --- Automated Lead Capture & Spreadsheet / Excel Integration ---
  // To connect a live Google Sheet or Excel Webhook, paste your deployed Google Apps Script URL below:
  // e.g., "https://script.google.com/macros/s/AKfycb.../exec"
  // (Leave empty to use built-in browser storage + instant 1-click Excel CSV export)
  leadWebhookUrl: ""
};

// --- Product Catalog Items (Paint Accessories) ---
const PRODUCTS_DATA = [
  {
    id: "pro-glide-roller-9",
    name: "MasterGrip Pro-Glide 9\" Paint Roller",
    category: "rollers",
    categoryName: "Paint Rollers",
    image: "assets/images/rollers-collection.jpg",
    thumb: "assets/images/rollers-collection.jpg",
    moq: "100 Dozens (1,200 Pcs)",
    rateBadge: "Dealer Rate on Request",
    shortDesc: "High-density microfiber roller nap with solvent-resistant polymer core for streak-free interior & exterior wall coverage.",
    specs: {
      "Size": "9 Inch (228 mm)",
      "Nap / Pile Length": "12 mm High Density Microfiber",
      "Core Material": "Heavy Duty Solvent-Proof Polypropylene",
      "Handle Mechanism": "5-Wire Heavy Gauge Nickel Cage System",
      "Recommended Use": "Emulsion, Primer, Acrylic & Distemper Paints",
      "Standard Packaging": "Inner Polybag, 60 Pcs per Master Corrugated Box"
    }
  },
  {
    id: "classic-gold-brush-4",
    name: "JJ Classic Gold Flat Paint Brush 4\"",
    category: "brushes",
    categoryName: "Paint Brushes",
    image: "assets/images/brushes-collection.jpg",
    thumb: "assets/images/brushes-collection.jpg",
    moq: "50 Dozens (600 Pcs)",
    rateBadge: "Dealer Rate on Request",
    shortDesc: "Solid round tapered synthetic filaments with epoxy setting and rust-proof stainless steel ferrule for razor-sharp cutting.",
    specs: {
      "Size / Width": "4.0 Inch (100 mm)",
      "Bristle Type": "100% Solid Round Tapered Synthetic Filaments",
      "Ferrule": "Rust-Resistant Stainless Steel with Double Crimp",
      "Handle": "Solid Ergonomic Hardwood Handle, Lacquered Finish",
      "Shed Resistance": "Epoxy Glued — Guaranteed 100% Shed-Free",
      "Packaging": "Individual Card Protector, 12 Pcs Pack / 240 Pcs Carton"
    }
  },
  {
    id: "pro-thin-nc-thinner",
    name: "Pro-Thin Industrial NC & PU Thinner 5L",
    category: "thinner",
    categoryName: "Thinner & Solvents",
    image: "assets/images/accessories-range.jpg",
    thumb: "assets/images/accessories-range.jpg",
    moq: "50 Cans (250 Litres)",
    rateBadge: "Dealer Rate on Request",
    shortDesc: "High-purity virgin solvent formulation designed for quick drying, mirror finish flow, and clean dilution of paints & lacquers.",
    specs: {
      "Pack Sizes": "500ml, 1 Litre, 5 Litre, 20 Litre, 200L Drum",
      "Purity Grade": "Virgin Solvent Grade (Zero Recycled Base)",
      "Dry Speed": "Balanced Flash-Off & Controlled Evaporation",
      "Compatibility": "NC Lacquers, Synthetic Enamels, PU Coatings",
      "Container": "Heavy Duty Leak-Proof Metal Can with Safety Seal"
    }
  },
  {
    id: "waterproof-silicon-sandpaper",
    name: "Titan Abrasive Waterproof Sandpaper (Grits 80-400)",
    category: "sandpaper",
    categoryName: "Sandpaper & Abrasives",
    image: "assets/images/accessories-range.jpg",
    thumb: "assets/images/accessories-range.jpg",
    moq: "500 Bundles (25,000 Sheets)",
    rateBadge: "Dealer Rate on Request",
    shortDesc: "Electro-coated silicon carbide grains on latex waterproof backing for wet and dry sanding with anti-clogging technology.",
    specs: {
      "Sheet Size": "230 x 280 mm (Standard 9x11 inch)",
      "Available Grits": "P80, P120, P150, P180, P220, P320, P400",
      "Abrasive Mineral": "Black Silicon Carbide with Resin Bond",
      "Backing Paper": "Latex-Impregnated Flexible Waterproof Paper",
      "Bundle Size": "50 Sheets per Sleeve / 500 Sheets per Carton"
    }
  },
  {
    id: "titan-flex-putty-blade",
    name: "JJ Titan-Flex Stainless Putty Scraper Knife",
    category: "accessories",
    categoryName: "Application Tools",
    image: "assets/images/accessories-range.jpg",
    thumb: "assets/images/accessories-range.jpg",
    moq: "120 Dozens (1,440 Pcs)",
    rateBadge: "Dealer Rate on Request",
    shortDesc: "Spring-tempered stainless steel blade with cushioned rubber grip for effortless wall putty application, scraping, and smoothing.",
    specs: {
      "Sizes Available": "2\", 3\", 4\", 5\", 6\" Blade Widths",
      "Blade Steel": "Tempered Mirror-Polished Stainless Steel",
      "Flexibility": "Precision Ground Tapered Flex",
      "Handle": "Ergonomic Dual-Density Rubber Soft Grip",
      "Packaging": "Hang-Card Header, 12 Pcs Box / 144 Pcs Master"
    }
  },
  {
    id: "painters-edge-masking-tape",
    name: "Painter's Edge Premium Crepe Masking Tape",
    category: "accessories",
    categoryName: "Application Tools",
    image: "assets/images/accessories-range.jpg",
    thumb: "assets/images/accessories-range.jpg",
    moq: "200 Rolls",
    rateBadge: "Dealer Rate on Request",
    shortDesc: "Residue-free natural rubber adhesive crepe tape offering crisp paint lines and UV resistance up to 7 days.",
    specs: {
      "Widths": "18mm, 24mm, 36mm, 48mm",
      "Length": "20m, 30m & 50m rolls",
      "Adhesion Type": "Clean Removal Natural Rubber Adhesive",
      "Backing": "Crepe Paper with Solvent Resistance",
      "Clean Removal": "Guaranteed Zero Sticky Residue on Tiles & Walls"
    }
  }
];
