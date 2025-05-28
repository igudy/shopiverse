const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Shopiverse
// const protect = asyncHandler(async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       res.status(401);
//     }

//     // Verify token
//     const verified = await jwt.verify(token, process.env.JWT_SECRET);

//     // Get User Id From Token
//     const user = await User.findById(verified.id).select("-password");

//     if (!user) {
//       res.status(404);
//       throw new Error("User not found");
//     }

//     if (user.role === "suspended") {
//       res.status(400);
//       throw new Error("User suspended, please contact support");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error("Not authorized, please login");
//   }
// });

// Other One
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1️⃣  Look in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2️⃣  Fallback: look in Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.role === "suspended") {
      res.status(400);
      throw new Error("User suspended, please contact support");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

const authorOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role === "author" || req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an author");
  }
});

const verifiedOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, acount not verified");
  }
});

module.exports = {
  protect,
  // protectMobile,
  adminOnly,
  authorOnly,
  verifiedOnly,
};
