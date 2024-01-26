const express = require("express");
const {
  protect,
  adminOnly,
  authorOnly,
} = require("../middleware/authMiddleware");

const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  deleteReview,
  updateReview,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts).post(addProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

// product review
router.patch("/review/:id", protect, reviewProduct);
router.patch("/deleteReview/:id", protect, deleteReview);
router.patch("/updateReview/:id", protect, updateReview);

module.exports = router;
