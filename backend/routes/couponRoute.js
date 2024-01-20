const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

// routes
router.post("/createCoupon", protect, adminOnly, createCoupon);
router.get("/getCoupons", protect, adminOnly, getCoupons);
router.get("/:couponName", protect, getCoupon);
router.delete("/:id", protect, adminOnly, deleteCoupon);

module.exports = router;
