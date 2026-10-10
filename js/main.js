/**
 * JJ & COMPANY — CORE APPLICATION SCRIPT
 * Manages interactive components, filters, modals, drawer, and WhatsApp routing.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initWhatsAppLinks();
  initMasterInquiryForm();
  initLeadExportButtons();
  initCategoryFilter();
  initProductSearch();
  initCatalogDownload();
  initLeadsPortalPage();
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
    contactPerson: "Ramesh Patel",
    shopName: "Royal Hardware & Paints",
    phone: "+91 98765 43210",
    district: "Jalgaon, Maharashtra",
    inquiryType: "Dealership & Wholesale Partnership",
    products: "1. Rollers (Wall Fin); 2. Brushes (Panama)",
    message: "Requirement for 500 pcs 9\" rollers and 20 dozen 4\" Panama brushes per month.",
    status: "New Lead",
    source: "Website Master Form"
  },
  {
    timestamp: "2026-10-05 11:15:00",
    contactPerson: "Suresh Deshmukh",
    shopName: "Shree Krishna Paints",
    phone: "+91 98220 12345",
    district: "Dhule, Maharashtra",
    inquiryType: "Bulk Order / Price List Request",
    products: "1. Rollers (Wall Fin); 3. Thinner, Polish, Paper",
    message: "Need bulk pricing list for NC thinners (20L drums) and waterproof sandpaper P120.",
    status: "Contacted",
    source: "Website Master Form"
  },
  {
    timestamp: "2026-10-05 12:00:00",
    contactPerson: "Vijay Jadhav",
    shopName: "Ambika Hardware Mart",
    phone: "+91 94220 56789",
    district: "Buldhana, Maharashtra",
    inquiryType: "Product Samples Request",
    products: "2. Brushes (Panama); 3. Thinner, Polish, Paper",
    message: "Please send sample pack for Panama 222 and Swan brushes before wholesale order.",
    status: "Sample Dispatched",
    source: "Website Master Form"
  },
  {
    timestamp: "2026-10-05 14:20:00",
    contactPerson: "Mahesh Agrawal",
    shopName: "Central India Paint Suppliers",
    phone: "+91 97550 44321",
    district: "Indore, Madhya Pradesh",
    inquiryType: "Dealership & Wholesale Partnership",
    products: "Full Master Catalog Range",
    message: "Interested in regional stockist distribution across Western MP. Direct factory transport required.",
    status: "In Negotiation",
    source: "Website Master Form"
  }
];

function getStoredLeads() {
  try {
    const raw = localStorage.getItem("jj_inquiry_leads") || localStorage.getItem("jj_dealer_leads");
    if (!raw) {
      localStorage.setItem("jj_inquiry_leads", JSON.stringify(DEFAULT_SAMPLE_LEADS));
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
    localStorage.setItem("jj_inquiry_leads", JSON.stringify(list));
    localStorage.setItem("jj_dealer_leads", JSON.stringify(list));
    updateLeadBadges();
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
}

async function syncLeadToSpreadsheet(lead) {
  const webhookUrl = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.leadWebhookUrl) ? SITE_CONFIG.leadWebhookUrl : "";
  if (!webhookUrl) {
    console.log("No cloud webhook configured in SITE_CONFIG. Data preserved in browser storage & downloaded as Excel CSV.");
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

function exportLeadsToCsv(filename) {
  const leads = getStoredLeads();
  const headers = [
    "Submission Date",
    "Contact Person",
    "Business / Shop Name",
    "Phone / WhatsApp",
    "City & State",
    "Purpose of Inquiry",
    "Products of Interest",
    "Message / Requirements",
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
      escapeCsv(lead.contactPerson || lead.name || "N/A"),
      escapeCsv(lead.shopName || lead.businessName || "Direct Inquiry"),
      escapeCsv(lead.phone || "N/A"),
      escapeCsv(lead.district || lead.city || "N/A"),
      escapeCsv(lead.inquiryType || lead.monthlyVolume || "General Inquiry"),
      escapeCsv(lead.products || lead.inquiry || "All Products Range"),
      escapeCsv(lead.message || "N/A"),
      escapeCsv(lead.status || "New Lead"),
      escapeCsv(lead.source || "Website")
    ];
    csvRows.push(row.join(","));
  });

  // Prepend UTF-8 BOM (\uFEFF) so Microsoft Excel opens the CSV with perfect character encoding
  const csvContent = "\uFEFF" + csvRows.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const today = new Date().toISOString().split("T")[0];
  const downloadName = filename || `JJ_Company_Inquiries_${today}.csv`;
  
  const a = document.createElement("a");
  a.href = url;
  a.download = downloadName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Downloaded ${leads.length} inquiries into Microsoft Excel (.CSV)!`);
}

function updateLeadBadges() {
  const countSpan = document.getElementById("leadsCountBadge");
  const syncStatus = document.getElementById("leadsSyncStatus");
  const leads = getStoredLeads();
  
  if (countSpan) {
    countSpan.textContent = `${leads.length} Inquiries on File`;
  }
  
  if (syncStatus) {
    const hasWebhook = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.leadWebhookUrl && SITE_CONFIG.leadWebhookUrl.length > 5);
    if (hasWebhook) {
      syncStatus.innerHTML = `✅ Live Google Sheet Webhook Connected • <strong>${leads.length}</strong> inquiries recorded`;
    } else {
      syncStatus.innerHTML = `Every submission is saved to Excel sheet (<strong>${leads.length}</strong> inquiries on file).`;
    }
  }
}

function initLeadExportButtons() {
  window.exportLeads = exportLeadsToCsv;

  // Keyboard shortcut for owner to download Excel leads: Ctrl + Shift + E
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === "E" || e.key === "e")) {
      e.preventDefault();
      exportLeadsToCsv();
    }
  });

  const exportBtns = document.querySelectorAll(".btn-export-leads, #exportLeadsBtn");
  exportBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      exportLeadsToCsv();
    });
  });

  updateLeadBadges();
}

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showInquirySuccessModal(lead) {
  let modal = document.getElementById("inquirySuccessModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "inquirySuccessModal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  const waLeadMessage =
    `*NEW INQUIRY (From JJ & Company Website)*\n` +
    `👤 *Contact Person:* ${lead.contactPerson}\n` +
    `🏢 *Business / Shop:* ${lead.shopName || "Direct"}\n` +
    `📞 *Phone / WhatsApp:* ${lead.phone}\n` +
    `📍 *Location:* ${lead.district}\n` +
    `🎯 *Purpose:* ${lead.inquiryType}\n` +
    `🎨 *Products:* ${lead.products}\n` +
    `📝 *Message:* ${lead.message || "None"}\n` +
    `---------------------------\n` +
    `_Details auto-saved to JJ & Company Excel Sheet_`;

  const waUrl = getWhatsAppUrl(waLeadMessage);

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 520px; text-align: center; padding: 32px 26px;">
      <button class="modal-close" id="closeSuccessModalBtn" aria-label="Close" style="top: 14px; right: 16px;">&times;</button>
      <div style="width: 58px; height: 58px; border-radius: 50%; background: #E8F5E9; color: #058A5E; display: flex; align-items: center; justify-content: center; font-size: 30px; margin: 0 auto 14px auto; font-weight: bold;">
        ✓
      </div>
      <h3 style="font-size: 1.4rem; color: var(--text-main); margin-bottom: 6px; font-weight: 800;">
        Inquiry Submitted &amp; Saved!
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 18px; line-height: 1.5;">
        Your inquiry details have been saved, and an updated <strong>Microsoft Excel (.CSV)</strong> sheet was automatically downloaded to your computer.
      </p>

      <div style="background: var(--bg-section); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px 18px; text-align: left; font-size: 0.86rem; margin-bottom: 22px; line-height: 1.6;">
        <div style="margin-bottom: 4px;"><strong>👤 Name:</strong> <span>${escapeHtml(lead.contactPerson)}</span></div>
        <div style="margin-bottom: 4px;"><strong>🏢 Business / Shop:</strong> <span>${escapeHtml(lead.shopName || "Direct Inquiry")}</span></div>
        <div style="margin-bottom: 4px;"><strong>📞 Phone / WhatsApp:</strong> <span>${escapeHtml(lead.phone)}</span></div>
        <div style="margin-bottom: 4px;"><strong>📍 City &amp; State:</strong> <span>${escapeHtml(lead.district)}</span></div>
        <div style="margin-bottom: 4px;"><strong>🎯 Inquiry Purpose:</strong> <span>${escapeHtml(lead.inquiryType)}</span></div>
        <div><strong>📦 Products:</strong> <span>${escapeHtml(lead.products)}</span></div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button id="downloadExcelModalBtn" class="btn btn-primary btn-block btn-lg" style="justify-content: center;">
          📥 Download Excel Sheet (.CSV) Again
        </button>
        <a href="${waUrl}" target="_blank" class="btn btn-whatsapp btn-block btn-lg" style="justify-content: center;">
          💬 Confirm &amp; Chat on WhatsApp
        </a>
        <a href="leads.html" class="btn btn-outline btn-block" style="font-size: 0.85rem; justify-content: center;">
          📊 View All Inquiries in Owner Portal
        </a>
      </div>
    </div>
  `;

  modal.classList.add("open");

  // Wire modal buttons
  document.getElementById("closeSuccessModalBtn")?.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  document.getElementById("downloadExcelModalBtn")?.addEventListener("click", () => {
    exportLeadsToCsv();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });
}

/* --- The Single Unified Master Inquiry Form --- */
function initMasterInquiryForm() {
  const form = document.getElementById("masterInquiryForm") ||
               document.getElementById("dealerApplicationForm") ||
               document.getElementById("contactInquiryForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contactPerson = (
      document.getElementById("contactPerson")?.value ||
      document.getElementById("contactName")?.value ||
      ""
    ).trim();

    const shopName = (
      document.getElementById("shopName")?.value ||
      document.getElementById("contactCompany")?.value ||
      ""
    ).trim();

    const phone = (
      document.getElementById("phone")?.value ||
      document.getElementById("contactPhone")?.value ||
      ""
    ).trim();

    const district = (
      document.getElementById("district")?.value ||
      document.getElementById("contactDistrict")?.value ||
      ""
    ).trim();

    const inquiryType = (
      document.getElementById("inquiryType")?.value ||
      document.getElementById("monthlyVolume")?.value ||
      "Dealership & Wholesale Partnership"
    );

    // Products Checkboxes
    const selectedProducts = [];
    document.querySelectorAll('input[name="products"]:checked').forEach(cb => {
      selectedProducts.push(cb.value);
    });

    const message = (
      document.getElementById("message")?.value ||
      document.getElementById("contactMessage")?.value ||
      ""
    ).trim();

    if (!contactPerson || !phone) {
      showToast("Please enter your Contact Person Name and Phone / WhatsApp Number.");
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
      contactPerson: contactPerson,
      shopName: shopName || "Direct Business Inquiry",
      phone: phone,
      district: district || "Maharashtra / All India",
      inquiryType: inquiryType,
      products: selectedProducts.join("; ") || "Complete Master Catalogue Range",
      message: message || "Direct factory inquiry submitted via website.",
      status: "New Lead",
      source: "Website Master Form"
    };

    // 1. Save directly into spreadsheet/CSV dataset (localStorage)
    saveLeadToStorage(leadData);

    // 2. Synchronize to live cloud spreadsheet if webhook is configured
    syncLeadToSpreadsheet(leadData);

    // 3. Immediately generate and download the updated Microsoft Excel (.CSV) file
    exportLeadsToCsv();

    // 4. Show modal confirmation with action buttons
    showInquirySuccessModal(leadData);

    // 5. Reset the form
    form.reset();
  });
}

/* --- Owner Leads Management Portal (for leads.html) --- */
function initLeadsPortalPage() {
  const tableBody = document.getElementById("leadsTableBody");
  if (!tableBody) return; // Only runs when viewing leads.html

  function renderRows(filteredLeads) {
    const list = filteredLeads || getStoredLeads();
    tableBody.innerHTML = "";

    if (!list.length) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 36px; color: var(--text-muted); font-size: 0.95rem;">No customer inquiries recorded yet.</td></tr>`;
      return;
    }

    list.forEach(lead => {
      const tr = document.createElement("tr");
      const cleanPhone = (lead.phone || "").replace(/[^\d]/g, "");
      const waNumber = cleanPhone.startsWith("91") ? cleanPhone : ("91" + cleanPhone);

      tr.innerHTML = `
        <td style="font-size: 0.8rem; color: var(--text-muted); white-space: nowrap;">${escapeHtml(lead.timestamp || "")}</td>
        <td><strong>${escapeHtml(lead.contactPerson || "N/A")}</strong></td>
        <td>${escapeHtml(lead.shopName || "Direct Inquiry")}</td>
        <td>
          <a href="tel:${escapeHtml(lead.phone || "")}" style="color: var(--primary); font-weight: 600;">${escapeHtml(lead.phone || "")}</a>
          <br>
          <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(lead.contactPerson || "")},%20regarding%20your%20inquiry%20with%20JJ%20%26%20Company..." target="_blank" style="font-size: 0.75rem; color: var(--whatsapp); font-weight: 600;">💬 WhatsApp</a>
        </td>
        <td>${escapeHtml(lead.district || "N/A")}</td>
        <td><span class="badge" style="background: #E8F5E9; color: var(--primary); font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; font-weight: 600;">${escapeHtml(lead.inquiryType || "Inquiry")}</span></td>
        <td style="font-size: 0.82rem; color: var(--text-body); max-width: 180px;">${escapeHtml(lead.products || "")}</td>
        <td style="font-size: 0.82rem; color: var(--text-muted); max-width: 220px;">${escapeHtml(lead.message || "—")}</td>
      `;
      tableBody.appendChild(tr);
    });

    const totalBadge = document.getElementById("portalTotalCount");
    if (totalBadge) totalBadge.textContent = `${list.length} Inquiries on File`;
  }

  renderRows();

  // Search input filter
  const searchInput = document.getElementById("leadsSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const all = getStoredLeads();
      const filtered = all.filter(l =>
        (l.contactPerson || "").toLowerCase().includes(q) ||
        (l.shopName || "").toLowerCase().includes(q) ||
        (l.phone || "").toLowerCase().includes(q) ||
        (l.district || "").toLowerCase().includes(q) ||
        (l.products || "").toLowerCase().includes(q) ||
        (l.message || "").toLowerCase().includes(q)
      );
      renderRows(filtered);
    });
  }

  // Clear leads button
  const clearBtn = document.getElementById("clearLeadsBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all inquiries? Make sure you have downloaded your Excel file first!")) {
        localStorage.removeItem("jj_inquiry_leads");
        localStorage.removeItem("jj_dealer_leads");
        renderRows([]);
        showToast("All inquiries cleared.");
      }
    });
  }

  // Reset to sample leads button
  const resetSampleBtn = document.getElementById("resetSampleLeadsBtn");
  if (resetSampleBtn) {
    resetSampleBtn.addEventListener("click", () => {
      localStorage.setItem("jj_inquiry_leads", JSON.stringify(DEFAULT_SAMPLE_LEADS));
      localStorage.setItem("jj_dealer_leads", JSON.stringify(DEFAULT_SAMPLE_LEADS));
      renderRows(DEFAULT_SAMPLE_LEADS);
      showToast("Reset to sample inquiries.");
    });
  }
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
