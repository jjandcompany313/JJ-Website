/**
 * JJ & COMPANY — CORE APPLICATION SCRIPT
 * Manages interactive components, filters, modals, drawer, and WhatsApp routing.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initWhatsAppLinks();
  initMasterInquiryForm();
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

  // Close drawer when any internal navigation link or button is clicked
  const drawerLinks = drawer.querySelectorAll("a, button:not(#mobileClose)");
  drawerLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
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

/* --- Master Inquiry Form & Direct Google Sheet Cloud Sync --- */

/**
 * Sends customer submission directly to the owner's Google Sheet webhook.
 * 100% confidential. Does not trigger any downloads or expose database records.
 */
async function sendToGoogleSheet(payload) {
  const webhookUrl = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.leadWebhookUrl) ? SITE_CONFIG.leadWebhookUrl.trim() : "";
  
  if (!webhookUrl) {
    console.warn("No Google Sheets webhook URL set in SITE_CONFIG.leadWebhookUrl.");
    return { success: false, reason: "No webhook URL configured" };
  }

  try {
    // Mode "no-cors" with text/plain prevents CORS preflight blocks from browsers to Google Apps Script
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (error) {
    console.error("Direct sheet sync error:", error);
    return { success: false, error: error };
  }
}

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Confidential Inquiry Confirmation Modal.
 * Displays simple thank you confirmation with WhatsApp quick-connect.
 * NEVER triggers downloads or displays customer database records.
 */
function showConfidentialSuccessModal(lead) {
  let modal = document.getElementById("inquirySuccessModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "inquirySuccessModal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  const waLeadMessage =
    `*NEW INQUIRY (From JJ & Company Website)*\n` +
    `👤 *Name:* ${lead.contactPerson}\n` +
    `🏢 *Business / Shop:* ${lead.shopName || "Direct Inquiry"}\n` +
    `📞 *Phone / WhatsApp:* ${lead.phone}\n` +
    `📍 *Location:* ${lead.district}\n` +
    `🎯 *Purpose:* ${lead.inquiryType}\n` +
    `🎨 *Products:* ${lead.products}\n` +
    `📝 *Message:* ${lead.message || "None"}`;

  const waUrl = getWhatsAppUrl(waLeadMessage);

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 480px; text-align: center; padding: 36px 28px;">
      <button class="modal-close" id="closeSuccessModalBtn" aria-label="Close" style="top: 14px; right: 16px;">&times;</button>
      <div style="width: 58px; height: 58px; border-radius: 50%; background: #E8F5E9; color: #058A5E; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 16px auto; font-weight: bold;">
        ✓
      </div>
      <h3 style="font-size: 1.4rem; color: var(--text-main); margin-bottom: 8px; font-weight: 800;">
        Inquiry Submitted Successfully!
      </h3>
      <p style="font-size: 0.92rem; color: var(--text-body); margin-bottom: 24px; line-height: 1.5;">
        Thank you, <strong>${escapeHtml(lead.contactPerson)}</strong>. Your requirement has been saved directly to our factory sales desk. Our team will contact you shortly with commercial rates.
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <a href="${waUrl}" target="_blank" class="btn btn-whatsapp btn-block btn-lg" style="justify-content: center;">
          💬 Connect Instantly on WhatsApp
        </a>
        <button id="closeModalActionBtn" class="btn btn-outline btn-block" style="justify-content: center;">
          Done
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");

  document.getElementById("closeSuccessModalBtn")?.addEventListener("click", () => {
    modal.classList.remove("open");
  });
  document.getElementById("closeModalActionBtn")?.addEventListener("click", () => {
    modal.classList.remove("open");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
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

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "Submit Inquiry";

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

    // Set UI to loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Submitting directly to sheet... ⏳";
    }

    const now = new Date();
    const formattedTimestamp = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });

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

    // Directly send data to Google Sheet webhook (100% confidential, NO downloads)
    await sendToGoogleSheet(leadData);

    // Reset form & restore button
    form.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    // Show confidential confirmation popup
    showConfidentialSuccessModal(leadData);
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
