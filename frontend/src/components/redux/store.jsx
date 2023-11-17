import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart/CartSlice.jsx";
import authSlice from "./slices/auth/authSlice.jsx";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
});

export default store;
