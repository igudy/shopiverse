const asyncHandler = require("express-async-handler");

const getProduct = asyncHandler(async (req, res) => {
  res.json("get product");
});

const addProduct = asyncHandler(async (req, res) => {
  res.json("add product");
});

const updateProduct = asyncHandler(async (req, res) => {
  res.json("update product");
});

const deleteProduct = asyncHandler(async (req, res) => {
  res.json("delete product");
});

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
