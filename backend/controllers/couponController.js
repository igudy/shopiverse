const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");

// Create Coupon
const createCoupon = asyncHandler(async (req, res) => {
  const { name, expiresAt, discount } = req.body;

  if (!name || !expiresAt || !discount) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const coupon = await Coupon.create({
    name,
    expiresAt,
    discount,
  });
  if (coupon) {
    res.status(201).json(coupon);
  } else {
    res.status(400);
    throw new Error("Something went wrong!!! Please Try again.");
  }
});

// Get Coupons
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort("-createdAt");
  res.status(200).json(coupons);
});

// Get Single Coupon
const getCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({
    name: req.params.couponName,
    expiresAt: { $gt: Date.now() },
  });

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found or has expired");
  }

  res.status(200).json(coupon);
});

// Delete Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  res.status(200).json({ message: "Coupon deleted." });
});

module.exports = {
  createCoupon,
  getCoupon,
  getCoupons,
  deleteCoupon,
};
