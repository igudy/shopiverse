const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  transferFund,
  verifyAccount,
  getUserTransactions,
  webhook,
  depositFundFLW,
  depositFundStripe,
} = require("../controllers/transactionController");
const router = express.Router();

router.post("/transferFund", express.json(), protect, transferFund);
router.post("/verifyAccount", express.json(), protect, verifyAccount);
router.post(
  "/getUserTransactions",
  express.json(),
  protect,
  getUserTransactions
);
router.post("/depositFundStripe", express.json(), protect, depositFundStripe);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);
router.post("/depositFundFLW", express.json(), depositFundFLW);

module.exports = router;
