const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  loginStatus,
  upgradeUser,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
  updatePhoto,
  // addToWishlist,
  // getWishlist,
  // removeFromWishlist,
  getCart,
  saveCart,
  clearCart,
} = require("../controllers/userController");

const {
  protect,
  adminOnly,
  authorOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Advanced Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.patch("/updateUser", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);
router.get("/getUsers", protect, authorOnly, getUsers);
router.get("/loginStatus", loginStatus);
router.post("/upgradeUser", protect, adminOnly, upgradeUser);
router.post("/sendAutomatedEmail", protect, sendAutomatedEmail);
router.post("/sendVerificationEmail", protect, sendVerificationEmail);
router.patch("/verifyUser/:verificationToken", verifyUser);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/changePassword", protect, changePassword);
router.post("/sendLoginCode/:email", sendLoginCode);
router.post("/loginWithCode/:email", loginWithCode);
router.post("/google/callback", loginWithGoogle);
router.patch("/updatePhoto", protect, updatePhoto);

// Wishlist
// router.post("/addToWishlist", protect, addToWishlist);
// router.get("/getWishlist", protect, getWishlist);
// router.put("/wishlist/:productId", protect, removeFromWishlist);

// Cart
router.get("/getCart", protect, getCart);
router.patch("/saveCart", protect, saveCart);
router.patch("/clearCart", protect, clearCart);

module.exports = router;
