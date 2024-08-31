const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const { stripe } = require("../utils");
const axios = require("axios");

// Transfer funds
const transferFund = asyncHandler(async (req, res) => {
  // Extract the sender from the authenticated user
  const sender = req.user.email;
  const { amount, receiver, description = "" } = req.body;

  // Validate required fields
  if (!amount || !receiver) {
    res.status(400);
    throw new Error(
      "Please provide all required fields (amount and receiver)."
    );
  }

  // Check sender's account balance
  const senderUser = await User.findOne({ email: sender });

  if (!senderUser) {
    res.status(404);
    throw new Error("Sender not found");
  }

  if (senderUser.balance < amount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  // Deduct the amount from the sender's account
  await User.findOneAndUpdate(
    { email: sender },
    { $inc: { balance: -amount } }
  );

  // Add the amount to the receiver's account
  const receiverUser = await User.findOneAndUpdate(
    { email: receiver },
    { $inc: { balance: amount } }
  );

  if (!receiverUser) {
    res.status(404);
    throw new Error("Receiver not found");
  }

  // Save the transaction to the database
  const transaction = new Transaction({
    amount,
    sender,
    receiver,
    description,
    status: "successful",
  });

  await transaction.save();

  res.status(200).json({ message: "Transaction Successful" });
});

// Verify account you're transferring to
const verifyAccount = asyncHandler(async (req, res) => {
  const { receiver } = req.body;

  console.log("req.body==>", req.body);
  const user = await User.findOne({ email: receiver });

  console.log("user==>", user);

  if (!user) {
    res.status(404);
    throw new Error("User Account not found");
  }

  res.status(200).json({
    name: user.name,
    message: "Account verification successful",
  });
});

// Get user transactions
const getUserTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const transactions = await Transaction.find({
    $or: [{ sender: user.email }, { receiver: user.email }],
  })
    .sort({ createdAt: -1 })
    .populate("sender")
    .populate("receiver");

  res.status(200).json(transactions);
});

// Deposit fund
const depositFundStripe = asyncHandler(async (req, res) => {
  const { amount } = req.body;

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
            description: `Make a deposit of $${amount} to shopiverse wallet`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    customer: user.stripeCusomerId,
    success_url:
      process.env.FRONTEND_URL + `/wallet?payment=successful&amount=${amount}`,
    cancel_url: process.env.FRONTEND_URL + "/wallet?payment=failed",
  });

  return res.json(session);
});

const webhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  let data;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("Webhook verified");
  } catch (err) {
    console.log("Verify Error ZT", err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;

  // Handle the event
  if ((eventType = "checkout.session.completed")) {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        console.log("customer email===>", customer.email);
        console.log("data:", data.amount_total);

        const description = "Stripe Deposit";
        const source = "stripe";

        // save the transaction
        try {
          depositFund(customer, data, description, source);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.log(err.message));
  }
  res.send().end();
});

const depositFundFLW = asyncHandler(async (req, res) => {
  const { transaction_id } = req.query;

  // Confirm transaction
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

  const response = await axios({
    url,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: process.env.FLW_SECRET_KEY,
    },
  });

  // console.log(response.data.data);
  const { amount, customer, tx_ref } = response.data.data;

  const successURL = process.env.FRONTEND_URL + "/wallet?payment=successful";
  const failureURL = process.env.FRONTEND_URL + "/wallet?payment=failed";
  if (req.query.status === "successful") {
    const data = {
      amount_subtotal: amount,
    };
    const description = "Flutterwave Deposit";
    const source = "flutterwave";
    depositFund(customer, data, description, source);
    res.redirect(successURL);
  } else {
    res.redirect(failureURL);
  }
});

module.exports = {
  transferFund,
  verifyAccount,
  getUserTransactions,
  depositFundStripe,
  webhook,
  depositFundFLW,
};
