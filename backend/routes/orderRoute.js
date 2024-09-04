const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  payWithStripe,
  payWithFlutterwave,
  // payWithPaystack,
  createPayPalOrder,
  capturePayPalOrder,
  // verfyFlwPayment,
  payWithWallet,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.patch("/:id", protect, adminOnly, updateOrderStatus);

router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);

// Pay with stripe
router.post("/create-payment-intent", protect, payWithStripe);

// Flutterwave
router.post("/payWithFlutterwave", protect, payWithFlutterwave);
// router.get("/response", verifyFlwPayment);

// Paystack - Not completely implemented
// router.post("/payWithPaystack", protect, payWithPaystack);
router.post("/paypal/create-order", protect, createPayPalOrder);
// router.post("/paypal/capture-order", protect, capturePayPalOrder);

// Pay with wallet
router.post("/payWithWallet", protect, payWithWallet);

module.exports = router;
