import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetCart,
  IDeleteCart,
  IPostCart,
  IGetCarts,
} from "./types/cartApi.types";
import { BASE_URL, API_VERSION } from "../../constants/constants";

export const cartApi = createApi({
  reducerPath: "cartApi",
  tagTypes: ["cartTagTypes"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${API_VERSION}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCart: builder.query<any, any>({
      query: () => `users/getCart`,
      providesTags: ["cartTagTypes"],
    }),

    saveCartToDB: builder.mutation<any, any>({
      query: ({ cartItems }) => ({
        url: `users/saveCart`,
        method: "PATCH",
        body: { cartItems },
      }),
      invalidatesTags: ["cartTagTypes"],
    }),

    // Wishlist APIs
    getWishList: builder.query<any, any>({
      query: () => ({
        url: `users/getWishlist`,
        method: "GET",
      }),
    }),

    addToWishList: builder.mutation<any, any>({
      query: (productId) => ({
        url: `users/addToWishlist`,
        method: "POST",
        body: productId
      }),
    }),

    removeFromWishlist: builder.mutation<any, any>({
      query: (productId) => ({
        url: `users/addToWishlist`,
        method: "PUT",
        body: productId,
      }),
    }),

  }),
});

export const {
  useGetCartQuery,
  useSaveCartToDBMutation,
  useGetWishListQuery,
  useAddToWishListMutation,
  useRemoveFromWishlistMutation
} = cartApi;
