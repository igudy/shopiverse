import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart/CartSlice.tsx";
import authSlice from "./slices/auth/authSlice.tsx";
import emailSlice from "./slices/email/emailSlice.tsx";
import filterSlice from "./slices/auth/filterSlice.tsx";
import { api } from "./api/api.tsx";
import { categoryApi } from "./api/categoryApi.tsx";
import { setupListeners } from "@reduxjs/toolkit/query";
import { brandApi } from "./api/brandApi.tsx";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    email: emailSlice,
    filter: filterSlice,
    [api.reducerPath]: api.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // remember to add the middlewares and concat them
    getDefaultMiddleware().concat(
      api.middleware,
      categoryApi.middleware,
      brandApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
