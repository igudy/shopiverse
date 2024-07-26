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
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/${API_VERSION}` }),
  endpoints: (builder) => ({
    getCart: builder.query<any, any>({
      query: () => `users/getCart`,
      providesTags: ["cartTagTypes"],
    }),
    saveCartToDB: builder.mutation<any, any>({
      query: ({ cartItems, ...payload }) => ({
        url: `users/saveCart`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["cartTagTypes"],
    }),
  }),
});

export const { useGetCartQuery, useSaveCartToDBMutation } = cartApi;
