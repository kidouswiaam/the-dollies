/**
 * Lumière Boutique — Main Application
 * Vanilla JS: catalog, filters, WhatsApp orders, UI interactions
 */
(function () {
  "use strict";

  const { shopName, whatsappPhone, currencySymbol, tagline, heroImage, social, email, phone, address, hours } =
    BOUTIQUE_CONFIG;

  let activeCategory = "All";
  let searchQuery = "";
  let sortOrder = "default";

  /* ─── WhatsApp ─────────────────────────────────────────── */

  /**
   * Generates a WhatsApp order link with pre-filled message.
   * @param {object} product
   * @param {number} [quantity=1]
   * @returns {string}
   */
  function buildWhatsAppOrderLink(product, quantity = 1) {
    const priceText = formatPrice(product.price);
    const promoLine = product.discount
      ? `${product.discount}% off`
      : "None";

    const message = [
      "Hello,",
      "",
      "I would like to order the following product:",
      "",
      `Product Name: ${product.name}`,
      `Price: ${priceText}`,
      `Promotion: ${promoLine}`,
      `Quantity: ${quantity}`,
      "",
      "Please confirm availability.",
      "",
      "Thank you.",
    ].join("\n");

    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  }

  function buildWhatsAppGeneralLink() {
    const message = `Hello,\n\nI have a question about ${shopName}.\n\nThank you.`;
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  }

  /* ─── Utilities ────────────────────────────────────────── */

  function formatPrice(amount) {
    const n = Number(amount);
    const formatted = n % 1 === 0 ? n.toFixed(0) : n.toFixed(2);
    return `${currencySymbol}${formatted}`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = String(str ?? "");
    return div.innerHTML;
  }

  function getStockLabel(stock) {
    const map = {
      "in-stock": { text: "In Stock", class: "stock--in" },
      "low-stock": { text: "Low Stock", class: "stock--low" },
      "out-of-stock": { text: "Sold Out", class: "stock--out" },
    };
    return map[stock] || map["in-stock"];
  }

  function getFilteredProducts() {
    let list = [...PRODUCTS];

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortOrder) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }

  function getPromoProducts() {
    return PRODUCTS.filter((p) => p.discount && p.discount > 0).slice(0, 4);
  }

  /* ─── Render: Product card ─────────────────────────────── */

  function createProductCard(product) {
    const stock = getStockLabel(product.stock);
    const isOut = product.stock === "out-of-stock";
    const hasDiscount = product.discount && product.oldPrice;

    const card = document.createElement("article");
    card.className = "product-card reveal";
    card.setAttribute("role", "listitem");
    card.dataset.category = product.category;

    card.innerHTML = `
      <div class="product-card__media">
        <img class="product-card__image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" width="400" height="500">
        ${hasDiscount ? `<span class="product-card__badge">-${product.discount}%</span>` : ""}
        <span class="product-card__stock ${stock.class}">${stock.text}</span>
      </div>
      <div class="product-card__body">
        <span class="product-card__category">${escapeHtml(product.category)}</span>
        <h3 class="product-card__name">${escapeHtml(product.name)}</h3>
        <p class="product-card__desc">${escapeHtml(product.description)}</p>
        <div class="product-card__pricing">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          ${hasDiscount ? `<span class="product-card__old">${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
        ${
          isOut
            ? `<button type="button" class="btn btn--order btn--disabled" disabled>Sold Out</button>`
            : `<a class="btn btn--order" href="${buildWhatsAppOrderLink(product)}" target="_blank" rel="noopener noreferrer">Order Now</a>`
        }
      </div>
    `;

    return card;
  }

  function createPromoCard(product) {
    const card = document.createElement("article");
    card.className = "promo-card reveal";
    const isOut = product.stock === "out-of-stock";

    card.innerHTML = `
      <div class="promo-card__media">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" width="320" height="400">
        <span class="promo-card__badge">Save ${product.discount}%</span>
      </div>
      <div class="promo-card__body">
        <h3>${escapeHtml(product.name)}</h3>
        <div class="promo-card__prices">
          <span class="promo-card__sale">${formatPrice(product.price)}</span>
          <span class="promo-card__old">${formatPrice(product.oldPrice)}</span>
        </div>
        ${
          isOut
            ? `<span class="promo-card__sold">Sold Out</span>`
            : `<a class="btn btn--primary btn--sm" href="${buildWhatsAppOrderLink(product)}" target="_blank" rel="noopener noreferrer">Order Now</a>`
        }
      </div>
    `;

    return card;
  }

  function createTestimonialCard(t) {
    const stars = "★".repeat(t.rating) + "☆".repeat(5 - t.rating);
    const card = document.createElement("blockquote");
    card.className = "testimonial-card reveal";
    card.innerHTML = `
      <div class="testimonial-card__stars" aria-label="${t.rating} out of 5 stars">${stars}</div>
      <p class="testimonial-card__text">"${escapeHtml(t.text)}"</p>
      <footer>
        <cite class="testimonial-card__name">${escapeHtml(t.name)}</cite>
        <span class="testimonial-card__role">${escapeHtml(t.role)}</span>
      </footer>
    `;
    return card;
  }

  /* ─── Render: Sections ───────────────────────────────── */

  function renderCatalog() {
    const grid = document.getElementById("product-grid");
    const empty = document.getElementById("catalog-empty");
    const countEl = document.getElementById("product-count");
    if (!grid) return;

    const products = getFilteredProducts();
    grid.replaceChildren();

    products.forEach((p) => grid.appendChild(createProductCard(p)));

    if (countEl) {
      countEl.textContent = `${products.length} product${products.length !== 1 ? "s" : ""}`;
    }

    if (empty) empty.hidden = products.length > 0;

    observeReveals(grid);
  }

  function renderCategoryFilters() {
    const container = document.getElementById("category-filters");
    if (!container) return;

    container.replaceChildren();
    CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `filter-btn${cat === activeCategory ? " filter-btn--active" : ""}`;
      btn.textContent = cat;
      btn.dataset.category = cat;
      btn.setAttribute("aria-pressed", cat === activeCategory ? "true" : "false");
      btn.addEventListener("click", () => {
        activeCategory = cat;
        container.querySelectorAll(".filter-btn").forEach((b) => {
          b.classList.toggle("filter-btn--active", b.dataset.category === cat);
          b.setAttribute("aria-pressed", b.dataset.category === cat ? "true" : "false");
        });
        renderCatalog();
      });
      container.appendChild(btn);
    });
  }

  function renderPromotions() {
    const grid = document.getElementById("promo-grid");
    if (!grid) return;
    grid.replaceChildren();
    getPromoProducts().forEach((p) => grid.appendChild(createPromoCard(p)));
    observeReveals(grid);
  }

  function renderTestimonials() {
    const grid = document.getElementById("testimonial-grid");
    if (!grid) return;
    grid.replaceChildren();
    TESTIMONIALS.forEach((t) => grid.appendChild(createTestimonialCard(t)));
    observeReveals(grid);
  }

  function renderValues() {
    const grid = document.getElementById("values-grid");
    if (!grid) return;
    grid.replaceChildren();
    BOUTIQUE_VALUES.forEach((v) => {
      const el = document.createElement("div");
      el.className = "value-card";
      el.innerHTML = `<h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.text)}</p>`;
      grid.appendChild(el);
    });
  }

  function renderContact() {
    const list = document.getElementById("contact-list");
    const wa = document.getElementById("contact-whatsapp");
    const addr = document.getElementById("contact-address");
    const hrs = document.getElementById("contact-hours");

    if (wa) wa.href = buildWhatsAppGeneralLink();
    if (addr) addr.textContent = address;
    if (hrs) hrs.textContent = hours;

    if (list) {
      list.innerHTML = `
        <li><strong>Email</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></li>
        <li><strong>Phone</strong> <a href="tel:${escapeHtml(phone.replace(/\D/g, ""))}">${escapeHtml(phone)}</a></li>
      `;
    }

    renderSocialLinks(document.getElementById("social-links"));
    renderSocialLinks(document.getElementById("footer-social"));
  }

  function renderSocialLinks(container) {
    if (!container || !social) return;
    const icons = {
      instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
      facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
      pinterest: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>`,
    };

    container.replaceChildren();
    Object.entries(social).forEach(([name, url]) => {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "social-link";
      a.setAttribute("aria-label", name);
      a.innerHTML = icons[name] || name;
      container.appendChild(a);
    });
  }

  function initStaticContent() {
    const taglineEl = document.getElementById("hero-tagline");
    const heroImg = document.getElementById("hero-image");
    const footerTag = document.getElementById("footer-tagline");
    const footerName = document.getElementById("footer-shop-name");
    const year = document.getElementById("year");

    if (taglineEl) taglineEl.textContent = tagline;
    if (heroImg) heroImg.src = heroImage;
    if (footerTag) footerTag.textContent = tagline;
    if (footerName) footerName.textContent = shopName;
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ─── UI: Loader ───────────────────────────────────────── */

  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("loader--hidden");
        document.body.classList.remove("is-loading");
      }, 600);
    });
    document.body.classList.add("is-loading");
  }

  /* ─── UI: Theme ────────────────────────────────────────── */

  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const saved = localStorage.getItem("lumiere-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", theme);

    toggle?.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("lumiere-theme", next);
    });
  }

  /* ─── UI: Navigation ───────────────────────────────────── */

  function initMobileNav() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;

    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      nav.hidden = true;
      document.body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      nav.hidden = open;
      document.body.classList.toggle("nav-open", !open);
    });

    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("header--scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        const show = window.scrollY > 500;
        btn.hidden = !show;
        btn.classList.toggle("back-to-top--visible", show);
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ─── UI: Catalog controls ─────────────────────────────── */

  function initCatalogControls() {
    const search = document.getElementById("search-input");
    const sort = document.getElementById("sort-select");

    search?.addEventListener(
      "input",
      debounce((e) => {
        searchQuery = e.target.value;
        renderCatalog();
      }, 250)
    );

    sort?.addEventListener("change", (e) => {
      sortOrder = e.target.value;
      renderCatalog();
    });
  }

  function debounce(fn, ms) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  /* ─── UI: Scroll reveal ────────────────────────────────── */

  let revealObserver;

  function observeReveals(root) {
    if (!revealObserver) return;
    root.querySelectorAll(".reveal:not(.reveal--visible)").forEach((el) => {
      revealObserver.observe(el);
    });
  }

  function initScrollReveal() {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  }

  /* ─── Boot ─────────────────────────────────────────────── */

  function init() {
    initStaticContent();
    renderCategoryFilters();
    renderCatalog();
    renderPromotions();
    renderValues();
    renderTestimonials();
    renderContact();
    initLoader();
    initTheme();
    initMobileNav();
    initHeaderScroll();
    initBackToTop();
    initCatalogControls();
    initScrollReveal();
  }

  document.addEventListener("DOMContentLoaded", init);

  window.buildWhatsAppOrderLink = buildWhatsAppOrderLink;
})();
