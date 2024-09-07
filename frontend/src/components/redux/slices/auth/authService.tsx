import axios from "axios";

// Validate email
export const validateEmail = (email: any) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

const register = async (userData: any) => {
  const response = await axios.post(API_URL + "register", userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// Login User
const login = async (userData: any) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data;
};

// Login Status
const loginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

// Get User
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

// Update User
const updateUser = async (userData: any) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

// Send verification email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data;
};

// Verify User
const verifyUser = async (verificationToken: any) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );
  return response.data.message;
};

// Fix bug for frontend
// Change password
const changePassword = async (userData: any) => {
  const response = await axios.patch(API_URL + "changePassword", userData);
  return response.data.message;
};

// Forgot password
const forgotPassword = async (userData: any) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);

  return response.data.message;
};

// Reset password
const resetPassword = async (userData: any, resetToken: any) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );
  return response.data.message;
};

// Get all users
const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");
  return response.data;
};

// Delete user
const deleteUser = async (id: any) => {
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

// Upgrade user
const upgradeUser = async (userData: any) => {
  const response = await axios.post(API_URL + "upgradeUser", userData);
  return response.data.message;
};

// Send login code
const sendLoginCode = async (email: any) => {
  const response = await axios.post(API_URL + `sendLoginCode/${email}`);
  return response.data.message;
};

// Login with code
const loginWithCode = async (code: any, email: any) => {
  const response = await axios.post(API_URL + `loginWithCode/${email}`, code);
  return response.data;
};

// Login with Google
const loginWithGoogle = async (userToken: any) => {
  const response = await axios.post(API_URL + "google/callback", userToken);
  return response.data;
};

export const authService = {
  register,
  login,
  logout,
  loginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
};
