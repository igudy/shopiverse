import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart/CartSlice.jsx";
import authSlice from "./slices/auth/authSlice.jsx";
import emailSlice from "./slices/email/emailSlice.jsx";
import filterSlice from "./slices/auth/filterSlice.jsx";
import { api } from "./api/api.jsx";
import { categoryApi } from "./api/categoryApi.tsx";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    email: emailSlice,
    filter: filterSlice,
    [api.reducerPath]: api.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // remember to add the middlewares and concat them
    getDefaultMiddleware().concat(api.middleware, categoryApi.middleware),
});

setupListeners(store.dispatch);

export default store;
