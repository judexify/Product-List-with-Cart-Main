"use strict";

const productGrid = document.querySelector(".desserts-grid");

let productsData = {};

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
const uiChangeForAddToCart = (e) => {
  const eachItem = e.target.closest(".each-items");
  const beforeHover = eachItem.querySelector(".beforeHover");
  const afterHover = eachItem.querySelector(".afterHover");
  beforeHover.classList.add("hidden");
  afterHover.classList.remove("hidden");
};
// function for plus

const forPlus = (e) => {
  const eachItem = e.target.closest(".each-items");
  const quantityEl = eachItem.querySelector(".numberQuantity");
  const id = eachItem.dataset.productid;

  productsData[id].quantity += 1;
  quantityEl.textContent = productsData[id].quantity;
  console.log(productsData);
};

// function for minus
const forMinus = (e) => {
  const eachItem = e.target.closest(".each-items");
  const quantityEl = eachItem.querySelector(".numberQuantity");
  const id = eachItem.dataset.productid;

  if (productsData[id].quantity === 0) return;

  productsData[id].quantity -= 1;
  quantityEl.textContent = productsData[id].quantity;
};
// Event Delegation
productGrid.addEventListener("click", (e) => {
  const link = e.target;
  if (e.target.matches(".plus")) {
    forPlus(e);
  }
  if (e.target.matches(".minus")) {
    forMinus(e);
  }
  if (!link.matches(".addToCartText")) return;
  uiChangeForAddToCart(e);
});
