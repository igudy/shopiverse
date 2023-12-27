const express = require("express");

const {
  addProduct,
  editProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getproduct", getProduct);
