"use strict";

const productGrid = document.querySelector(".desserts-grid");
const cartContent = document.querySelector(".cart-content");

let productsData = {};
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// Fetch Data
const initApp = () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      productsData = data.reduce((accumulator, currentItem) => {
        accumulator[currentItem.dataNumber] = { ...currentItem, quantity: 0 };
        return accumulator;
      }, {});

      productGrid.innerHTML = renderProducts(data);
    });
};

// Starting Html
const renderProducts = (products) => {
  return products
    .map(
      (product) => `
  <div class="each-items" data-productId ="${product.dataNumber}">
  <div class="each-image-box">
  <img class="each-product-image" src="${product.image.desktop}" alt="${product.name}" />
  </div>
  <p class="product-categories">${product.category}</p>
  <p class="product-name">${product.name}</p>
  <p class="product-price">$${product.price}</p>
   <div class="add-to-cart-btn">
   <div class="beforeHover">
  <img class="cart-logo" src="./assets/images/icon-add-to-cart.svg" />
  <p class="addToCartText">Add to Cart</p>
  </div>
  <div class="afterHover hidden">
   <p class="minus">-</p>
    <p class="numberQuantity">0</p>
    <p class="plus">+</p></div>
  </div>
  </div>
  `
    )
    .join("");
};

// switch to the afterHover UI
const uiChangeForAddToCart = (eachItem) => {
  const beforeHover = eachItem.querySelector(".beforeHover");
  const afterHover = eachItem.querySelector(".afterHover");
  beforeHover.classList.add("hidden");
  afterHover.classList.remove("hidden");
};

// function for plus

const forPlus = (i, q) => {
  productsData[i].quantity += 1;
  renderUIforPanM(i, q);
};

// function for minus
const forMinus = (i, q) => {
  if (productsData[i].quantity === 0) return;
  productsData[i].quantity -= 1;
  renderUIforPanM(i, q);
};
const renderUIforPanM = (i, q) => {
  q.textContent = productsData[i].quantity;
};
// function for render cart html inner content
const forCartHtml = (product) => {
  cartContent.innerHTML = "";
  if (cart.length === 0) {
    cartContent.innerHTML = ` <p class="your-cart">Your Cart(<span class="quantity">0</span>)</p>
        <div class="cart-content">
          <img
            src="./assets/images/illustration-empty-cart.svg"
            alt="Empty Cart Logo"
          />
          <p class="empty-cart-text">Your added items will appear here</p>`;
  }

  const html = cart
    .map((item) => {
      return `
        <div class="cart-item">
          <p class="cart-name">${item.name}</p>
          <p class="cart-qty">x${item.quantity}</p>
          <p class="cart-price">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;
    })
    .join("");
  cartContent.innerHTML = html;
};

// function for cart
const makeCart = (id) => {
  const product = productsData[id];
  const index = cart.findIndex((item) => item.dataNumber === id);
  // If quantity is zero, remove the product from the cart if it exists

  if (product.quantity === 0 && index !== -1) {
    cart.splice(index, 1);
    return;
  }

  // if its not in the cart then add it
  if (index === -1) {
    cart.push({ ...product });
  } else {
    // if it is n the cart just update the value
    cart[index].quantity = product.quantity;
  }
};

// Event Delegation
productGrid.addEventListener("click", (e) => {
  const eachItem = e.target.closest(".each-items");
  const quantityEl = eachItem.querySelector(".numberQuantity");
  const id = eachItem.dataset.productid;

  const link = e.target;
  if (e.target.matches(".plus")) {
    forPlus(id, quantityEl);
    makeCart(id);
  }
  if (e.target.matches(".minus")) {
    forMinus(id, quantityEl);
    makeCart(id);
  }
  if (!link.matches(".addToCartText")) return;
  uiChangeForAddToCart(eachItem);
  console.log(cart);
});
