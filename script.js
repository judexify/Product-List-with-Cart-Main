"use strict";

const productGrid = document.querySelector(".desserts-grid");

function renderProducts(products) {
  return products
    .map(
      (product) => `
  <div class="each-items">
  <div class="each-image-box">
  <img class="each-product-image" src="${product.image.desktop}" data-itemNumber="${product.image.dataNumber}" alt="${product.name}" />
  </div>
  <p class="product-categories">${product.category}</p>
  <p class="product-name">${product.name}</p>
  <p class="product-price">$${product.price}</p>
   <div class="add-to-cart-btn">
  <img class="cart-logo" src="./assets/images/icon-add-to-cart.svg" />
  <p class="addToCartText">Add to Cart</p>
  </div>
  </div>
  `
    )
    .join("");
}

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    productGrid.innerHTML = renderProducts(data);
  });

// for add to cart hover

function forAddCart(e) {
  // the inner html = none
  if (e.target.matches(".addToCartText")) {
    e.target.closest(".add-to-cart-btn").style.backgroundColor = "#c73a0fff";
    e.target.closest(".add-to-cart-btn").innerHTML = `
       <p class="minus">-</p>
    <p class="numberQuantity">0</p>
    <p class="plus">+</p>
    `;
  }
}

let isCartHoverDialog = false;
let currentNumberDisplayed = new Array(9).fill(0);
let currentNumArr = 0;

function forPlus(e) {
  const cnd = currentNumArr++;
  currentNumberDisplayed[myPlusData - 1] = cnd;

  e.target
    .closest(".add-to-cart-btn")
    .querySelector(".numberQuantity").textContent = cnd;
}

// function forMinus(e) {
//   const quantity = document.querySelector(".numberQuantity");
//   if (quantity.textContent <= 0) return;
//   currentNumberDisplayed--;
//   quantity.textContent = currentNumberDisplayed;
// }

productGrid.addEventListener("click", function (e) {
  isCartHoverDialog = true;
  if (!e.target.matches(".addToCartText")) return;
  if (e.target.matches(".plus")) {
    forPlus(e);
  }
  if (e.target.matches(".minus")) {
    forMinus(e);
  }
  forAddCart(e);
});
