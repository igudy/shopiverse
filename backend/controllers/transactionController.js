const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const { stripe } = require("../utils");
const axios = require("axios");

// Transfer funds
const transferFund = asyncHandler(async (req, res) => {
  // Validation

  const { amount, sender, receiver, description, status } = req.body;
  if (!amount || !sender || !receiver) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Check sender's account balance
  const user = await User.findOne({ email: sender });
  if (user.balance < amount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  // Save the transaction
  await User.findOneAndUpdate(
    {
      email: sender,
    },
    {
      $inc: { balance: -amount },
    }
  );

  res.status(200).json({ message: "Transaction Successful" });
});

// Verify account you're transferring to
const verifyAccount = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.receiver });
  if (!user) {
    res.status(404);
    throw new Error("User Account not found");
  }

  res.status(200).json({ message: "Account verification successful" });
});

// Get user transaction
const getUserTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    $or: [{ sender: req.body.email }, { reciever: req.body.email }],
  })
    .sort({ createdAt: -1 })
    .populate("sender")
    .populate("receiver");

  res.status(200).json(transactions);
});

// Deposit fund
const depositFundStripe = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  console.log(amount);

  const user = await User.findById(req.user._id);

  // Create stripe customer
  if (!user.stripeCusomerId) {
    const customer = await stripe.customers.create({ email: user.email });
    user.stripeCusomerId = customer.id;
    user.save();
  }

  // Create stripe session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shopiverse wallet deposit",
            descriptioni: `Make a deposit of $${amount} to shopiverse wallet`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
  });
});

const depositFund = asyncHandler(async (req, res) => {
  res.status(200).json("Deposit fund");
  console.log("Deposit Fund");
});

const webhook = asyncHandler(async (req, res) => {
  res.status(200).json("Webhook");
  console.log("WebHook");
});

const depositFundFLW = asyncHandler(async (req, res) => {
  res.status(200).json("Deposit fund flutterwave");
  console.log("Deposit Fund Flutterwave");
});

module.exports = {
  transferFund,
  verifyAccount,
  getUserTransactions,
  depositFundStripe,
  webhook,
  depositFundFLW,
};
