/* =========================================================
   AKU PALM OIL
   COMPLETE E-COMMERCE FUNCTIONALITY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const WHATSAPP_NUMBER = "2347062103875";

  let cart = [];

  try {
    cart = JSON.parse(
      localStorage.getItem("akuCart") || "[]"
    );

    if (!Array.isArray(cart)) {
      cart = [];
    }
  } catch {
    cart = [];
  }


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const cartButton =
    document.getElementById("cartBtn");

  const cartDrawer =
    document.getElementById("cartDrawer");

  const cartOverlay =
    document.getElementById("cartOverlay");

  const closeCartButton =
    document.getElementById("closeCart");

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");

  const checkoutButton =
    document.getElementById("checkoutBtn");

  const searchButton =
    document.getElementById("searchBtn");

  const searchPanel =
    document.getElementById("searchPanel");

  const searchInput =
    document.getElementById("searchInput");


  /* =======================================================
     MONEY
  ======================================================= */

  function money(value) {

    return new Intl.NumberFormat(
      "en-NG",
      {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
      }
    ).format(Number(value));

  }


  /* =======================================================
     SAVE CART
  ======================================================= */

  function saveCart() {

    localStorage.setItem(
      "akuCart",
      JSON.stringify(cart)
    );

  }


  /* =======================================================
     CART COUNT
  ======================================================= */

  function updateCartCount() {

    const count = cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );

    cartCount.textContent = count;

  }


  /* =======================================================
     CART TOTAL
  ======================================================= */

  function getCartTotal() {

    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price) *
        Number(item.quantity),
      0
    );

  }


  /* =======================================================
     OPEN CART
  ======================================================= */

  function openCart() {

    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");

    document.body.style.overflow = "hidden";

  }


  /* =======================================================
     CLOSE CART
  ======================================================= */

  function closeCart() {

    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");

    document.body.style.overflow = "";

  }


  /* =======================================================
     RENDER CART
  ======================================================= */

  function renderCart() {

    updateCartCount();

    cartTotal.textContent =
      money(getCartTotal());


    if (cart.length === 0) {

      cartItems.innerHTML = `

        <div class="empty-cart">

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6"></path>
            <circle cx="10" cy="19" r="1.4"></circle>
            <circle cx="18" cy="19" r="1.4"></circle>
          </svg>

          <h3>
            Your cart is empty
          </h3>

          <p>
            Add AKU Palm Oil products to your cart.
          </p>

        </div>

      `;

      return;
    }


    cartItems.innerHTML =
      cart.map((item, index) => `

        <div class="cart-item">

          <div class="cart-item-image">

            <img
              src="${item.image}"
              alt="${item.name} ${item.size}"
            >

          </div>

          <div class="cart-item-info">

            <h4>
              ${item.name}
            </h4>

            <p>
              ${item.size}
            </p>

            <div class="quantity-controls">

              <button
                type="button"
                data-index="${index}"
                data-change="-1"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                type="button"
                data-index="${index}"
                data-change="1"
              >
                +
              </button>

            </div>

          </div>

          <div class="cart-item-total">
            ${money(
              Number(item.price) *
              Number(item.quantity)
            )}
          </div>

        </div>

      `).join("");

  }


  /* =======================================================
     ADD TO CART
  ======================================================= */

  document
    .querySelectorAll(".add-button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const product = {

            id: button.dataset.id,

            name: button.dataset.name,

            size: button.dataset.size,

            price: Number(
              button.dataset.price
            ),

            image: button.dataset.image,

            quantity: 1

          };


          const existing =
            cart.find(
              item =>
                item.id === product.id
            );


          if (existing) {

            existing.quantity += 1;

          } else {

            cart.push(product);

          }


          saveCart();

          renderCart();

          openCart();

        }
      );

    });


  /* =======================================================
     CHANGE QUANTITY
  ======================================================= */

  cartItems.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-change]"
        );

      if (!button) return;


      const index =
        Number(button.dataset.index);

      const change =
        Number(button.dataset.change);


      if (!cart[index]) return;


      cart[index].quantity += change;


      if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

      }


      saveCart();

      renderCart();

    }
  );


  /* =======================================================
     CART BUTTONS
  ======================================================= */

  cartButton.addEventListener(
    "click",
    () => {

      renderCart();

      openCart();

    }
  );


  closeCartButton.addEventListener(
    "click",
    closeCart
  );


  cartOverlay.addEventListener(
    "click",
    closeCart
  );


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeCart();
      }

    }
  );


  /* =======================================================
     SEARCH
  ======================================================= */

  searchButton.addEventListener(
    "click",
    () => {

      searchPanel.classList.toggle(
        "open"
      );


      if (
        searchPanel.classList.contains(
          "open"
        )
      ) {

        setTimeout(
          () => searchInput.focus(),
          100
        );

      }

    }
  );


  searchInput.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value
          .toLowerCase()
          .trim();


      document
        .querySelectorAll(
          ".product-card"
        )
        .forEach(card => {

          const text =
            card.textContent
              .toLowerCase();


          card.style.display =
            !query ||
            text.includes(query)
              ? ""
              : "none";

        });

    }
  );


  /* =======================================================
     PRODUCT FILTERS
  ======================================================= */

  document
    .querySelectorAll(".pill")
    .forEach(pill => {

      pill.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(".pill")
            .forEach(item =>
              item.classList.remove(
                "active"
              )
            );


          pill.classList.add(
            "active"
          );


          const filter =
            pill.dataset.filter;


          document
            .querySelectorAll(
              ".product-card"
            )
            .forEach(card => {

              if (
                filter === "all"
              ) {

                card.style.display = "";

                return;
              }


              card.style.display =
                card.dataset.category ===
                filter
                  ? ""
                  : "none";

            });

        }
      );

    });


  /* =======================================================
     WHATSAPP CHECKOUT
  ======================================================= */

  checkoutButton.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        alert(
          "Your cart is empty. Please add a product first."
        );

        return;

      }


      let message =
        "Hello AKU Palm Oil, I would like to place an order:\n\n";


      cart.forEach(item => {

        message +=
          `${item.name} — ${item.size} × ${item.quantity} — ${money(
            Number(item.price) *
            Number(item.quantity)
          )}\n`;

      });


      message +=
        `\nTotal: ${money(
          getCartTotal()
        )}`;


      const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message
        )}`;


      window.open(
        url,
        "_blank"
      );

    }
  );


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute(
              "href"
            );

          const target =
            document.querySelector(
              id
            );


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     INITIALIZE
  ======================================================= */

  renderCart();

});