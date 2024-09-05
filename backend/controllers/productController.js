const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

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

  if (product) {
    const {
      _id,
      name,
      productImg,
      quantity,
      price,
      falsePrice,
      category,
      brand,
      desc,
      rating,
    } = product;
    res.status(200).json({
      _id,
      name,
      productImg,
      quantity,
      price,
      falsePrice,
      category,
      brand,
      desc,
      rating,
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

const reviewProduct = asyncHandler(async (req, res) => {
  // Star, review
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  // Validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update Product
  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    userID: req.user._id,
  });
  product.save();

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
  const { star, review, reviewDate, userID } = req.body;
  const { id } = req.params;
  // const userID = req.user._id;

  // validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Match user to review
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
