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

router.post("/", protect, createOrder); // Creates an order (POST request to '/')
router.patch("/:id", protect, adminOnly, updateOrderStatus); // Updates an order (PATCH request to '/:id')

router.get("/", protect, getOrders); // Fetches all orders (GET request to '/')
router.get("/:id", protect, getOrder); // Fetches a single order by ID (GET request to '/:id')

router.post("/create-payment-intent", payWithStripe);
// router.get("/response", verifyFlwPayment);
// router.post("/payWithFlutterwave", payWithFlutterwave);
// router.post("/payWithWallet", protect, payWithWallet);

module.exports = router;
