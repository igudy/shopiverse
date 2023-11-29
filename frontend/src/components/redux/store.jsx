import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart/CartSlice.jsx";
import authSlice from "./slices/auth/authSlice.jsx";
import emailSlice from "./slices/email/emailSlice.jsx";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    email: emailSlice,
  },
});

export default store;
