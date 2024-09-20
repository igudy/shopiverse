require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const orderRoute = require("./routes/orderRoute");
const transactionRoute = require("./routes/transactionRoute");

const {
  createOrder,
  capturePayment,
} = require("../backend/services/paypalService");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://shopiverse-client.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/transactionRoute", transactionRoute);

app.use(express.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brandRoute", brandRoute);
app.use("/api/couponRoute", couponRoute);
app.use("/api/orderRoute", orderRoute);

app.get("/", (req, res) => {
  res.send("Home page");
});

// Paypay Payment
app.post("/my-server/create-paypal-order", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  try {
    const captureData = await capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
