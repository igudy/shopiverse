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
    // Single Order
getOrder: builder.query<IGetOrder, string | null>({
  query: (id) => `orderRoute/${id}`, 
  providesTags: ["orderTagTypes"],
}),
    // All Orders
    getOrders: builder.query<IGetOrders, any>({
      query: () => `orderRoute/`,
      providesTags: ["orderTagTypes"],
    }),
    // Create Order
    createOrder: builder.mutation<ICreateOrder, any>({
      query: (payload) => ({
        url: `orderRoute/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orderTagTypes"],
    }),
    // Update Order
    updateOrder: builder.mutation<IUpdateOrder, any>({
      query: (id) => ({
        url: `orderRoute/${id}`,
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
  useUpdateOrderMutation,
} = orderApi;
