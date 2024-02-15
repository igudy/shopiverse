const express = require("express");
const router = express.Router();
const { adminOnly, protect } = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");

// routes
router.post("/createCategory", createCategory);
router.get("/getCategories", getCategories);

router.delete("/:slug", deleteCategory);

module.exports = router;
