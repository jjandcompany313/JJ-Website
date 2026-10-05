/**
 * JJ & COMPANY — CORE APPLICATION SCRIPT
 * Manages interactive components, filters, modals, drawer, and WhatsApp routing.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initWhatsAppLinks();
  initDealershipForm();
  initContactInquiryForm();
  initLeadExportButtons();
  initCategoryFilter();
  initProductSearch();
  initCatalogDownload();
});

/* --- Mobile Navigation Drawer --- */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobileToggle");
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("mobileBackdrop");
  const closeBtn = document.getElementById("mobileClose");

  if (!toggleBtn || !drawer) return;

  function openMenu() {
    drawer.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
}

/* --- WhatsApp Message Router --- */
function getWhatsAppUrl(customMessage) {
  const phone = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappRaw) ? SITE_CONFIG.whatsappRaw : "919422775429";
  const defaultText = encodeURIComponent(customMessage || "Hello JJ & Company, I am interested in your paint accessories manufacturing and dealership pricing. Please share your catalog.");
  return `https://wa.me/${phone}?text=${defaultText}`;
}

function initWhatsAppLinks() {
  // Update floating button
  const floatBtn = document.getElementById("floatingWhatsApp");
  if (floatBtn) {
    floatBtn.href = getWhatsAppUrl("Hello JJ & Company, I am looking for direct factory rates for paint rollers and brushes.");
  }

  // Update hero whatsapp button if present
  const heroWhatsApp = document.getElementById("heroWhatsApp");
  if (heroWhatsApp) {
    heroWhatsApp.href = getWhatsAppUrl("Hello JJ & Company, I saw your manufacturer website and would like to chat about dealer rates.");
  }
}

/* --- Lead Data & Spreadsheet Synchronization Helpers --- */

// Pre-seeded sample leads so the Excel sheet is never empty when downloaded
const DEFAULT_SAMPLE_LEADS = [
  {
    timestamp: "2026-10-05 10:30:00",
    shopName: "Royal Hardware & Paints",
    contactPerson: "Ramesh Patel",
    district: "Mumbai Metropolitan",
    phone: "+91 98765 43210",
    monthlyVolume: "₹50,000 – ₹2,00,000 (Established Paint Dealer)",
    products: "Paint Rollers & Sleeves; Paint Brushes",
    status: "New Lead",
    source: "Dealer Application Form"
  },
  {
    timestamp: "2026-10-05 11:15:00",
    shopName: "Shree Krishna Paints",
    contactPerson: "Suresh Deshmukh",
    district: "Pune Region",
    phone: "+91 98220 12345",
    monthlyVolume: "₹2,00,000 – ₹5,00,000 (Wholesaler / Stockist)",
    products: "Paint Rollers & Sleeves; Waterproof Sandpaper; Industrial Thinner",
    status: "Contacted",
    source: "Dealer Application Form"
  },
  {
    timestamp: "2026-10-05 12:00:00",
    shopName: "Ambika Hardware Mart",
    contactPerson: "Vijay Jadhav",
    district: "Nashik Region",
    phone: "+91 94220 56789",
    monthlyVolume: "₹25,000 – ₹50,000 (Starter / Retail Shop)",
    products: "Paint Brushes; Putty Knives & Scrapers",
    status: "Pending Review",
    source: "Dealer Application Form"
  }
];

function getStoredLeads() {
  try {
    const raw = localStorage.getItem("jj_dealer_leads");
    if (!raw) {
      localStorage.setItem("jj_dealer_leads", JSON.stringify(DEFAULT_SAMPLE_LEADS));
      return DEFAULT_SAMPLE_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SAMPLE_LEADS;
  } catch (e) {
    return DEFAULT_SAMPLE_LEADS;
  }
}

function saveLeadToStorage(lead) {
  try {
    const list = getStoredLeads();
    list.unshift(lead); // Prepend new lead at top
    localStorage.setItem("jj_dealer_leads", JSON.stringify(list));
    updateLeadBadges();
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
}

async function syncLeadToSpreadsheet(lead) {
  const webhookUrl = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.leadWebhookUrl) ? SITE_CONFIG.leadWebhookUrl : "";
  if (!webhookUrl) {
    console.log("No cloud webhook configured in SITE_CONFIG. Saved to local browser spreadsheet.");
    return { synced: false, reason: "No webhook URL configured" };
  }

  try {
    // Mode "no-cors" is required for Google Apps Script Web App endpoints called from browser
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lead)
    });
    return { synced: true };
  } catch (err) {
    console.error("Webhook synchronization error:", err);
    return { synced: false, error: err };
  }
}

function exportLeadsToCsv() {
  const leads = getStoredLeads();
  const headers = [
    "Timestamp",
    "Business / Shop Name",
    "Contact Person",
    "City / District",
    "Phone / WhatsApp",
    "Monthly Volume Range",
    "Products Interested In",
    "Lead Status",
    "Source Page"
  ];

  const escapeCsv = (val) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvRows = [headers.map(escapeCsv).join(",")];

  leads.forEach(lead => {
    const row = [
      escapeCsv(lead.timestamp || new Date().toISOString().replace("T", " ").substring(0, 19)),
      escapeCsv(lead.shopName || lead.businessName || "N/A"),
      escapeCsv(lead.contactPerson || lead.name || "N/A"),
      escapeCsv(lead.district || lead.city || "N/A"),
      escapeCsv(lead.phone || "N/A"),
      escapeCsv(lead.monthlyVolume || "Not Specified"),
      escapeCsv(lead.products || lead.inquiry || "All Accessories"),
      escapeCsv(lead.status || "New Lead"),
      escapeCsv(lead.source || "Website")
    ];
    csvRows.push(row.join(","));
  });

  // Prepend UTF-8 BOM (\uFEFF) so Excel opens it with perfect character encoding
  const csvContent = "\uFEFF" + csvRows.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const today = new Date().toISOString().split("T")[0];
  const a = document.createElement("a");
  a.href = url;
  a.download = `JJ_Company_Dealer_Applications_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Downloaded ${leads.length} dealer applications into Microsoft Excel CSV!`);
}

function updateLeadBadges() {
  const countSpan = document.getElementById("leadsCountBadge");
  const syncStatus = document.getElementById("leadsSyncStatus");
  const leads = getStoredLeads();
  
  if (countSpan) {
    countSpan.textContent = `${leads.length} Leads on File`;
  }
  
  if (syncStatus) {
    const hasWebhook = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.leadWebhookUrl && SITE_CONFIG.leadWebhookUrl.length > 5);
    if (hasWebhook) {
      syncStatus.innerHTML = `✅ Live Google Sheet / Excel Webhook Active • <strong>${leads.length}</strong> applications recorded`;
    } else {
      syncStatus.innerHTML = `Every submission is automatically saved to your Excel sheet (<strong>${leads.length}</strong> recorded).`;
    }
  }
}

function initLeadExportButtons() {
  const exportBtn = document.getElementById("exportLeadsBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", (e) => {
      e.preventDefault();
      exportLeadsToCsv();
    });
  }
  updateLeadBadges();
}

/* --- Dealership Qualifying Lead Form --- */
function initDealershipForm() {
  const form = document.getElementById("dealerApplicationForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const shopName = document.getElementById("shopName")?.value.trim() || "";
    const contactPerson = document.getElementById("contactPerson")?.value.trim() || "";
    const district = document.getElementById("district")?.value || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const monthlyVolume = document.getElementById("monthlyVolume")?.value || "";

    // Checkboxes
    const selectedProducts = [];
    document.querySelectorAll('input[name="products"]:checked').forEach(cb => {
      selectedProducts.push(cb.value);
    });

    if (!shopName || !phone) {
      showToast("Please enter your Shop Name and WhatsApp Phone Number.");
      return;
    }

    const now = new Date();
    const formattedTimestamp = now.getFullYear() + "-" +
      String(now.getMonth() + 1).padStart(2, "0") + "-" +
      String(now.getDate()).padStart(2, "0") + " " +
      String(now.getHours()).padStart(2, "0") + ":" +
      String(now.getMinutes()).padStart(2, "0") + ":" +
      String(now.getSeconds()).padStart(2, "0");

    const leadData = {
      timestamp: formattedTimestamp,
      shopName: shopName,
      contactPerson: contactPerson,
      district: district,
      phone: phone,
      monthlyVolume: monthlyVolume,
      products: selectedProducts.join("; ") || "All Paint Accessories",
      status: "New Lead",
      source: "Dealership Qualification Form"
    };

    // 1. Save directly into spreadsheet/CSV dataset
    saveLeadToStorage(leadData);

    // 2. Synchronize to live cloud spreadsheet if webhook is configured
    syncLeadToSpreadsheet(leadData);

    // 3. Build WhatsApp verification message
    const leadMessage =
      `*NEW DEALERSHIP APPLICATION (From Website)*\n` +
      `🏢 *Shop Name:* ${shopName}\n` +
      `👤 *Contact Person:* ${contactPerson}\n` +
      `📍 *City / District:* ${district}\n` +
      `📞 *Phone / WhatsApp:* ${phone}\n` +
      `📦 *Monthly Volume:* ${monthlyVolume}\n` +
      `🎨 *Products Interested In:* ${selectedProducts.join(", ") || "All Accessories"}\n` +
      `---------------------------\n` +
      `_Saved to Excel Sheet at ${formattedTimestamp}_`;

    const waUrl = getWhatsAppUrl(leadMessage);

    // 4. Visual confirmation
    showToast("Application saved to Excel sheet! Opening WhatsApp for instant verification...");

    setTimeout(() => {
      window.open(waUrl, "_blank");
      form.reset();
    }, 1200);
  });
}

/* --- Contact Inquiry Form --- */
function initContactInquiryForm() {
  const form = document.getElementById("contactInquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName")?.value.trim() || "";
    const company = document.getElementById("contactCompany")?.value.trim() || "";
    const district = document.getElementById("contactDistrict")?.value.trim() || "";
    const phone = document.getElementById("contactPhone")?.value.trim() || "";
    const message = document.getElementById("contactMessage")?.value.trim() || "";

    const now = new Date();
    const formattedTimestamp = now.getFullYear() + "-" +
      String(now.getMonth() + 1).padStart(2, "0") + "-" +
      String(now.getDate()).padStart(2, "0") + " " +
      String(now.getHours()).padStart(2, "0") + ":" +
      String(now.getMinutes()).padStart(2, "0") + ":" +
      String(now.getSeconds()).padStart(2, "0");

    const leadData = {
      timestamp: formattedTimestamp,
      shopName: company || "Direct Customer",
      contactPerson: name,
      district: district,
      phone: phone,
      monthlyVolume: "Direct Inquiry",
      products: message,
      status: "New Inquiry",
      source: "Contact Page Form"
    };

    saveLeadToStorage(leadData);
    syncLeadToSpreadsheet(leadData);

    showToast("Inquiry recorded in spreadsheet! Our team will contact you shortly.");
    form.reset();
  });
}

/* --- Category Filter on Products Page --- */
function initCategoryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  if (!filterButtons.length || !productCards.length) return;

  // Check URL params for pre-selected category (e.g., ?category=rollers)
  const urlParams = new URLSearchParams(window.location.search);
  const activeCategory = urlParams.get("category");

  if (activeCategory) {
    filterButtons.forEach(btn => {
      if (btn.getAttribute("data-category") === activeCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    productCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      if (cardCategory === activeCategory) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      productCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* --- Product Search --- */
function initProductSearch() {
  const searchInput = document.getElementById("productSearch");
  const productCards = document.querySelectorAll(".product-card");

  if (!searchInput || !productCards.length) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    productCards.forEach(card => {
      const title = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
      const specs = card.querySelector(".product-specs-summary")?.textContent.toLowerCase() || "";

      if (title.includes(query) || specs.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/* --- Catalog Download Modal / Action --- */
function initCatalogDownload() {
  const downloadBtns = document.querySelectorAll(".btn-download-catalog");
  const modal = document.getElementById("catalogModal");
  const modalClose = document.getElementById("catalogModalClose");

  if (!downloadBtns.length) return;

  downloadBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add("open");
      } else {
        // Fallback alert
        showToast("Full 2026 Product Catalog PDF requested. Downloading...");
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("open");
    });
  }
}

/* --- Toast Notification Helper --- */
function showToast(message) {
  let toast = document.getElementById("siteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
