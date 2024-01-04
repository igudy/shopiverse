const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-createdAt").select("-password");

  if (!products) {
    res.status(500);
    throw new Error("Cannot find products");
  }
  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(req.product);

  if (product) {
    const {
      _id,
      productImg,
      quantity,
      price,
      falsePrice,
      category,
      brand,
      desc,
    } = product;
    res.status(200).json({
      _id,
      productImg,
      quantity,
      price,
      falsePrice,
      category,
      brand,
      desc,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    productImg,
    quantity,
    price,
    falsePrice,
    category,
    brand,
    desc,
  } = req.body;

  try {
    if (!name || !quantity || !price || !falsePrice || !category) {
      res.status(400);
      throw new Error("All fields are required");
    }

    // Create new product
    const newProduct = await Product.create({
      name,
      productImg,
      quantity,
      price,
      falsePrice,
      category,
      brand,
      desc,
    });

    res.status(201).json({ newProduct, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const { id: productID } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return `No product with id : ${productID}`;
  }
  res.status(200).json({ product, message: "Product updated successfully" });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.remove();
  res.status(200).json({ message: "Product deleted succesfully" });
});

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
