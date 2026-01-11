"use strict";

const productGrid = document.querySelector(".desserts-grid");
const cartContent = document.querySelector(".cart-content");
const cartQuantityDisplay = document.querySelector(".quantity");

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

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

  const decrementBtn = quantityControl.querySelector(".decrement-btn");
  const incrementBtn = quantityControl.querySelector(".increment-btn");
  const quantityDisplay = quantityControl.querySelector(".quantity-display");

  decrementBtn.addEventListener("click", () => {
    updateQuantity(eachProduct, quantityDisplay, -1);
  });

  incrementBtn.addEventListener("click", () => {
    updateQuantity(eachProduct, quantityDisplay, 1);
  });

  addToCartBtn.addEventListener("click", () => {
    productImageWrapper.classList.add("selected");
    addToCartBtn.style.display = "none";
    quantityControl.style.display = "flex";
    eachProduct.dataNumber = 0;
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

const updateQuantity = (eachProduct, quantityDisplay, change) => {
  const newQuantity = eachProduct.dataNumber + change;

  if (newQuantity < 0) return;

  eachProduct.dataNumber = newQuantity;
  quantityDisplay.textContent = newQuantity;
  productDataArr(eachProduct);
};

const productDataArr = (eachUpdatedProduct) => {
  if (!cart.includes(eachUpdatedProduct)) {
    cart.push(eachUpdatedProduct);
  }

  displayCart();
};

const displayCart = () => {
  const itemsInCart = cart.filter((item) => item.dataNumber > 0);

  if (itemsInCart.length === 0) {
    cartContent.innerHTML = `
      <img
        src="./assets/images/illustration-empty-cart.svg"
        alt="Empty Cart Logo"
        class="empty-cart-image"
      />
      <p class="empty-cart-text">Your added items will appear here</p>
    `;
    cartQuantityDisplay.textContent = "0";
    return;
  }

  const totalItems = itemsInCart.reduce(
    (sum, item) => sum + item.dataNumber,
    0
  );
  cartQuantityDisplay.textContent = totalItems;

  cartContent.innerHTML = "";

  itemsInCart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const cartItemDetails = document.createElement("div");
    cartItemDetails.classList.add("cart-item-details");

    const itemName = document.createElement("p");
    itemName.classList.add("cart-item-name");
    itemName.textContent = item.name;

    const itemPricing = document.createElement("div");
    itemPricing.classList.add("cart-item-pricing");

    const itemQuantity = document.createElement("span");
    itemQuantity.classList.add("cart-item-quantity");
    itemQuantity.textContent = `${item.dataNumber}x`;

    const itemPrice = document.createElement("span");
    itemPrice.classList.add("cart-item-price");
    itemPrice.textContent = `@ $${item.price.toFixed(2)}`;

    const itemTotal = document.createElement("span");
    itemTotal.classList.add("cart-item-total");
    itemTotal.textContent = `$${(item.price * item.dataNumber).toFixed(2)}`;

    itemPricing.append(itemQuantity, itemPrice, itemTotal);
    cartItemDetails.append(itemName, itemPricing);

    const cartItemLeft = document.createElement("div");
    cartItemLeft.classList.add("cart-item-left");

    const itemThumbnail = document.createElement("img");
    itemThumbnail.src = item.image.thumbnail;
    itemThumbnail.alt = `${item.name} thumbnail`;
    itemThumbnail.classList.add("cart-item-thumbnail");

    cartItemLeft.append(itemThumbnail, cartItemDetails);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>`;

    removeBtn.addEventListener("click", () => {
      removeFromCart(item);
    });

    cartItem.append(cartItemLeft, removeBtn);
    cartContent.appendChild(cartItem);
  });

  const orderTotalSection = document.createElement("div");
  orderTotalSection.classList.add("order-total-section");

  const orderTotalLabel = document.createElement("p");
  orderTotalLabel.classList.add("order-total-label");
  orderTotalLabel.textContent = "Order Total";

  const orderTotalAmount = document.createElement("p");
  orderTotalAmount.classList.add("order-total-amount");
  const total = itemsInCart.reduce(
    (sum, item) => sum + item.price * item.dataNumber,
    0
  );
  orderTotalAmount.textContent = `$${total.toFixed(2)}`;

  orderTotalSection.append(orderTotalLabel, orderTotalAmount);
  cartContent.appendChild(orderTotalSection);

  const carbonNeutral = document.createElement("div");
  carbonNeutral.classList.add("carbon-neutral");
  carbonNeutral.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
    <p>This is a <strong>carbon-neutral</strong> delivery</p>
  `;
  cartContent.appendChild(carbonNeutral);

  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("confirm-order-btn");
  confirmBtn.textContent = "Confirm Order";
  confirmBtn.addEventListener("click", () => {
    showOrderConfirmation(itemsInCart, total);
  });

  cartContent.appendChild(confirmBtn);
};

const showOrderConfirmation = (items, total) => {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("order-modal");

  const confirmIcon = document.createElement("div");
  confirmIcon.classList.add("confirm-icon");
  confirmIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48"><path fill="#1EA575" d="M21 32.121 13.5 24.6l2.121-2.121 5.379 5.379 11.879-11.879 2.121 2.121z"/><circle cx="24" cy="24" r="22" stroke="#1EA575" stroke-width="2" fill="none"/></svg>`;

  const modalTitle = document.createElement("h2");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = "Order Confirmed";

  const modalSubtitle = document.createElement("p");
  modalSubtitle.classList.add("modal-subtitle");
  modalSubtitle.textContent = "We hope you enjoy your food!";

  const orderItemsContainer = document.createElement("div");
  orderItemsContainer.classList.add("order-items-container");

  items.forEach((item) => {
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");

    const orderItemLeft = document.createElement("div");
    orderItemLeft.classList.add("order-item-left");

    const itemThumbnail = document.createElement("img");
    itemThumbnail.src = item.image.thumbnail;
    itemThumbnail.alt = `${item.name} thumbnail`;
    itemThumbnail.classList.add("order-item-thumbnail");

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("order-item-details");

    const itemName = document.createElement("p");
    itemName.classList.add("order-item-name");
    itemName.textContent = item.name;

    const itemPricing = document.createElement("div");
    itemPricing.classList.add("order-item-pricing");

    const itemQuantity = document.createElement("span");
    itemQuantity.classList.add("order-item-quantity");
    itemQuantity.textContent = `${item.dataNumber}x`;

    const itemPrice = document.createElement("span");
    itemPrice.classList.add("order-item-price");
    itemPrice.textContent = `@ $${item.price.toFixed(2)}`;

    itemPricing.append(itemQuantity, itemPrice);
    itemDetails.append(itemName, itemPricing);
    orderItemLeft.append(itemThumbnail, itemDetails);

    const itemTotal = document.createElement("span");
    itemTotal.classList.add("order-item-total");
    itemTotal.textContent = `$${(item.price * item.dataNumber).toFixed(2)}`;

    orderItem.append(orderItemLeft, itemTotal);
    orderItemsContainer.appendChild(orderItem);
  });

  const orderTotalRow = document.createElement("div");
  orderTotalRow.classList.add("order-total-row");

  const orderTotalLabel = document.createElement("p");
  orderTotalLabel.classList.add("order-total-label");
  orderTotalLabel.textContent = "Order Total";

  const orderTotalAmount = document.createElement("p");
  orderTotalAmount.classList.add("order-total-amount");
  orderTotalAmount.textContent = `$${total.toFixed(2)}`;

  orderTotalRow.append(orderTotalLabel, orderTotalAmount);
  orderItemsContainer.appendChild(orderTotalRow);

  const startNewOrderBtn = document.createElement("button");
  startNewOrderBtn.classList.add("start-new-order-btn");
  startNewOrderBtn.textContent = "Start New Order";
  startNewOrderBtn.addEventListener("click", () => {
    resetOrder();
    modalOverlay.remove();
  });

  modal.append(
    confirmIcon,
    modalTitle,
    modalSubtitle,
    orderItemsContainer,
    startNewOrderBtn
  );
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
};

const resetOrder = () => {
  cart.forEach((item) => {
    item.dataNumber = 0;
  });
  cart = [];

  const allProductCards = document.querySelectorAll("[data-product-id]");
  allProductCards.forEach((productCard) => {
    const productImageWrapper = productCard.querySelector(
      ".product-image-wrapper"
    );
    const addToCartBtn = productCard.querySelector(".addToCartBtn");
    const quantityControl = productCard.querySelector(".quantity-control");
    const quantityDisplay = quantityControl.querySelector(".quantity-display");

    productImageWrapper.classList.remove("selected");
    addToCartBtn.style.display = "flex";
    quantityControl.style.display = "none";
    quantityDisplay.textContent = "0";
  });

  displayCart();
};

const removeFromCart = (item) => {
  item.dataNumber = 0;

  const allProductCards = document.querySelectorAll("[data-product-id]");
  allProductCards.forEach((productCard) => {
    const productName = productCard.querySelector(".productName").textContent;
    if (productName === item.name) {
      const productImageWrapper = productCard.querySelector(
        ".product-image-wrapper"
      );
      const addToCartBtn = productCard.querySelector(".addToCartBtn");
      const quantityControl = productCard.querySelector(".quantity-control");
      const quantityDisplay =
        quantityControl.querySelector(".quantity-display");

      productImageWrapper.classList.remove("selected");
      addToCartBtn.style.display = "flex";
      quantityControl.style.display = "none";
      quantityDisplay.textContent = "0";
    }
  });

  const index = cart.indexOf(item);
  if (index > -1) {
    cart.splice(index, 1);
  }

  displayCart();
};

const displayProductItems = (data) => {
  productGrid.innerHTML = "";
  data.forEach((eachProduct, i) => {
    const productCard = createProductCard(eachProduct, i);
    productGrid.appendChild(productCard);
  });
};
