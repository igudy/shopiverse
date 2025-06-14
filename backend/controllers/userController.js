const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const { generateToken, hashToken } = require("../utils/index");
const jwt = require("jsonwebtoken");
const parser = require("ua-parser-js");
const sendEmail = require("../utils/sendEmail");
const sendGmail = require("../utils/sendGmail");
const crypto = require("crypto");
const Cryptr = require("cryptr");
const { OAuth2Client } = require("google-auth-library");
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }

  if (password.length < 6 || password.length > 30) {
    res.status(400);
    throw new Error("Password must be more than 6 and less than 30 characters");
  }

  // Define user
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exist");
  }

  // Get UserAgent
  const ua = parser(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    userAgent,
  });

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1Day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
      userAgent,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// User agent code commented out.
// const loginUser = asyncHandler(async (req, res) => {
//   // req.body is the data coming from the front end
//   const { email, password } = req.body;

//   // Validation
//   if (!email || !password) {
//     res.status(400);
//     throw new Error("Please add email and password");
//   }
//   const user = await User.findOne({ email });

//   if (!user) {
//     res.status(404);
//     throw new Error("User not found, please sign up");
//   }

//   const passwordIsCorrect = await bcrypt.compare(password, user.password);

//   if (!passwordIsCorrect) {
//     res.status(400);
//     throw new Error("Email or Password not correct");
//   }

//   // Trigger 2FA for unknown UserAgent
//   const ua = parser(req.headers["user-agent"]);
//   const thisUserAgent = ua.ua;

//   // Check if the user agent is in the array
//   const allowedAgent = user.userAgent.includes(thisUserAgent);

//   if (!allowedAgent) {
//     // Generate 6 digit code
//     const loginCode = Math.floor(100000 + Math.random() * 900000);

//     console.log("login code", loginCode);
//     // Enrypt login code before saving to DB
//     const encryptedLoginCode = cryptr.encrypt(loginCode.toString());
//     console.log("encryptedLoginCode", encryptedLoginCode);

//     // Delete Token if it exists in DB
//     let userToken = await Token.findOne({ userId: user._id });
//     if (userToken) {
//       await userToken.deleteOne();
//     }

//     console.log("userToken", userToken);

//     // Save token to DB
//     await new Token({
//       userId: user._id,
//       lToken: encryptedLoginCode,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 60 * (60 * 1000), //60mins
//     }).save();

//     res.status(400);
//     throw new Error("New broswer or device detected");
//   }

//   // Generate token
//   const token = generateToken(user._id);

//   if (user && passwordIsCorrect) {
//     res.cookie("token", token, {
//       path: "/",
//       httpOnly: true,
//       expires: new Date(Date.now() + 1000 * 86400), //1Day
//       sameSite: "none",
//       secure: true,
//     });

//     const { _id, name, email, phone, bio, photo, role, isVerified, balance } =
//       user;

//     res.status(200).json({
//       _id,
//       name,
//       email,
//       phone,
//       bio,
//       photo,
//       role,
//       isVerified,
//       token,
//       balance,
//     });
//   } else {
//     res.status(500);
//     throw new Error("Something went wrong, please try again");
//   }
// });

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found, please sign up");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Email or Password not correct");
  }

  // Generate token
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, phone, bio, photo, role, isVerified, balance } =
      user;

    res.status(200).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
      balance,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again");
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  // Send HTTP-only cookie
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.json({ message: "Logout successfully" });
});

// Get User
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified, balance } =
      user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      balance,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, phone, bio, photo, role, isVerified } = user;

    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
    });
  }
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({ message: "User deleted successfully" });
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt").select("-password");

  if (!users) {
    res.status(500);
    throw new Error("Cannot get all users");
  }

  res.status(200).json(users);
});

// Login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Upgrade user role
const upgradeUser = asyncHandler(async (req, res) => {
  const { role, id } = req.body;
  const user = await User.findById(id);

  if (!user) {
    res.status(500);
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    message: `User role update ${role}`,
  });
});

// Send automated emails
const sendAutomatedEmail = asyncHandler(async (req, res) => {
  const { subject, send_to, reply_to, template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    res.status(500);
    throw new Error("Missing email parameter");
  }

  // Get user
  const user = await User.findOne({ email: send_to });

  if (!user) {
    res.status(404);
    throw new Error("Users not found");
  }

  const sent_from = process.env.EMAIL_USER;
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}/${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: `Email sent` });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Send Verification emails
const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found, please signup");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create verification Token and Save
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;

  // Hash token and save
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: user._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), //60mins
  }).save();

  // Construct Verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  // Send Email
  const subject = "Verify Your Account - Shopiverse";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@shopiverse.com";
  const template = "verifyEmail";
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: `Verifiction email sent successfully` });
  } catch (error) {
    res.status(500);
    throw new Error("Verifiction email not sent, please try again");
  }

  console.log(verificationToken);
});

// Verify User
const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  const hashedToken = hashToken(verificationToken);

  const userToken = await Token.findOne({
    vToken: hashedToken,
    // if its greater than the time the user is viewing this api it means the link has not expire.
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  // Now verify user
  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: "Account Verification Successful" });
});

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No user with this email");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token and save
  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // Send Email
  const subject = "Password Reset Request - Shopiverse";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@igudy.com";
  const template = "../views/forgotPassword.handlebars";
  const name = user.name;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  const hashedToken = hashToken(resetToken);

  const userToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const user = await User.findOne({ _id: userToken.userId });

  // Now Reset password
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password Reset Successful, please login" });
});

// Change Password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;

  const user = await User.findById(req.user._id);

  console.log("user===>", user);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please enter old and new password");
  }

  // Check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();

    res
      .status(200)
      .json({ message: "Password change successful, please re-login" });
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

// Send Login Code
const sendLoginCode = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find Login Code in DB
  let userToken = await Token.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired token, please login again");
  }

  const loginCode = userToken.lToken;
  const decryptedLoginCode = cryptr.decrypt(loginCode);

  // console.log(decryptedLoginCode);

  // Send Login Code
  const subject = "Login Access Code - Shopiverse";
  const send_to = email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@shopiverse.com";
  const template = "loginCode";
  const name = user.name;
  const link = decryptedLoginCode;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: `Access code sent to ${email}` });
  } catch (error) {
    res.status(500);
    throw new Error("Login access code not sent, please try again");
  }
});

// Login with Code
const loginWithCode = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const { loginCode } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find user Login Token
  const userToken = await Token.findOne({
    userId: user.id,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token, please login again");
  }

  const decryptedLoginCode = cryptr.decrypt(userToken.lToken);

  if (loginCode !== decryptedLoginCode) {
    res.status(400);
    throw new Error("Incorrect login code, please try again");
  } else {
    // Register userAgent
    const ua = parser(req.headers["user-agent"]);
    const thisUserAgent = ua.ua;
    user.userAgent.push(thisUserAgent);
    await user.save();

    // Generate Token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(200).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  }
});

// Update Photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.photo = photo;
  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    photo: updatedUser.photo,
    address: updatedUser.address,
  });
});

// Login with google
// const loginWithGoogle = asyncHandler(async (req, res) => {
//   const { userToken } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: userToken,
//     audience: process.env.GOOGLE_CLIENT_ID,
//   });

//   const payload = ticket.getPayload();
//   const { name, email, picture, sub } = payload;

//   // Create password
//   const password = Date.now() + sub;

//   // Get UserAgent
//   // const ua = parser(req.headers["user-agent"]);
//   // const userAgent = [ua.ua];

//   // Check if user exists
//   const user = await User.findOne({ email });

//   if (!user) {
//     // Create new user
//     const newUser = await User.create({
//       name,
//       email,
//       password,
//       photo: picture,
//       isVerified: true,
//       // userAgent,
//     });

//     if (newUser) {
//       // Generate Token
//       const token = generateToken(newUser._id);

//       // Send HTTP-only cookie
//       res.cookie("token", token, {
//         path: "/",
//         httpOnly: true,
//         expires: new Date(Date.now() + 1000 * 86400), // 1 day
//         sameSite: "none",
//         secure: true,
//       });

//       const { _id, name, email, phone, bio, photo, role, isVerified } = newUser;

//       res.status(201).json({
//         _id,
//         name,
//         email,
//         phone,
//         bio,
//         photo,
//         role,
//         isVerified,
//         token,
//       });
//     }
//   }

//   // User exists, login
//   if (user) {
//     const token = generateToken(user._id);

//     // Send HTTP-only cookie
//     res.cookie("token", token, {
//       path: "/",
//       httpOnly: true,
//       expires: new Date(Date.now() + 1000 * 86400), // 1 day
//       sameSite: "none",
//       secure: true,
//     });

//     const { _id, name, email, phone, bio, photo, role, isVerified } = user;

//     res.status(201).json({
//       _id,
//       name,
//       email,
//       phone,
//       bio,
//       photo,
//       role,
//       isVerified,
//       token,
//     });
//   }
// });

// Login with google
const loginWithGoogle = asyncHandler(async (req, res) => {
  const { userToken, isMobile } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: userToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // try {
    //   const ticket = await client.verifyIdToken({
    //     idToken: userToken,
    //     audience: [
    //       process.env.GOOGLE_IOS_CLIENT_ID,
    //       process.env.GOOGLE_EXPO_CLIENT_ID,
    //       process.env.GOOGLE_ANDROID_CLIENT_ID,
    //       process.env.GOOGLE_WEB_CLIENT_ID,
    //     ],
    //   });

    const payload = ticket.getPayload();
    const { name, email, picture, sub } = payload;

    // Create password
    const password = Date.now() + sub;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        password,
        photo: picture,
        isVerified: true,
        ...(!isMobile && { userAgent: [parser(req.headers["user-agent"]).ua] }),
      });
    } else {
      // Update user profile if changed
      user.name = name;
      user.photo = picture;
      await user.save();
    }

    const token = generateToken(user._id);

    // For web: set cookie
    if (!isMobile) {
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      });
    }

    const { _id, phone, bio, role, isVerified } = user;

    res.status(user ? 200 : 201).json({
      _id,
      name: user.name,
      email: user.email,
      phone,
      bio,
      photo: user.photo,
      role,
      isVerified,
      token: isMobile ? token : undefined,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Invalid authentication" });
  }
});

// Save Cart
const saveCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.cartItems = req.body.cartItems;
    await user.save();

    // Option 1: Send JSON response
    res.status(200).json({
      message: "Saved cart items successfully",
      cartItems: req.body.cartItems.map((item) => item.name),
    });

    // Option 2: Send formatted string
    // res.status(200).json(
    //   `Saved ${req.body.cartItems.map((item) => item.name).join(", ")}`
    // );
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Get Cart
const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // const { _id, name, email, phone, address } = user;
    res.status(200).json(user.cartItems);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Clear Cart
const clearCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.cartItems = [];
    user.save();
    res.status(200).json({
      message: "Cart cleared",
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Add product to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  );

  res.json({ message: "Product added to wishlist" });
});

//
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  );

  res.json({ message: "Product removed to wishlist" });
});

// Get Wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist");

  res.json(list);
});

module.exports = {
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
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  getCart,
  saveCart,
  clearCart,
};
