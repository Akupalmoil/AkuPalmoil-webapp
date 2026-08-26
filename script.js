/* AKU PALM OIL — MAIN APP
   Mobile-first premium storefront
*/

const PRODUCTS = [
  {
    id: "75cl",
    name: "AKU Palm Oil",
    size: "75cl",
    price: 2000,
    image: "15576FB6-156F-45C5-89E8-86CD2FB48763.png"
  },
  {
    id: "1l",
    name: "AKU Palm Oil",
    size: "1 Litre",
    price: 2900,
    image: "5FF6924E-8FF0-4184-97F5-38931B2B46DA.png"
  },
  {
    id: "5l",
    name: "AKU Palm Oil",
    size: "5 Litres",
    price: 12600,
    image: "05048BC9-559B-45CC-90D1-89576104A9A2.png"
  },
  {
    id: "25l",
    name: "AKU Palm Oil",
    size: "25 Litres",
    price: 51000,
    image: "D72F9DAE-C44A-49A8-9386-DE6A245B2FF1.png"
  }
];

const CONTACT = {
  whatsapp: "2347062103875",
  phone: "08140935511",
  email: "orders@akupalmoil.com"
};

let cart = JSON.parse(localStorage.getItem("akuCart") || "[]");
let currentScreen = "home";

function money(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(value);
}

function saveCart() {
  localStorage.setItem("akuCart", JSON.stringify(cart));
}

function cartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function cartTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function getProduct(id) {
  return PRODUCTS.find(product => product.id === id);
}

function addToCart(id) {
  const product = getProduct(id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      size: product.size,
      price: product.price,
      quantity: 1
    });
  }

  saveCart();
  render();
  openOrderSheet(product.id);
}

function increase(id) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += 1;
  saveCart();
  render();
}

function decrease(id) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter(cartItem => cartItem.id !== id);
  }

  saveCart();
  render();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  render();
}

function navigate(screen) {
  currentScreen = screen;
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  render();
}

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          src="${product.image}"
          alt="${product.size} AKU Palm Oil"
          class="product-image"
          loading="lazy"
        />
      </div>

      <div class="product-info">
        <span class="product-size">${product.size}</span>

        <h3>${product.name}</h3>

        <div class="product-bottom">
          <strong>${money(product.price)}</strong>

          <button
            class="icon-button"
            aria-label="Add ${product.size} to cart"
            onclick="addToCart('${product.id}')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function homeScreen() {
  return `
    <section class="screen home-screen">
      <div class="hero">
        <div class="hero-copy">
          <span class="eyebrow">AKU PALM OIL</span>

          <h1>
            Pure heritage.
            <br>
            Rich tradition.
          </h1>

          <p>
            Premium palm oil made for the food, memories
            and traditions that matter.
          </p>

          <div class="hero-actions">
            <button class="primary-button" onclick="navigate('shop')">
              Shop AKU
            </button>

            <button class="secondary-button" onclick="navigate('story')">
              Our story
            </button>
          </div>
        </div>
      </div>

      <div class="section-header">
        <div>
          <span class="eyebrow">THE COLLECTION</span>
          <h2>Choose your size.</h2>
        </div>

        <button class="text-button" onclick="navigate('shop')">
          View all
        </button>
      </div>

      <div class="product-grid">
        ${PRODUCTS.map(productCard).join("")}
      </div>

      <section class="bulk-section">
        <span class="eyebrow">FOR FAMILIES & BUSINESS</span>
        <h2>Buying in quantity?</h2>
        <p>
          For restaurants, retailers, events and larger orders,
          talk directly with the AKU team.
        </p>

        <button
          class="primary-button"
          onclick="openBulkOrder()"
        >
          Bulk orders
        </button>
      </section>
    </section>
  `;
}

function shopScreen() {
  return `
    <section class="screen">
      <div class="page-heading">
        <span class="eyebrow">SHOP</span>
        <h1>The AKU collection.</h1>
        <p>Choose your preferred size and order directly.</p>
      </div>

      <div class="product-grid shop-grid">
        ${PRODUCTS.map(productCard).join("")}
      </div>

      <section class="bulk-section">
        <span class="eyebrow">WHOLESALE</span>
        <h2>Need more?</h2>
        <p>
          We handle larger quantities for retailers,
          restaurants, caterers and businesses.
        </p>

        <button class="primary-button" onclick="openBulkOrder()">
          Talk to us
        </button>
      </section>
    </section>
  `;
}

function storyScreen() {
  return `
    <section class="screen story-screen">
      <div class="page-heading">
        <span class="eyebrow">OUR STORY</span>
        <h1>Rich in taste.<br>Rich in tradition.</h1>
      </div>

      <div class="story-block">
        <div class="story-mark">AKU</div>

        <p>
          AKU Palm Oil is built around a simple idea:
          good food begins with good ingredients.
        </p>

        <p>
          Our palm oil brings the deep colour, aroma and
          character people expect from authentic Nigerian cooking.
        </p>

        <p>
          From everyday family meals to special occasions,
          AKU is made to be part of the moments that bring
          people together.
        </p>
      </div>

      <div class="values-grid">
        <div class="value-card">
          <span>01</span>
          <h3>Pure</h3>
          <p>Natural palm oil with no unnecessary additives.</p>
        </div>

        <div class="value-card">
          <span>02</span>
          <h3>Trusted</h3>
          <p>Carefully prepared and packaged for your kitchen.</p>
        </div>

        <div class="value-card">
          <span>03</span>
          <h3>Heritage</h3>
          <p>A taste connected to Nigerian food tradition.</p>
        </div>
      </div>
    </section>
  `;
}

function contactScreen() {
  return `
    <section class="screen contact-screen">
      <div class="page-heading">
        <span class="eyebrow">CONTACT</span>
        <h1>Order directly.</h1>
        <p>
          Choose the easiest way to reach the AKU team.
        </p>
      </div>

      <div class="contact-list">

        <button
          class="contact-row"
          onclick="openWhatsApp()"
        >
          <span class="contact-icon">
            ${whatsappIcon()}
          </span>

          <span>
            <strong>WhatsApp</strong>
            <small>Send us your order</small>
          </span>

          ${arrowIcon()}
        </button>

        <button
          class="contact-row"
          onclick="callAKU()"
        >
          <span class="contact-icon">
            ${phoneIcon()}
          </span>

          <span>
            <strong>Call AKU</strong>
            <small>${CONTACT.phone}</small>
          </span>

          ${arrowIcon()}
        </button>

        <button
          class="contact-row"
          onclick="emailAKU()"
        >
          <span class="contact-icon">
            ${mailIcon()}
          </span>

          <span>
            <strong>Email</strong>
            <small>Send an order by email</small>
          </span>

          ${arrowIcon()}
        </button>

      </div>

      <div class="contact-note">
        <span class="eyebrow">AKU PALM OIL</span>
        <p>Natural. Pure. Trusted.</p>
      </div>
    </section>
  `;
}

function cartScreen() {
  if (!cart.length) {
    return `
      <section class="screen empty-cart">
        <div class="empty-icon">
          ${bagIcon()}
        </div>

        <span class="eyebrow">YOUR CART</span>

        <h1>Your cart is empty.</h1>

        <p>
          Add your favourite AKU Palm Oil size to get started.
        </p>

        <button class="primary-button" onclick="navigate('shop')">
          Shop now
        </button>
      </section>
    `;
  }

  return `
    <section class="screen cart-screen">
      <div class="page-heading">
        <span class="eyebrow">YOUR ORDER</span>
        <h1>Your cart.</h1>
      </div>

      <div class="cart-list">
        ${cart.map(item => `
          <div class="cart-row">

            <div class="cart-details">
              <strong>${item.name}</strong>
              <span>${item.size}</span>
              <small>${money(item.price)}</small>
            </div>

            <div class="quantity-control">
              <button onclick="decrease('${item.id}')">−</button>
              <span>${item.quantity}</span>
              <button onclick="increase('${item.id}')">+</button>
            </div>

            <button
              class="remove-button"
              onclick="removeItem('${item.id}')"
              aria-label="Remove item"
            >
              ${closeIcon()}
            </button>

          </div>
        `).join("")}
      </div>

      <div class="cart-summary">
        <div>
          <span>Total</span>
          <strong>${money(cartTotal())}</strong>
        </div>

        <button
          class="primary-button full-button"
          onclick="openCartOrder()"
        >
          Order now
        </button>
      </div>
    </section>
  `;
}

function navigationBar() {
  return `
    <nav class="bottom-nav">

      <button
        class="${currentScreen === "home" ? "active" : ""}"
        onclick="navigate('home')"
      >
        ${homeIcon()}
        <span>Home</span>
      </button>

      <button
        class="${currentScreen === "shop" ? "active" : ""}"
        onclick="navigate('shop')"
      >
        ${bagIcon()}
        <span>Shop</span>
      </button>

      <button
        class="${currentScreen === "story" ? "active" : ""}"
        onclick="navigate('story')"
      >
        ${storyIcon()}
        <span>Story</span>
      </button>

      <button
        class="${currentScreen === "contact" ? "active" : ""}"
        onclick="navigate('contact')"
      >
        ${phoneIcon()}
        <span>Contact</span>
      </button>

    </nav>
  `;
}

function header() {
  return `
    <header class="topbar">

      <button
        class="brand"
        onclick="navigate('home')"
        aria-label="AKU Palm Oil home"
      >
        <span class="brand-mark">AKU</span>
        <span>PALM OIL</span>
      </button>

      <div class="header-actions">

        <button
          class="header-icon"
          onclick="navigate('cart')"
          aria-label="Shopping cart"
        >
          ${bagIcon()}

          ${cartCount() > 0
            ? `<span class="cart-badge">${cartCount()}</span>`
            : ""
          }
        </button>

        <button
          class="header-icon"
          onclick="openWhatsApp()"
          aria-label="WhatsApp"
        >
          ${whatsappIcon()}
        </button>

      </div>
    </header>
  `;
}

function render() {
  const app = document.getElementById("app");

  if (!app) return;

  let content = "";

  switch (currentScreen) {
    case "shop":
      content = shopScreen();
      break;

    case "story":
      content = storyScreen();
      break;

    case "contact":
      content = contactScreen();
      break;

    case "cart":
      content = cartScreen();
      break;

    default:
      content = homeScreen();
  }

  app.innerHTML = `
    ${header()}
    <main class="page">
      ${content}
    </main>
    ${navigationBar()}
    <div id="sheet-root"></div>
  `;

  updateSheet();
}

function openOrderSheet(productId) {
  const product = getProduct(productId);

  if (!product) return;

  const root = document.getElementById("sheet-root");

  if (!root) return;

  root.innerHTML = `
    <div class="sheet-backdrop" onclick="closeSheet()"></div>

    <section class="bottom-sheet">

      <div class="sheet-handle"></div>

      <div class="sheet-header">
        <div>
          <span class="eyebrow">ADDED TO CART</span>
          <h2>${product.size}</h2>
        </div>

        <button onclick="closeSheet()">
          ${closeIcon()}
        </button>
      </div>

      <div class="sheet-product">
        <strong>${product.name}</strong>
        <span>${money(product.price)}</span>
      </div>

      <div class="sheet-actions">

        <button
          class="primary-button full-button"
          onclick="openCartOrder()"
        >
          Continue to order
        </button>

        <button
          class="secondary-button full-button"
          onclick="openWhatsApp()"
        >
          Order on WhatsApp
        </button>

      </div>
    </section>
  `;

  requestAnimationFrame(() => {
    root.classList.add("sheet-open");
  });
}

function openBulkOrder() {
  const root = document.getElementById("sheet-root");

  if (!root) return;

  root.innerHTML = `
    <div class="sheet-backdrop" onclick="closeSheet()"></div>

    <section class="bottom-sheet">

      <div class="sheet-handle"></div>

      <div class="sheet-header">
        <div>
          <span class="eyebrow">BULK ORDERS</span>
          <h2>Let's talk quantity.</h2>
        </div>

        <button onclick="closeSheet()">
          ${closeIcon()}
        </button>
      </div>

      <p class="sheet-copy">
        Tell us what you need and our team will help
        with your larger order.
      </p>

      <div class="sheet-actions">

        <button
          class="primary-button full-button"
          onclick="openWhatsApp('I would like to make a bulk order for AKU Palm Oil.')"
        >
          WhatsApp us
        </button>

        <button
          class="secondary-button full-button"
          onclick="callAKU()"
        >
          Call AKU
        </button>

      </div>
    </section>
  `;

  requestAnimationFrame(() => {
    root.classList.add("sheet-open");
  });
}

function openCartOrder() {
  if (!cart.length) return;

  const orderText = buildOrderText();

  const root = document.getElementById("sheet-root");

  if (!root) return;

  root.innerHTML = `
    <div class="sheet-backdrop" onclick="closeSheet()"></div>

    <section class="bottom-sheet order-sheet">

      <div class="sheet-handle"></div>

      <div class="sheet-header">
        <div>
          <span class="eyebrow">READY TO ORDER</span>
          <h2>Your AKU order</h2>
        </div>

        <button onclick="closeSheet()">
          ${closeIcon()}
        </button>
      </div>

      <div class="order-preview">
        ${cart.map(item => `
          <div>
            <span>${item.size} × ${item.quantity}</span>
            <strong>${money(item.price * item.quantity)}</strong>
          </div>
        `).join("")}

        <div class="order-total">
          <span>Total</span>
          <strong>${money(cartTotal())}</strong>
        </div>
      </div>

      <div class="sheet-actions">

        <button
          class="primary-button full-button"
          onclick='openWhatsApp(${JSON.stringify(orderText)})'
        >
          Order on WhatsApp
        </button>

        <button
          class="secondary-button full-button"
          onclick="callAKU()"
        >
          Call to order
        </button>

        <button
          class="secondary-button full-button"
          onclick="emailAKU()"
        >
          Email order
        </button>

      </div>

    </section>
  `;

  requestAnimationFrame(() => {
    root.classList.add("sheet-open");
  });
}

function buildOrderText() {
  let text = "Hello AKU Palm Oil, I would like to place an order:%0A%0A";

  cart.forEach(item => {
    text += `${item.size} × ${item.quantity} — ${money(item.price * item.quantity)}%0A`;
  });

  text += `%0ATotal: ${money(cartTotal())}%0A%0A`;
  text += "Please let me know the delivery details.";

  return text;
}

function openWhatsApp(message) {
  const text = message || "Hello AKU Palm Oil, I would like to place an order.";

  const url =
    "https://wa.me/" +
    CONTACT.whatsapp +
    "?text=" +
    encodeURIComponent(text.replaceAll("%0A", "\n"));

  window.location.href = url;
}

function callAKU() {
  window.location.href = `tel:${CONTACT.phone}`;
}

function emailAKU() {
  const subject = "AKU Palm Oil Order";

  let body = "Hello AKU Palm Oil,%0A%0AI would like to place an order.%0A%0A";

  cart.forEach(item => {
    body += `${item.size} × ${item.quantity} — ${money(item.price * item.quantity)}%0A`;
  });

  if (cart.length) {
    body += `%0ATotal: ${money(cartTotal())}%0A`;
  }

  body += "%0APlease let me know the next steps.";

  window.location.href =
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function closeSheet() {
  const root = document.getElementById("sheet-root");

  if (!root) return;

  root.classList.remove("sheet-open");

  setTimeout(() => {
    root.innerHTML = "";
  }, 300);
}

function updateSheet() {
  const root = document.getElementById("sheet-root");

  if (!root) return;
}

/* SVG ICONS */

function homeIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5"/>
      <path d="M5.5 9.5V21h13V9.5"/>
      <path d="M9.5 21v-6h5v6"/>
    </svg>
  `;
}

function bagIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l1 13H4L5 8Z"/>
      <path d="M8 8a4 4 0 0 1 8 0"/>
    </svg>
  `;
}

function phoneIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 3.5 9 3l2 5-2.5 1.5a15 15 0 0 0 6.5 6.5l1.5-2.5 5 2-.5 2.5c-.3 1.5-1.6 2.5-3.1 2.5C10.2 20.5 3.5 13.8 3.5 5.6 3.5 4.1 4.5 3.8 6.5 3.5Z"/>
    </svg>
  `;
}

function whatsappIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/>
      <path d="M8 8.5c.3-.5.7-.6 1.1-.3l1.2 1c.3.2.3.6.1.9l-.5.7a6.7 6.7 0 0 0 3.3 3.3l.7-.5c.3-.2.7-.2.9.1l1 1.2c.3.4.2.8-.3 1.1-.7.4-1.5.5-2.2.2-2.8-1.1-5-3.3-6.1-6.1-.3-.7-.2-1.5.2-2.2Z"/>
    </svg>
  `;
}

function mailIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m4 7 8 6 8-6"/>
    </svg>
  `;
}

function storyIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5"/>
      <path d="M12 7v10M8.5 10.5h7M8.5 13.5h7"/>
    </svg>
  `;
}

function closeIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18"/>
    </svg>
  `;
}

function arrowIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 5 7 7-7 7"/>
    </svg>
  `;
}

/* INITIALISE */

document.addEventListener("DOMContentLoaded", () => {
  render();
});