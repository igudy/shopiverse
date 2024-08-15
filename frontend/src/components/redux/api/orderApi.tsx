import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetOrder,
  IGetOrders,
  ICreateOrder,
  IUpdateOrder,
} from "./types/orderApi.types";
import { BASE_URL, API_VERSION } from "../../constants/constants";

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["orderTagTypes"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${API_VERSION}`,
    credentials: "include",
  }),
    endpoints: (builder) => ({
    //   Single
    getOrder: builder.query<IGetOrder, any>({
      query: () => `orderRoute/getOrder`,
      providesTags: ["orderTagTypes"],
    }),
        // All Orders
    getOrders: builder.query<IGetOrders, any>({
      query: () => `orderRoute/getOrders`,
      providesTags: ["orderTagTypes"],
    }),
    // Create Orders
    createOrder: builder.mutation<ICreateOrder, any>({
      query: (payload) => ({
        url: `orderRoute/createBrand`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orderTagTypes"],
    }),
    // Update Orders
    updateOrder: builder.mutation<IUpdateOrder, any>({
      query: (id) => ({
        url: `orederRoute/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orderTagTypes"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation
} = orderApi;
