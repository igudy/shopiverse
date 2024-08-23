const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { calculateTotalPrice } = require("../utils");
const Product = require("../models/productModel");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");
const User = require("../models/userModel");
// const Transaction = require("../models/transactionModel");
const { orderSuccessEmail } = require("../emailTemplates/orderTemplate");
const sendGmail = require("../utils/sendGmail");
const crypto = require("crypto");
const paypalClient = require("../services/paypalService");

// Create order
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  } = req.body;

  //   Validation
  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    res.status(400);
    throw new Error("Order data missing!!!");
  }

  const user = await User.findById(req.user._id);

  await Order.create({
    user: user,
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  });

  await updateProductQuantity(cartItems);

  // Send Order Email to the user
  const subject = "Shopiverse Order Placed";
  const send_to = req.user.email;
  const template = orderSuccessEmail(req.user.name, cartItems);
  const reply_to = "goodnessigunma1@gmail.com";
  await sendGmail(subject, send_to, template, reply_to);

  res.status(201).json({ message: "Order Created" });
});

// Get all Orders
const getOrders = asyncHandler(async (req, res) => {
  let orders;

  if (req.user.role === "admin") {
    orders = await Order.find().sort("-createdAt");
    return res.status(200).json(orders);
  }

  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    res.status(400);
    throw new Error("Invalid User ID");
  }

  orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json(orders);
});

// Get single Order
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // if product doesn't exist
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (req.user.role === "admin") {
    return res.status(200).json(order);
  }
  // Match Order to its user
  if (order.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(order);
});

// Update product
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);

  // if product doesnt exist
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Update Product
  await Order.findByIdAndUpdate(
    { _id: id },
    {
      orderStatus: orderStatus,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ message: "Order status updated" });
});

const payWithStripe = asyncHandler(async (req, res) => {
  const { items, shipping, description, coupon } = req.body;
  const products = await Product.find();

  let orderAmount;
  orderAmount = calculateTotalPrice(products, items);
  if (coupon !== null && coupon?.name !== "nil") {
    let totalAfterDiscount =
      orderAmount - (orderAmount * coupon.discount) / 100;
    orderAmount = totalAfterDiscount;
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "ngn",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
    // receipt_email: customerEmail
  });

  // console.log(paymentIntent);

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const updateProductQuantity = async (cartItems) => {
  let bulkOption = cartItems.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: {
          $inc: {
            quantity: -product.cartQuantity,
            sold: +product.cartQuantity,
          },
        },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});

  // Return the updated product information or cartItems
  return cartItems; // Or you can return updated product information if needed
};

const payWithFlutterwave = async (req, res) => {
  const { items, userID } = req.body;
  const products = await Product.find();
  const user = await User.findById(userID);
  const orderAmount = calculateTotalPrice(products, items);

  console.log("orderAmount==>", orderAmount);

  const url = "https://api.flutterwave.com/v3/payments";

  const tx_ref = crypto.randomUUID();
  // const tx_ref = process.env.TX_REF;

  const json = {
    tx_ref: tx_ref,
    amount: orderAmount,
    currency: "NGN",
    // payment_options: "card, banktransfer, ussd",
    redirect_url: "http://localhost:5173/chekout-success",
    //   meta: {
    //     consumer_id: 23,
    //     consumer_mac: "92a3-912ba-1192a",
    //   },
    customer: {
      email: user?.email,
      phone_number: user?.phone,
      name: user?.name,
    },
    customizations: {
      title: "Shopiverse Online Store",
      description: "Payment for products",
      logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    },
  };

  axios
    .post(url, json, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      },
    })
    .then(({ data }) => {
      console.log("data===>", data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.json(err.message);
    });
};

const createPayPalOrder = asyncHandler(async (req, res) => {
  const { items, userID } = req.body;
  const products = await Product.find();
  const user = await User.findById(userID);
  // const orderAmount = calculateTotalPrice(products, items);

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: orderAmount,
        },
        description: "Payment for items",
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.status(201).json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// const capturePayPalOrder = asyncHandler(async (req, res) => {
//   const { orderID, userID, items } = req.body;

//   const request = new paypal.orders.OrdersCaptureRequest(orderID);
//   request.requestBody({});

//   try {
//     const capture = await paypalClient.execute(request);

//     // Fetch user details
//     const user = await User.findById(userID);

//     // Send Order Email to the user
//     const subject = "Shopiverse Order Placed";
//     const send_to = user.email;
//     const template = orderSuccessEmail(user.name, items);
//     const reply_to = "goodnessigunma1@gmail.com";
//     await sendGmail(subject, send_to, template, reply_to);

//     res.status(200).json(capture.result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  payWithStripe,
  payWithFlutterwave,
  createPayPalOrder,
  // capturePayPalOrder,
  // payWithPaystack,
};
