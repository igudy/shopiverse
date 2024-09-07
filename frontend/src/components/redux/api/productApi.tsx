import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, API_VERSION } from "../../constants/constants";
import {
  IReviewProduct,
  IReviewProductReq,
  IDeleteReview,
} from "./types/productApi.types";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["productTagTypes"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${API_VERSION}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Original Products Api was called with
    // Tanstack(React Query), Only the review API's are called here

    reviewProduct: builder.mutation<IReviewProduct, IReviewProductReq>({
      query: ({ id, ...payload }) => ({
        url: `products/review/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),

    deleteReview: builder.mutation<
      IDeleteReview,
      { productId: any; userId: string }
    >({
      query: ({ productId, userId }) => ({
        url: `/products/deleteReview/${productId}`,
        method: "PATCH",
        body: { userId },
      }),
    }),

    updateReview: builder.mutation<IDeleteReview, IReviewProductReq>({
      query: ({ id, ...payload }) => ({
        url: `products/updateReview/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useReviewProductMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = productApi;
