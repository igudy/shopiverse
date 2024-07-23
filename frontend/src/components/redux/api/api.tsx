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

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL as string;
// const API_VERSION = "api";

// interface Product {
//   id: string;
//   name: string;
//   // Add other product fields as necessary
// }

// export const api = createApi({
//   reducerPath: "api",
//   tagTypes: ["productTagTypes"],
//   baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/${API_VERSION}` }),
//   endpoints: (builder) => ({
//     getProducts: builder.query<Product[], void>({
//       query: () => "products",
//       providesTags: ["productTagTypes"],
//     }),
//     getProduct: builder.query<Product, string>({
//       query: (id) => `products/${id}`,
//       providesTags: ["productTagTypes"],
//     }),
//     addProduct: builder.mutation<Product, Partial<Product>>({
//       query: (payload) => ({
//         url: "products",
//         method: "POST",
//         body: payload,
//       }),
//       invalidatesTags: ["productTagTypes"],
//     }),
//     updateProduct: builder.mutation<
//       Product,
//       { id: string; payload: Partial<Product> }
//     >({
//       query: ({ id, payload }) => ({
//         url: `products/${id}`,
//         method: "PUT",
//         body: payload,
//       }),
//       invalidatesTags: ["productTagTypes"],
//     }),
//     deleteProduct: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({
//         url: `products/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["productTagTypes"],
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductQuery,
//   useAddProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } = api;
