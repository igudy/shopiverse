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
  // payWithWallet,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.patch("/:id", protect, adminOnly, updateOrderStatus);

router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);

router.post("/create-payment-intent", protect, payWithStripe);
router.post("/payWithFlutterwave", protect, payWithFlutterwave);
// router.post("/payWithPaystack", protect, payWithPaystack);

router.post("/paypal/create-order", protect, createPayPalOrder);

// router.post("/paypal/capture-order", protect, capturePayPalOrder);

// router.get("/response", verifyFlwPayment);
// router.post("/payWithWallet", protect, payWithWallet);

module.exports = router;
