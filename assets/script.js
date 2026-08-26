const PRODUCTS = [
  {
    id: "75cl",
    size: "75cl",
    name: "AKU Palm Oil",
    price: 2000,
    image: "5FF6924E-8FF0-4184-97F5-38931B2B46DA.png",
    description: "A convenient everyday size for authentic Nigerian cooking."
  },
  {
    id: "1l",
    size: "1L",
    name: "AKU Palm Oil",
    price: 3500,
    image: "15576FB6-156F-45C5-89E8-86CD2FB48763.png",
    description: "A practical everyday size for home kitchens."
  },
  {
    id: "5l",
    size: "5L",
    name: "AKU Palm Oil",
    price: 15500,
    image: "05048BC9-559B-45CC-90D1-89576104A9A2.png",
    description: "Our family-size choice for regular household cooking.",
    badge: "BEST SELLER"
  },
  {
    id: "25l",
    size: "25L",
    name: "AKU Palm Oil",
    price: 58000,
    image: "D72F9DAE-C44A-49A8-9386-DE6A245B2FF1.png",
    description: "For restaurants, retailers and larger requirements.",
    badge: "BULK SUPPLY"
  }
];

const LOGO = "Professional Logo for Aku Palm Oil - 1.jpeg";

const WHATSAPP = "2347062103875";
const PHONE = "08140935511";
const EMAIL = "sales.akupalm@gmail.com";

const app = document.getElementById("app");

let cart = JSON.parse(localStorage.getItem("akuCart") || "{}");


function money(value) {
  return `₦${value.toLocaleString("en-NG")}`;
}


function saveCart() {
  localStorage.setItem("akuCart", JSON.stringify(cart));
}


function cartCount() {
  return Object.values(cart).reduce((total, qty) => total + qty, 0);
}


function cartTotal() {
  return PRODUCTS.reduce(
    (total, product) =>
      total + (cart[product.id] || 0) * product.price,
    0
  );
}


function getProduct(id) {
  return PRODUCTS.find(product => product.id === id);
}


/* =========================
   ICONS
========================= */

function icon(name) {

  const icons = {

    home: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 10.5 12 3l9 7.5"/>
        <path d="M5 9.5V21h14V9.5"/>
        <path d="M9 21v-6h6v6"/>
      </svg>
    `,

    shop: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 10h16v10H4z"/>
        <path d="M3 10 5 4h14l2 6"/>
      </svg>
    `,

    cart: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 4h2l2.1 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.5L20 8H6"/>
        <circle cx="10" cy="20" r="1"/>
        <circle cx="18" cy="20" r="1"/>
      </svg>
    `,

    search: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round">
        <circle cx="11" cy="11" r="7"/>
        <path d="m20 20-4-4"/>
      </svg>
    `,

    phone: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round">
        <path d="M6.6 3.5 9 3l2 5-2.2 1.7a15 15 0 0 0 5.5 5.5L16 13l5 2v2.4a3 3 0 0 1-3.3 3A17.8 17.8 0 0 1 3.6 6.8 3 3 0 0 1 6.6 3.5Z"/>
      </svg>
    `,

    message: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3-.5L4 20l1.5-4A7.5 7.5 0 1 1 20 11.5Z"/>
      </svg>
    `,

    mail: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <path d="m4 7 8 6 8-6"/>
      </svg>
    `,

    plus: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2"
      stroke-linecap="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    `,

    minus: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2"
      stroke-linecap="round">
        <path d="M5 12h14"/>
      </svg>
    `,

    close: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round">
        <path d="m6 6 12 12M18 6 6 18"/>
      </svg>
    `,

    arrow: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"/>
        <path d="m13 6 6 6-6 6"/>
      </svg>
    `,

    back: `
      <svg viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    `
  };

  return icons[name] || "";
}


/* =========================
   HEADER
========================= */

function header() {

  return `
    <header class="topbar">

      <button class="brand" onclick="navigate('home')">

        <img
          src="${LOGO}"
          alt="AKU Palm Oil"
          style="
            width:42px;
            height:42px;
            object-fit:cover;
            border-radius:9px;
          "
        >

        <span class="brand-copy">
          AKU
          <small>PALM OIL</small>
        </span>

      </button>

      <div class="header-actions">

        <button
          class="icon-button"
          onclick="navigate('search')">
          ${icon("search")}
        </button>

        <button
          class="icon-button"
          onclick="openCart()">
          ${icon("cart")}
        </button>

      </div>

    </header>
  `;
}


/* =========================
   PRODUCT CARD
========================= */

function productCard(product) {

  return `
    <article class="product-card">

      <button
        style="
          display:block;
          width:100%;
          background:none;
          text-align:left;
        "
        onclick="openProduct('${product.id}')">

        <div class="product-image">

          ${
            product.badge
              ? `<span class="product-badge">${product.badge}</span>`
              : ""
          }

          <img
            src="${product.image}"
            alt="${product.name} ${product.size}"
          >

        </div>

      </button>

      <div class="product-info">

        <div class="product-size">
          ${product.size}
        </div>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-footer">

          <strong class="product-price">
            ${money(product.price)}
          </strong>

          <button
            class="add-button"
            onclick="addToCart('${product.id}')">
            ${icon("plus")}
          </button>

        </div>

      </div>

    </article>
  `;
}


/* =========================
   BOTTOM NAV
========================= */

function bottomNav(active) {

  return `
    <nav class="bottom-nav">

      <button
        class="nav-item ${active === "home" ? "active" : ""}"
        onclick="navigate('home')">
        ${icon("home")}
        <span>Home</span>
      </button>

      <button
        class="nav-item ${active === "shop" ? "active" : ""}"
        onclick="navigate('shop')">
        ${icon("shop")}
        <span>Shop</span>
      </button>

      <button
        class="nav-item"
        onclick="openCart()">
        ${icon("cart")}
        <span>
          Cart ${cartCount() ? `(${cartCount()})` : ""}
        </span>
      </button>

      <button
        class="nav-item ${active === "contact" ? "active" : ""}"
        onclick="navigate('contact')">
        ${icon("phone")}
        <span>Contact</span>
      </button>

    </nav>
  `;
}


/* =========================
   HOME
========================= */

function renderHome() {

  return `
    <div class="screen">

      ${header()}

      <main>

        <section class="container hero">

          <div class="hero-copy">

            <div class="kicker">
              PURE HERITAGE PALM OIL
            </div>

            <h1>
              Rich taste.<br>
              <span>Real tradition.</span>
            </h1>

            <p>
              Premium palm oil for Nigerian homes,
              restaurants and kitchens that care about
              authentic taste.
            </p>

            <div class="actions">

              <button
                class="btn btn-primary"
                onclick="navigate('shop')">
                Shop AKU
                ${icon("arrow")}
              </button>

              <button
                class="btn btn-outline"
                onclick="navigate('shop')">
                Order directly
              </button>

            </div>

          </div>


          <div class="hero-visual">

            <div class="hero-brand-word">
              AKU PALM OIL
            </div>

            <img
              class="hero-product"
              src="05048BC9-559B-45CC-90D1-89576104A9A2.png"
              alt="AKU Palm Oil 5 Litres"
            >

            <div class="hero-bottom">

              <div>
                <strong>5 LITRES</strong>
              </div>

              <span>
                RICH IN TASTE<br>
                RICH IN TRADITION
              </span>

            </div>

          </div>

        </section>


        <section class="container section">

          <div class="section-head">

            <div>
              <div class="kicker">
                THE COLLECTION
              </div>

              <h2>
                Choose your size.
              </h2>
            </div>

            <button
              class="btn btn-outline"
              onclick="navigate('shop')">
              View all
            </button>

          </div>

          <div class="product-grid">
            ${PRODUCTS.map(productCard).join("")}
          </div>

        </section>


        <section class="container section">

          <div class="feature">

            <div>

              <div
                class="kicker"
                style="color:#b08a43">
                BUSINESS & BULK
              </div>

              <h2>
                Stock AKU<br>
                with confidence.
              </h2>

              <p>
                Supply for restaurants, caterers,
                retailers and larger requirements.
              </p>

            </div>

            <button
              class="btn btn-red"
              onclick="navigate('wholesale')">
              Business supply
              ${icon("arrow")}
            </button>

          </div>

        </section>

      </main>

      ${bottomNav("home")}

    </div>
  `;
}


/* =========================
   SHOP
========================= */

function renderShop() {

  return `
    <div class="screen">

      ${header()}

      <main class="container">

        <section class="screen-title">

          <div class="kicker">
            THE AKU COLLECTION
          </div>

          <h1>
            Choose your<br>
            <span>size.</span>
          </h1>

          <p>
            Four sizes. One standard of quality.
          </p>

        </section>

        <div class="product-grid">
          ${PRODUCTS.map(productCard).join("")}
        </div>

      </main>

      ${bottomNav("shop")}

    </div>
  `;
}


/* =========================
   STORY
========================= */

function renderStory() {

  return `
    <div class="screen">

      ${header()}

      <main class="container">

        <section class="screen-title">

          <div class="kicker">
            THE AKU STANDARD
          </div>

          <h1>
            Tradition,<br>
            <span>made modern.</span>
          </h1>

          <p>
            A premium palm oil experience built around
            taste, trust and a clear identity.
          </p>

        </section>


        <section class="story-grid">

          <article class="story-card dark">

            <div class="kicker" style="color:#b08a43">
              01 — TASTE
            </div>

            <h2>
              Rich colour.<br>
              Deep character.
            </h2>

            <p>
              AKU is made for dishes where authentic
              palm oil taste matters.
            </p>

          </article>


          <article class="story-card">

            <div class="kicker">
              02 — PURPOSE
            </div>

            <h2>
              Made for<br>
              real kitchens.
            </h2>

            <p>
              From everyday home cooking to professional
              kitchens and larger food businesses.
            </p>

          </article>


          <article class="story-card">

            <div class="kicker">
              03 — EXPERIENCE
            </div>

            <h2>
              Simple<br>
              ordering.
            </h2>

            <p>
              Browse, choose your size and contact AKU
              directly through WhatsApp, phone or email.
            </p>

          </article>


          <article class="story-card dark">

            <div class="kicker" style="color:#b08a43">
              04 — AKU
            </div>

            <h2>
              Pure heritage.<br>
              Clear identity.
            </h2>

            <p>
              A modern presentation for a product rooted
              in Nigerian food culture.
            </p>

          </article>

        </section>

      </main>

      ${bottomNav("story")}

    </div>
  `;
}


/* =========================
   CONTACT
========================= */

function renderContact() {

  return `
    <div class="screen">

      ${header()}

      <main class="container">

        <section class="screen-title">

          <div class="kicker">
            ORDER & SUPPORT
          </div>

          <h1>
            Let's get your<br>
            <span>order moving.</span>
          </h1>

          <p>
            Choose the quickest way to reach AKU Palm Oil.
          </p>

        </section>


        <section class="contact-grid">

          <article class="contact-card">

            <div class="contact-icon">
              ${icon("message")}
            </div>

            <h3>WhatsApp</h3>

            <p>
              Send your order directly to AKU.
            </p>

            <button
              class="btn btn-primary"
              onclick="sendWhatsApp()">
              Order on WhatsApp
            </button>

          </article>


          <article class="contact-card">

            <div class="contact-icon">
              ${icon("phone")}
            </div>

            <h3>Phone</h3>

            <p>
              Speak directly with AKU.
            </p>

            <a
              class="btn btn-outline"
              href="tel:${PHONE}">
              Call AKU
            </a>

          </article>


          <article class="contact-card">

            <div class="contact-icon">
              ${icon("mail")}
            </div>

            <h3>Email</h3>

            <p>
              Send a detailed order or enquiry.
            </p>

            <button
              class="btn btn-outline"
              onclick="sendEmail()">
              Email AKU
            </button>

          </article>

        </section>

      </main>

      ${bottomNav("contact")}

    </div>
  `;
}


/* =========================
   WHOLESALE
========================= */

function renderWholesale() {

  return `
    <div class="screen">

      ${header()}

      <main class="container">

        <section class="screen-title">

          <div class="kicker">
            BUSINESS & BULK
          </div>

          <h1>
            Stock AKU<br>
            <span>with confidence.</span>
          </h1>

          <p>
            Business supply for restaurants, caterers,
            retailers and food businesses.
          </p>

        </section>


        <div class="feature">

          <div>

            <div
              class="kicker"
              style="color:#b08a43">
              25 LITRES
            </div>

            <h2>
              ₦58,000
            </h2>

            <p>
              Our bulk-size option for larger requirements.
            </p>

          </div>

          <button
            class="btn btn-red"
            onclick="sendBulkWhatsApp()">
            Request bulk supply
          </button>

        </div>

      </main>

    </div>
  `;
}


/* =========================
   SEARCH
========================= */

function renderSearch() {

  return `
    <div class="screen">

      <header class="topbar">

        <button
          class="icon-button"
          onclick="navigate('home')">
          ${icon("back")}
        </button>

        <strong>Search AKU</strong>

        <div style="width:42px"></div>

      </header>

      <main
        class="container"
        style="padding-top:22px">

        <div class="search-input-wrap">

          ${icon("search")}

          <input
            id="searchInput"
            class="search-input"
            type="search"
            placeholder="Search products..."
            oninput="runSearch(this.value)"
          >

        </div>

        <div
          id="searchResults"
          class="product-grid"
          style="margin-top:18px">

          ${PRODUCTS.map(productCard).join("")}

        </div>

      </main>

    </div>
  `;
}


/* =========================
   PRODUCT DETAIL
========================= */

function openProduct(id) {

  const product = getProduct(id);

  if (!product) return;

  app.innerHTML = `

    <div class="screen">

      <header class="topbar">

        <button
          class="icon-button"
          onclick="navigate('shop')">
          ${icon("back")}
        </button>

        <strong>AKU PALM OIL</strong>

        <button
          class="icon-button"
          onclick="openCart()">
          ${icon("cart")}
        </button>

      </header>


      <main class="container">

        <section style="padding:24px 0">

          <div
            class="product-image"
            style="
              height:min(620px,65vh);
              border-radius:14px;
            ">

            <img
              src="${product.image}"
              alt="${product.name}"
            >

          </div>


          <div style="padding:24px 0">

            <div class="kicker">
              ${product.size}
            </div>

            <h1
              style="
                margin-top:9px;
                font-size:42px;
                line-height:1;
              ">
              ${product.name}
            </h1>

            <div
              style="
                margin-top:13px;
                font-size:23px;
                font-weight:900;
              ">
              ${money(product.price)}
            </div>

            <p
              style="
                margin-top:13px;
                color:var(--muted);
                line-height:1.7;
              ">
              ${product.description}
            </p>

            <div class="actions">

              <button
                class="btn btn-primary"
                onclick="addToCart('${product.id}')">
                Add to cart
              </button>

              <button
                class="btn btn-red"
                onclick="buyNow('${product.id}')">
                Order on WhatsApp
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  `;
}


/* =========================
   NAVIGATION
========================= */

function navigate(screen) {

  if (screen === "home") {
    app.innerHTML = renderHome();
  }

  if (screen === "shop") {
    app.innerHTML = renderShop();
  }

  if (screen === "story") {
    app.innerHTML = renderStory();
  }

  if (screen === "contact") {
    app.innerHTML = renderContact();
  }

  if (screen === "wholesale") {
    app.innerHTML = renderWholesale();
  }

  if (screen === "search") {
    app.innerHTML = renderSearch();
  }

  window.scrollTo(0, 0);
}


/* =========================
   CART
========================= */

function addToCart(id) {

  cart[id] = (cart[id] || 0) + 1;

  saveCart();

  showToast("Added to your order");
}


function buyNow(id) {

  cart[id] = (cart[id] || 0) + 1;

  saveCart();

  sendWhatsApp();
}


function openCart() {

  const items =
    PRODUCTS.filter(product => cart[product.id]);

  const html = `

    <div
      class="sheet-overlay open"
      onclick="closeSheet()">
    </div>

    <section class="bottom-sheet open">

      <div class="sheet-handle"></div>

      <div class="sheet-header">

        <h2>Your order</h2>

        <button
          class="icon-button"
          onclick="closeSheet()">
          ${icon("close")}
        </button>

      </div>

      <div class="sheet-content">

        ${
          items.length
            ? items.map(product => `

              <div class="cart-item">

                <div class="cart-thumb">
                  <img src="${product.image}">
                </div>

                <div>

                  <h4>
                    ${product.size} — ${product.name}
                  </h4>

                  <p>
                    ${money(product.price)}
                  </p>

                  <div class="quantity">

                    <button
                      onclick="changeCart('${product.id}',-1)">
                      ${icon("minus")}
                    </button>

                    <strong>
                      ${cart[product.id]}
                    </strong>

                    <button
                      onclick="changeCart('${product.id}',1)">
                      ${icon("plus")}
                    </button>

                  </div>

                </div>

              </div>

            `).join("")
            :
            `
              <div class="empty-state">
                Your order is empty.
              </div>
            `
        }

        ${
          items.length
            ? `
              <div class="cart-total">

                <span>Total</span>

                <strong>
                  ${money(cartTotal())}
                </strong>

              </div>

              <button
                class="btn btn-primary"
                style="width:100%"
                onclick="sendWhatsApp()">
                Order on WhatsApp
                ${icon("arrow")}
              </button>
            `
            : ""
        }

      </div>

    </section>
  `;

  const wrapper = document.createElement("div");

  wrapper.innerHTML = html;

  document.body.appendChild(wrapper);
}


function changeCart(id, amount) {

  cart[id] = (cart[id] || 0) + amount;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  saveCart();

  closeSheet();

  setTimeout(openCart, 100);
}


/* =========================
   WHATSAPP
========================= */

function sendWhatsApp() {

  let message =
    "Hello AKU Palm Oil, I would like to place an order.%0A%0A";

  PRODUCTS.forEach(product => {

    if (cart[product.id]) {

      message +=
        `${product.size} × ${cart[product.id]} — ${money(
          product.price * cart[product.id]
        )}%0A`;
    }

  });

  message += `%0ATotal: ${money(cartTotal())}`;

  window.open(
    `https://wa.me/${WHATSAPP}?text=${message}`,
    "_blank"
  );
}


/* =========================
   EMAIL
========================= */

function sendEmail() {

  let body =
    "Hello AKU Palm Oil,%0A%0AI would like to place an order.%0A%0A";

  PRODUCTS.forEach(product => {

    if (cart[product.id]) {

      body +=
        `${product.size} x ${cart[product.id]} — ${money(
          product.price * cart[product.id]
        )}%0A`;
    }

  });

  body += `%0ATotal: ${money(cartTotal())}`;

  window.location.href =
    `mailto:${EMAIL}?subject=AKU%20Palm%20Oil%20Order&body=${body}`;
}


/* =========================
   BULK WHATSAPP
========================= */

function sendBulkWhatsApp() {

  const message =
    "Hello AKU Palm Oil, I am interested in bulk/business supply. Please send me your available options.";

  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}


/* =========================
   SEARCH
========================= */

function runSearch(value) {

  const query =
    value.toLowerCase().trim();

  const results =
    PRODUCTS.filter(product =>
      product.size.toLowerCase().includes(query) ||
      product.name.toLowerCase().includes(query)
    );

  const container =
    document.getElementById("searchResults");

  if (!container) return;

  container.innerHTML =
    results.length
      ? results.map(productCard).join("")
      : `
        <div
          class="empty-state"
          style="grid-column:1/-1">
          No AKU products found.
        </div>
      `;
}


/* =========================
   SHEET
========================= */

function closeSheet() {

  document
    .querySelectorAll(".sheet-overlay, .bottom-sheet")
    .forEach(element => {

      const parent = element.parentElement;

      if (parent && parent !== document.body) {
        parent.remove();
      } else {
        element.remove();
      }

    });
}


/* =========================
   TOAST
========================= */

function showToast(message) {

  const toast =
    document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.remove();
  }, 1800);
}


/* =========================
   START APP
========================= */

navigate("home");
