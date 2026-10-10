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
  phoneSecondary: "+91 98900 03539",
  phoneSecondaryRaw: "919890003539",
  whatsappNumber: "+91 94227 75429",
  whatsappRaw: "919422775429", // No +, no spaces for wa.me links
  email: "jjandcompany313@gmail.com",
  gstNumber: "27ACXPN6682N1ZC", // Registered GST
  logoUrl: "assets/images/jj-company-logo.png",
  
  // --- Complete Plant & Warehouse Address (Arranged) ---
  plusCode: "2H5C+678",
  plotAndPremises: "Plot No-8, Dixit Wadi",
  roadStreet: "Swatantrya Chowk - Pande Chowk Rd",
  city: "Jalgaon",
  state: "Maharashtra",
  pincode: "425001",
  country: "India",
  fullAddressFormatted: "Plot No-8, Dixit Wadi, Swatantrya Chowk - Pande Chowk Rd, Jalgaon, Maharashtra 425001, India",
  factoryAddress: "Plot No-8, Dixit Wadi, Swatantrya Chowk - Pande Chowk Rd",
  cityStatePincode: "Jalgaon, Maharashtra 425001, India",
  locationCoordinates: "21°00'28.7\"N 75°34'14.2\"E",
  coordinatesDecimal: "21.007972, 75.570611",
  googleMapsUrl: "https://maps.google.com/?q=21.007972,75.570611",
  googleMapsEmbed: "https://maps.google.com/maps?q=21.007972,75.570611&hl=en&z=17&output=embed",
  workingHours: "Monday to Saturday: 8:30 AM – 8:00 PM (Sunday Closed)",
  
  // --- Supply Territories (Active in MH & MP • Pan-India Supply All Over India) ---
  supplyScope: "Direct Active Supply in Maharashtra & Madhya Pradesh • Supplying Goods All Over India",
  districtsServed: [
    { name: "Jalgaon", state: "Maharashtra", transit: "Same-Day Dispatch", coverage: "Central Manufacturing & Local Depot", badge: "Factory HQ" },
    { name: "Dhule", state: "Maharashtra", transit: "Daily Transport", coverage: "Khandesh West Corridor", badge: "Daily Route" },
    { name: "Nandurbar", state: "Maharashtra", transit: "24-Hour Delivery", coverage: "Scheduled Regional Transport", badge: "Scheduled Route" },
    { name: "Buldhana", state: "Maharashtra", transit: "24-Hour Delivery", coverage: "Vidarbha Gateway Transport", badge: "Scheduled Route" },
    { name: "Madhya Pradesh (MP)", state: "Madhya Pradesh", transit: "24-48 Hours", coverage: "Interstate Goods Transport Corridor", badge: "Interstate Supply" },
    { name: "All Over India", state: "Pan-India", transit: "Express Freight Transport", coverage: "Nationwide Wholesale & Bulk Goods Supply", badge: "All India Supply" }
  ],
  
  ownerName: "Jafar Hanif Nagavadriya",
  
  // --- Master Catalog PDF ---
  catalogPdfUrl: "assets/docs/JJ_Company_Master_Catalogue_2026.pdf",
  masterCatalogPdfUrl: "assets/docs/JJ_Company_Master_Catalogue_2026.pdf",

  // --- Automated Lead Capture & Direct Google Sheet Integration ---
  leadWebhookUrl: "https://script.google.com/macros/s/AKfycby0nwelzPOT-bg97Wc-lLWMUbuY1_FPOFOxjRUtQdIPAbF59VMZ403KjiZWdIbuqSaz/exec"
};

// --- Official PANAMA Paint Brush Collection (13 Models from Factory Catalog) ---
const PANAMA_BRUSH_COLLECTION = [
  { no: "01", name: "Panama Swan Brush", sizes: ["1\"", "1.5\"", "2\"", "2.5\"", "3\"", "4\""], handle: "Yellow & Black Grip", type: "Synthetic Filament", use: "Precision cutting & trim work" },
  { no: "02", name: "Panama 222 Brush", sizes: ["1\"", "1.5\"", "2\"", "2.5\"", "3\"", "4\""], handle: "Classic Red Finish", type: "Synthetic Filament", use: "Interior wall & trim painting" },
  { no: "03", name: "Panama 996 PVC Handle Brush", sizes: ["1\"", "1.5\"", "2\"", "2.5\"", "3\"", "4\""], handle: "Orange Durable PVC", type: "Solvent-Resistant Bristle", use: "Commercial & heavy-duty painting" },
  { no: "04", name: "Panama Tip-Top PVC Handle Brush", sizes: ["1\"", "1.5\"", "2\"", "2.5\"", "3\"", "4\""], handle: "Pink Comfort PVC", type: "Solid Round Tapered", use: "Smooth finish on interior walls" },
  { no: "05", name: "Panama Winner Brush", sizes: ["1\"", "2\"", "3\""], handle: "Blue Ergonomic Handle", type: "Synthetic Bristle", use: "All-purpose professional brush" },
  { no: "06", name: "Panama Honda Brush", sizes: ["4\""], handle: "Red Heavy-Duty Handle", type: "Export Quality Bristle", use: "Broad surface wall coverage" },
  { no: "07", name: "Panama 815 Brush", sizes: ["4\""], handle: "Yellow/Black Export Grip", type: "100% Guaranteed Export Grade", use: "Heavy emulsion & masonry coatings" },
  { no: "08", name: "Panama 777 PVC Handle Brush", sizes: ["3\"", "4\""], handle: "Pink PVC Handle", type: "Dense Tufted Bristles", use: "Fast broad wall painting" },
  { no: "09", name: "Panama Apex PVC Handle Brush", sizes: ["4\""], handle: "Yellow Apex PVC Grip", type: "Export Quality Filament", use: "Exterior weather-shield coatings" },
  { no: "10", name: "Panama Deluxe Long Hair Brush", sizes: ["4\""], handle: "Deluxe Black/Red Grip", type: "Deluxe Long Hair Filaments", use: "High paint pick-up & deep release" },
  { no: "11", name: "Panama Tynex Wooden Handle Brush", sizes: ["4\"", "5\""], handle: "Lacquered Natural Hardwood", type: "Premium Tynex Filaments", use: "Master painter fine finishes & enamel" },
  { no: "12", name: "Panama CAT 100% Pure Bristol Brush", sizes: ["4\""], handle: "Black Heavy Grip", type: "100% Pure White Bristol", use: "Zero-shed oil paints & wood polish" },
  { no: "13", name: "Panama RRR Black & White Brush", sizes: ["4\""], handle: "Black RRR Branded Handle", type: "Export Pure Bristle (Black & White)", use: "High-solvent industrial coatings" }
];

// --- Official WALL FIN Paint Roller Collection (12 Families / 33 Variants from Factory Catalog) ---
const WALL_FIN_ROLLER_COLLECTION = [
  { no: "01", name: "Wall Fin Blue Line Paint Roller", sizes: ["2\"", "4\"", "6\"", "9\""], construction: "Standard • 20 mm diameter" },
  { no: "02", name: "Wall Fin Yellow Line Paint Roller", sizes: ["2\"", "4\"", "6\"", "9\""], construction: "Standard • 20 mm diameter" },
  { no: "03", name: "Wall Fin Brown Line Paint Roller", sizes: ["2\"", "4\"", "6\"", "9\""], construction: "Standard • 20 mm diameter" },
  { no: "04", name: "Wall Fin Green Paint Roller", sizes: ["2\"", "4\"", "6\""], construction: "Standard • 20 mm diameter" },
  { no: "05", name: "Wall Fin Green Thread 38MM Paint Roller", sizes: ["2\"", "4\"", "6\"", "7\"", "9\""], construction: "38 mm diameter" },
  { no: "06", name: "Wall Fin Yellow Line 38MM Paint Roller", sizes: ["2\"", "4\"", "6\"", "7\"", "9\""], construction: "38 mm diameter" },
  { no: "07", name: "Wall Fin Tiger 38MM Paint Roller", sizes: ["2\"", "4\"", "6\"", "7\"", "9\""], construction: "38 mm diameter" },
  { no: "08", name: "Wall Fin Texture Roller 38MM Paint Roller", sizes: ["7\"", "9\""], construction: "38 mm diameter" },
  { no: "09", name: "Wall Fin Epoxy Paint Roller", sizes: ["2\"", "4\"", "6\"", "9\""], construction: "Epoxy" },
  { no: "10", name: "Wall Fin Foam Fix Roller", sizes: ["2\"", "4\"", "6\"", "9\""], construction: "Standard • 20 mm diameter" },
  { no: "11", name: "Wall Fin Foam Fix 38MM Roller", sizes: ["6\"", "9\""], construction: "38 mm diameter" },
  { no: "12", name: "Wall Fin Yellow Line 18MM Fixed Roller", sizes: ["2\"", "4\"", "6\""], construction: "18 mm diameter" }
];

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
    name: "Panama Paint Brushes Collection (13 Models)",
    category: "brushes",
    categoryName: "2. Brushes",
    image: "assets/images/brushes-collection.jpg",
    thumb: "assets/images/brushes-collection.jpg",
    moq: "50 Dozens (600 Pcs)",
    rateBadge: "Direct Dealer Pricing",
    shortDesc: "Official manufacturer of the PANAMA Paint Brush Collection — featuring 13 signature models including Panama Swan, 222, 996 PVC, Tip-Top, Winner, Honda, 815, 777, Apex, Deluxe Long Hair, Tynex Wooden, CAT 100% Pure Bristol, and RRR Black & White. Available from 1\" to 5\" with 100% shed-free epoxy potting.",
    specs: {
      "Brand / Collection": "PANAMA • Official J. J. & COMPANY Brand",
      "Available Sizes": "1.0\", 1.5\", 2.0\", 2.5\", 3.0\", 4.0\", 5.0\" & Masonry Wall Brushes",
      "Signature Models": "13 Models (Swan, 222, 996, Tip-Top, Winner, Honda, 815, 777, Apex, Deluxe, Tynex Wooden, CAT Pure Bristol, RRR)",
      "Bristle Material": "100% Solid Round Tapered Filaments, Pure White Bristol & Tynex Mix",
      "Ferrule Type": "Double-Crimped Rust-Proof Stainless Steel Ferrule",
      "Handle Varieties": "Lacquered Natural Hardwood, Ergonomic PVC & Polypropylene (Red, Yellow, Orange, Pink, Blue, Black)",
      "Shed Resistance": "Epoxy Resin Bonded — Guaranteed 100% Shed-Free Under Solvent Use",
      "Catalog Download": "Official 15-Page PANAMA Product Catalogue PDF Available"
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
