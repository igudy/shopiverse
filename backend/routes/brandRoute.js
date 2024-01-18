const express = require("express");
const router = express.Router();
const { adminOnly, protect } = require("../middleware/authMiddleware");
const {
  createBrand,
  getBrands,
  deleteBrand,
} = require("../controllers/brandController");

// routes
router.post("/createBrand", protect, adminOnly, createBrand);
router.get("/getBrands", protect, adminOnly, getBrands);

router.delete("/:slug", protect, adminOnly, deleteBrand);

module.exports = router;
