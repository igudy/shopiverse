import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart/CartSlice";
import authSlice from "./slices/auth/authSlice";
import emailSlice from "./slices/email/emailSlice";
import filterSlice from "./slices/auth/filterSlice";
import couponSlice from "./slices/coupon/couponSlice";
import { api } from "./api/api";
import { categoryApi } from "./api/categoryApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { brandApi } from "./api/brandApi";
import { cartApi } from "./api/cartApi.jsx";
import { couponApi } from "./api/couponApi.jsx";
import { orderApi } from "./api/orderApi";
import { transactionApi } from "./api/transactionApi";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    email: emailSlice,
    filter: filterSlice,
    coupon: couponSlice,
    [api.reducerPath]: api.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    // remember to add the middlewares and concat them
    getDefaultMiddleware().concat(
      api.middleware,
      categoryApi.middleware,
      brandApi.middleware,
      cartApi.middleware,
      couponApi.middleware,
      orderApi.middleware,
      transactionApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

// Setting up listeners
setupListeners(store.dispatch);

export default store;
