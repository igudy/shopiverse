const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
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

const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  // Validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // Check if product exists
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if the user has already reviewed this product
  const alreadyReviewed = product.ratings.find(
    (rating) => rating.userID.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this product");
  }

  // Update Product
  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    userID: req.user._id,
  });

  await product.save();

  res.status(200).json({ message: "Product review added." });
});

const deleteReview = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const newRatings = product.ratings.filter((rating) => {
    return rating.userID.toString() !== userID.toString();
  });
  product.ratings = newRatings;
  product.save();
  res.status(200).json({ message: "Product rating deleted!!!." });
});

const updateReview = asyncHandler(async (req, res) => {
  // Extract data from request body
  const { star, review, reviewDate, userID } = req.body; // Include userID

  // Product ID
  const { id } = req.params;

  // Validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // If product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Match user to review
  console.log("req.user._id==>", req.user._id.toString());
  if (req.user._id.toString() !== userID) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedReview = await Product.findOneAndUpdate(
    { _id: product._id, "ratings.userID": mongoose.Types.ObjectId(userID) },
    {
      $set: {
        "ratings.$.star": Number(star),
        "ratings.$.review": review,
        "ratings.$.reviewDate": reviewDate,
      },
    }
  );

  if (updatedReview) {
    res.status(200).json({ message: "Product review updated." });
  } else {
    res.status(400).json({ message: "Product review failed to update." });
  }
});

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};
