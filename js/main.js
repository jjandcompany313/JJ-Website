/**
 * JJ & COMPANY — CORE APPLICATION SCRIPT
 * Manages interactive components, filters, modals, drawer, and WhatsApp routing.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initWhatsAppLinks();
  initDealershipForm();
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
  const phone = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappRaw) ? SITE_CONFIG.whatsappRaw : "919876543210";
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

/* --- Dealership Qualifying Lead Form --- */
function initDealershipForm() {
  const form = document.getElementById("dealerApplicationForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const shopName = document.getElementById("shopName")?.value || "";
    const contactPerson = document.getElementById("contactPerson")?.value || "";
    const district = document.getElementById("district")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
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

    // Build formatted message for WhatsApp lead capture
    const leadMessage =
      `*NEW DEALERSHIP INQUIRY (From Website)*
🏢 *Shop Name:* ${shopName}
👤 *Contact Person:* ${contactPerson}
📍 *City / District:* ${district}
📞 *Phone / WhatsApp:* ${phone}
📦 *Monthly Volume:* ${monthlyVolume}
🎨 *Products Interested In:* ${selectedProducts.join(", ") || "All Accessories"}
---------------------------
_Sent via JJ & Company Dealer Portal_`;

    const waUrl = getWhatsAppUrl(leadMessage);

    // Show visual confirmation modal or toast
    showToast("Application received! Redirecting to WhatsApp for instant verification...");

    setTimeout(() => {
      window.open(waUrl, "_blank");
      form.reset();
    }, 1200);
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
