"use strict";

const productGrid = document.querySelector(".desserts-grid");
const cartContent = document.querySelector(".cart-content");

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

let productsData = {};
let cart = [];

const getEmployees = () => {
  return fetch("data.json").then((response) => response.json());
};

const initApp = () => {
  getEmployees().then((productItems) => {
    displayProductItems(productItems);
  });
};

const createQuantityControl = () => {
  const quantityControl = document.createElement("div");
  quantityControl.classList.add("quantity-control");

  const decrementBtn = document.createElement("button");
  decrementBtn.classList.add("quantity-btn", "decrement-btn");
  decrementBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>`;

  const quantityDisplay = document.createElement("span");
  quantityDisplay.classList.add("quantity-display");
  quantityDisplay.textContent = "0";

  const incrementBtn = document.createElement("button");
  incrementBtn.classList.add("quantity-btn", "increment-btn");
  incrementBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>`;

  quantityControl.append(decrementBtn, quantityDisplay, incrementBtn);
  return quantityControl;
};

const createProductCard = (eachProduct, i) => {
  const eachProductContainer = document.createElement("div");
  eachProductContainer.classList.add("eachProductContainer");
  eachProductContainer.dataset.productId = `${i + 1}`;

  const productImageWrapper = document.createElement("div");
  productImageWrapper.classList.add("product-image-wrapper");

  const productImage = document.createElement("img");
  productImage.src = `${eachProduct.image.desktop}`;
  productImage.alt = `${eachProduct.name} image`;
  productImage.classList.add("product-image");

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("addToCartBtn");

  const addToCartBtnIcon = document.createElement("img");
  addToCartBtnIcon.src = "./assets/images/icon-add-to-cart.svg";
  addToCartBtnIcon.alt = "Add to cart icon";
  addToCartBtnIcon.classList.add("cart-icon");

  const addToCartBtnText = document.createElement("span");
  addToCartBtnText.textContent = "Add to Cart";

  addToCartBtn.append(addToCartBtnIcon, addToCartBtnText);

  const quantityControl = createQuantityControl();
  quantityControl.style.display = "none";

  addToCartBtn.addEventListener("click", () => {
    productImageWrapper.classList.add("selected");
    addToCartBtn.style.display = "none";
    quantityControl.style.display = "flex";

    eachProduct.dataNumber = 0;
    handleQuantityControls(quantityControl, eachProduct);
  });

  productImageWrapper.append(productImage, addToCartBtn, quantityControl);

  const productDetails = document.createElement("div");
  productDetails.classList.add("productDetails");

  const productCategory = document.createElement("p");
  productCategory.classList.add("productCategory");
  productCategory.textContent = `${eachProduct.category}`;

  const productName = document.createElement("p");
  productName.classList.add("productName");
  productName.textContent = `${eachProduct.name}`;

  const productPrice = document.createElement("p");
  productPrice.classList.add("productPrice");
  productPrice.textContent = `$${eachProduct.price.toFixed(2)}`;

  productDetails.append(productCategory, productName, productPrice);
  eachProductContainer.append(productImageWrapper, productDetails);

  return eachProductContainer;
};

const incrementBtnFn = (eachProduct, quantityDisplay) => {
  quantityDisplay.textContent =
    eachProduct.dataNumber =
    eachProduct.dataNumber +=
      1;
};
const decrementBtnFn = (eachProduct, quantityDisplay) => {
  if (eachProduct.dataNumber <= 0) return;

  quantityDisplay.textContent =
    eachProduct.dataNumber =
    eachProduct.dataNumber -=
      1;
};

const handleQuantityControls = (quantityControl, eachProduct) => {
  const decrementBtn = quantityControl.querySelector(".decrement-btn");
  const incrementBtn = quantityControl.querySelector(".increment-btn");
  const quantityDisplay = quantityControl.querySelector(".quantity-display");
  const attachedLink = quantityControl.closest("[data-product-id]");

  decrementBtn.addEventListener("click", () => {
    console.log("Decrement clicked");
    decrementBtnFn(eachProduct, quantityDisplay);
  });

  incrementBtn.addEventListener("click", () => {
    console.log("Increment clicked");
    incrementBtnFn(eachProduct, quantityDisplay);
  });
};

const displayProductItems = (data) => {
  productGrid.innerHTML = "";
  data.forEach((eachProduct, i) => {
    const productCard = createProductCard(eachProduct, i);
    productGrid.appendChild(productCard);
  });
};
