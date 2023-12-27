const express = require("express");

const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/getproduct", getProduct);
router.post("/addProduct", addProduct);
router.patch("/updateProduct", updateProduct);
router.delete("/:id", deleteProduct);
