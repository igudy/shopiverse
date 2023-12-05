import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart/CartSlice.jsx";
import authSlice from "./slices/auth/authSlice.jsx";
import emailSlice from "./slices/email/emailSlice.jsx";
import filterSlice from "./slices/auth/filterSlice.jsx";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    email: emailSlice,
    filter: filterSlice,
  },
});

export default store;
