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
  cityStatePincode: "Jalgaon, Maharashtra, India",
  locationCoordinates: "21°00'28.7\"N 75°34'14.2\"E",
  coordinatesDecimal: "21.007972, 75.570611",
  googleMapsUrl: "https://maps.google.com/?q=21.007972,75.570611",
  googleMapsEmbed: "https://maps.google.com/maps?q=21.007972,75.570611&hl=en&z=17&output=embed",
  workingHours: "Monday to Saturday: 8:30 AM – 8:00 PM (Sunday Closed)",
  
  // --- Verified Supply Territory (Maharashtra & Madhya Pradesh) ---
  districtsServed: [
    { name: "Jalgaon", state: "Maharashtra", transit: "Same-Day Dispatch", coverage: "Central Manufacturing & Local Depot", badge: "Factory HQ" },
    { name: "Dhule", state: "Maharashtra", transit: "Daily Transport", coverage: "Khandesh West Corridor", badge: "Daily Route" },
    { name: "Nandurbar", state: "Maharashtra", transit: "24-Hour Delivery", coverage: "Scheduled Regional Transport", badge: "Scheduled Route" },
    { name: "Buldhana", state: "Maharashtra", transit: "24-Hour Delivery", coverage: "Vidarbha Gateway Transport", badge: "Scheduled Route" },
    { name: "Madhya Pradesh (MP)", state: "Madhya Pradesh", transit: "24-48 Hours", coverage: "Interstate Goods Transport & Fleet Carriers", badge: "Interstate Supply" }
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
// --- 3 Core Product Sections (As Requested by Manufacturer) ---
const PRODUCTS_DATA = [
  // Section 1: Rollers
  {
    id: "rollers",
    aliasId: "pro-glide-roller-9",
    name: "Paint Rollers & Refills Collection",
    category: "rollers",
    categoryName: "1. Rollers",
    image: "assets/images/rollers-collection.jpg",
    thumb: "assets/images/rollers-collection.jpg",
    moq: "100 Dozens (1,200 Pcs)",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "High-density 4\", 7\", 9\" cage frame paint rollers, mini foam rollers, striped microfiber sleeves, and yellow nap refills with solvent-proof cores for streak-free interior & exterior wall coverage.",
    specs: {
      "Available Sizes": "4 Inch, 7 Inch, 9 Inch (Standard 228mm)",
      "Roller Types": "Cage Frame Rollers, Foam Mini Rollers, Microfiber Sleeves, Yellow Nap Refills",
      "Core Construction": "Solvent-Resistant Heavy Gauge Polypropylene Core",
      "Handle Mechanism": "Heavy-Duty 5-Wire Nickel Cage & Ergonomic Ribbed Grip",
      "Recommended Paints": "Emulsion, Primer, Acrylic, Plastic Paint & Distemper",
      "Standard Packaging": "Inner Polybagged, 60 to 120 Pcs per Corrugated Master Carton"
    }
  },

  // Section 2: Brushes
  {
    id: "brushes",
    aliasId: "classic-gold-brush-4",
    name: "Paint Brushes & Block Brushes Collection",
    category: "brushes",
    categoryName: "2. Brushes",
    image: "assets/images/brushes-collection.jpg",
    thumb: "assets/images/brushes-collection.jpg",
    moq: "50 Dozens (600 Pcs)",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "Professional flat paint brushes (1\" to 5\" in red, blue, wooden, black handles) and wide masonry wall block brushes with 100% shed-free epoxy bonding and stainless steel ferrules.",
    specs: {
      "Available Sizes": "1.0\", 1.5\", 2.0\", 2.5\", 3.0\", 4.0\", 5.0\" & Masonry Block Brushes",
      "Bristle Material": "100% Solid Round Tapered Synthetic Filaments & Natural Mix",
      "Ferrule Type": "Double-Crimped Rust-Proof Stainless Steel",
      "Handle Options": "Lacquered Natural Hardwood, Ergonomic Red/Blue/Black Polymers",
      "Shed Resistance": "Epoxy Resin Bonded — Guaranteed 100% Shed-Free Under Solvent Use",
      "Standard Packaging": "Protective Card Sleeves, 12 Pcs Inner Box / 240 Pcs Master Box"
    }
  },

  // Section 3: Thinner, Polish, Paper etc...
  {
    id: "thinner-polish-paper",
    aliasId: "pro-thin-nc-thinner",
    name: "Thinner, Polish, Paper & Accessories Collection",
    category: "accessories",
    categoryName: "3. Thinner, Polish, Paper etc...",
    image: "assets/images/accessories-range.jpg",
    thumb: "assets/images/accessories-range.jpg",
    moq: "Assorted Wholesale Cartons",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "Industrial virgin NC & PU thinners, premium wood finish polish, silicon carbide waterproof sandpaper (sheets & discs), sanding blocks, tempered putty knives, and crepe masking tape.",
    specs: {
      "Industrial Thinners": "NC & PU Virgin Thinners (500ml, 1L, 5L, 20L Metal & HDPE Cans)",
      "Wood Polish & Finish": "High-Gloss Protective Clear & Colored Wood Polish",
      "Waterproof Sandpaper": "P80, P120, P150, P180, P220, P320, P400 Sheets & Hook-and-Loop Sanding Discs",
      "Surface Preparation": "Hand Sanding Blocks & Dual-Density Sanding Sponges",
      "Putty Knives & Scrapers": "Spring-Tempered Stainless Steel (2\", 3\", 4\", 5\", 6\" Blade Widths)",
      "Masking Tapes": "Residue-Free Crepe Paper Painter's Tape (18mm, 24mm, 36mm, 48mm Rolls)"
    }
  },

  // Backward-compatible individual items
  {
    id: "pro-glide-roller-9",
    name: "MasterGrip Pro-Glide 9\" Paint Roller & Sleeves",
    category: "rollers",
    categoryName: "1. Rollers",
    image: "assets/images/rollers-collection.jpg",
    thumb: "assets/images/rollers-collection.jpg",
    moq: "100 Dozens (1,200 Pcs)",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "High-density microfiber roller nap with solvent-resistant polymer core for streak-free interior & exterior wall coverage.",
    specs: {
      "Size": "9 Inch (228 mm)",
      "Nap Length": "12 mm High Density Microfiber",
      "Core Material": "Heavy Duty Solvent-Proof Polypropylene",
      "Handle Mechanism": "5-Wire Heavy Gauge Nickel Cage System",
      "Packaging": "Inner Polybag, 60 Pcs per Master Corrugated Box"
    }
  },
  {
    id: "classic-gold-brush-4",
    name: "JJ Classic Gold Flat Paint Brush 4\" & Block Brushes",
    category: "brushes",
    categoryName: "2. Brushes",
    image: "assets/images/brushes-collection.jpg",
    thumb: "assets/images/brushes-collection.jpg",
    moq: "50 Dozens (600 Pcs)",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "Solid round tapered synthetic filaments with epoxy setting and rust-proof stainless steel ferrule for razor-sharp cutting.",
    specs: {
      "Size / Width": "4.0 Inch (100 mm) & Assorted Sets",
      "Bristle Type": "100% Solid Round Tapered Synthetic Filaments",
      "Ferrule": "Rust-Resistant Stainless Steel with Double Crimp",
      "Packaging": "Individual Card Protector, 12 Pcs Pack / 240 Pcs Carton"
    }
  },
  {
    id: "waterproof-silicon-sandpaper",
    name: "Titan Abrasive Waterproof Sandpaper (Sheets & Discs)",
    category: "accessories",
    categoryName: "3. Thinner, Polish, Paper etc...",
    image: "assets/images/accessories-range.jpg",
    thumb: "assets/images/accessories-range.jpg",
    moq: "500 Bundles (25,000 Sheets)",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "Electro-coated silicon carbide grains on latex waterproof backing for wet and dry sanding with anti-clogging technology.",
    specs: {
      "Sheet Size": "230 x 280 mm (Standard 9x11 inch) & Velcro Discs",
      "Available Grits": "P80, P120, P150, P180, P220, P320, P400",
      "Abrasive Mineral": "Black Silicon Carbide with Resin Bond",
      "Packaging": "50 Sheets per Sleeve / 500 Sheets per Carton"
    }
  },
  {
    id: "titan-flex-putty-blade",
    name: "JJ Titan-Flex Stainless Putty Scraper Knife",
    category: "accessories",
    categoryName: "3. Thinner, Polish, Paper etc...",
    image: "assets/images/accessories-range.jpg",
    thumb: "assets/images/accessories-range.jpg",
    moq: "120 Dozens (1,440 Pcs)",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "Spring-tempered stainless steel blade with cushioned rubber grip for effortless wall putty application and scraping.",
    specs: {
      "Sizes Available": "2\", 3\", 4\", 5\", 6\" Blade Widths",
      "Blade Steel": "Tempered Mirror-Polished Stainless Steel",
      "Packaging": "12 Pcs Box / 144 Pcs Master"
    }
  },
  {
    id: "painters-edge-masking-tape",
    name: "Painter's Edge Premium Crepe Masking Tape",
    category: "accessories",
    categoryName: "3. Thinner, Polish, Paper etc...",
    image: "assets/images/accessories-range.jpg",
    thumb: "assets/images/accessories-range.jpg",
    moq: "200 Rolls",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "Residue-free natural rubber adhesive crepe tape offering crisp paint lines on all surfaces.",
    specs: {
      "Widths": "18mm, 24mm, 36mm, 48mm",
      "Adhesion Type": "Clean Removal Natural Rubber Adhesive",
      "Packaging": "Shrink-Wrapped Rolls per Carton"
    }
  }
];
