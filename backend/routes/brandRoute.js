const express = require("express");
const router = express.Router();
const { adminOnly, protect } = require("../middleware/authMiddleware");
const {
  createBrand,
  getBrands,
  deleteBrand,
} = require("../controllers/brandController");

// routes
// router.post("/createBrand", protect, adminOnly, createBrand);
// router.get("/getBrands", protect, adminOnly, getBrands);
// router.delete("/:slug", protect, adminOnly, deleteBrand);
router.post("/createBrand", createBrand);
router.get("/getBrands", getBrands);
router.delete("/:slug", deleteBrand);

module.exports = router;
