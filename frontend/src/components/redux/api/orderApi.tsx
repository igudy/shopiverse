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
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${API_VERSION}`,
    credentials: "include",
  }),
  tagTypes: ["Order", "Orders"],
  endpoints: (builder) => ({
    // Single Order
    getOrder: builder.query<IGetOrder, string | null>({
      query: (id) => `orderRoute/${id}`,
      providesTags: ["Order"],
    }),
    // All Orders
    getOrders: builder.query<IGetOrders, void>({
      query: () => `orderRoute/`,
      providesTags: ["Orders"],
    }),
    // Create Order
    createOrder: builder.mutation<ICreateOrder, any>({
      query: (payload) => ({
        url: `orderRoute/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),
    // Update Order
    updateOrder: builder.mutation<IUpdateOrder, any>({
      query: ({ id, ...payload }) => ({
        url: `orderRoute/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        "Orders",
      ],
    }),

    // Pay with Wallet
    payWithWallet: builder.mutation<any, any>({
      query: (payload) => ({
        url: `orderRoute/payWithWallet`,
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  usePayWithWalletMutation
} = orderApi;
