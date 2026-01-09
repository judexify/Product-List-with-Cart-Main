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
    console.log(productItems);
  });
};
