const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const { generateToken, hashToken } = require("../utils/index");
const jwt = require("jsonwebtoken");
const parser = require("ua-parser-js");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
  // console.log(ua);
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

const loginUser = asyncHandler(async (req, res) => {
  // req.body is the data coming from the front end
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email password");
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

  // Trigger 2FA for unknown UserAgent

  // Generate token
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //1Day
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
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  // Send HTTP-only cookie
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
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
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

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

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({ message: "User deleted successfully" });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt").select("-password");

  if (!users) {
    res.status(500);
    throw new Error("Cannot get all users");
  }

  res.status(200).json(users);
});

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
  const link = `${process.env.FRONTEND_URL}${url}`;

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
  const send_from = process.env.EMAIL_USER;
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
    res.status(200).json({ message: `Email sent` });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }

  // console.log(verificationToken);
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
};
