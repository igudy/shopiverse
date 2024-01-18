const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [false, "Please a product name"],
    },
    productImg: {
      type: String,
      required: [false, "Please add a product image"],
      default: "https://ibb.co/HVDWrpT",
    },
    quantity: {
      type: Number,
      required: [false, "Please enter the quantity"],
    },
    price: {
      type: Number,
      required: [false, "Please enter your real price"],
    },
    falsePrice: {
      type: Number,
      required: [false, "Please enter false price"],
    },
    category: {
      type: String,
      enum: ["Laptop", "Electronics", "Fashion", "Shoes", "Phone"],
      required: [false, "Please select a category"],
    },
    brand: {
      type: String,
      required: [false, "Please a product brand"],
    },
    desc: {
      type: String,
      required: [false, "Please a product description"],
    },
    ratings: {
      type: [Object],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// how it is been saved to the db
const Product = mongoose.model("Product", productSchema);

// how it is been exported to be used in other places
module.exports = Product;
