const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  payWithStripe,
  // payWithFlutterwave,
  // verfyFlwPayment,
  // payWithWallet,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.patch("/:id", protect, adminOnly, updateOrderStatus);

router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);

router.post("/create-payment-intent", payWithStripe);
// router.get("/response", verifyFlwPayment);
// router.post("/payWithFlutterwave", payWithFlutterwave);
// router.post("/payWithWallet", protect, payWithWallet);

module.exports = router;
