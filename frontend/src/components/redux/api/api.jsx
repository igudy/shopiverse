import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API_VERSION = "api";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["productTagTypes"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/${API_VERSION}` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: ["productTagTypes"],
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ["productTagTypes"],
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "products",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["productTagTypes"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["productTagTypes"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productTagTypes"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductQuery,
  useUpdateProductQuery,
  useDeleteProductQuery,
} = api;
