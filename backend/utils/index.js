const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Instantiate stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Hash Token
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
};

// Calculate total price
// function calculateTotalPrice(products, cartItems) {
//   let totalPrice = 0;

//   cartItems.forEach(function (cartItem) {
//     const product = products.find(function (product) {
//       return product._id?.toString() === cartItem._id;
//     });

//     if (product) {
//       const quantity = cartItem.cartQuantity;
//       const price = parseFloat(product.price);
//       totalPrice += quantity * price;
//     }
//   });
//   return totalPrice;
// }

function calculateTotalPrice(products, cartItems) {
  let totalPrice = 0;

  cartItems.forEach(function (cartItem) {
    const product = products.find(function (product) {
      return product._id?.toString() === cartItem._id;
    });

    if (product) {
      // const quantity = cartItem.cartQuantity;
      const quantity = cartItem.cartQuantity;
      const price = parseFloat(product.price);

      if (!isNaN(price) && quantity > 0) {
        totalPrice += quantity * price;
      }
    }
  });
  return totalPrice;
}

// calculate discount
function applyDiscount(cartTotalAmount, discountPercentage) {
  var discountAmount = (discountPercentage / 100) * cartTotalAmount;
  var updatedTotal = cartTotalAmount - discountAmount;
  return updatedTotal;
}
module.exports = {
  generateToken,
  hashToken,
  stripe,
  calculateTotalPrice,
  applyDiscount,
};
