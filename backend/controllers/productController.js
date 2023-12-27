const express = require("express");
const asyncHandler = require("express-async-handler");

const getProduct = asyncHandler(async (req, res) => {
  console.log("Get Product");
});

const addProduct = asyncHandler(async (req, res) => {
  console.log("Add Product");
});

const editProduct = asyncHandler(async (req, res) => {
  console.log("Edit Product");
});

const updateProduct = asyncHandler(async (req, res) => {
  console.log("Update Product");
});

const deleteProduct = asyncHandler(async (req, res) => {
  console.log("Delete Product");
});

module.exports = {
  getProduct,
  addProduct,
  editProduct,
  updateProduct,
  deleteProduct,
};
