import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetTransactions,
  ITransferFund,
  IVerifyAccount,
  IDepositFundStripe,
  IWebhook,
  IDepositFundFLW
 } from "./types/transactionApi.types";
import { BASE_URL, API_VERSION } from "../../constants/constants";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${API_VERSION}`,
    credentials: "include",
  }),
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    // Get Transactions
    getTransactions: builder.query<IGetTransactions, void>({
      query: () => ({
        url: `transactionRoute/getUserTransactions/`,
        method: "POST",
      }),
      providesTags: ["Transactions"],
    }),

    // Transfer Fund
    transferFund: builder.mutation<ITransferFund, void>({
      query: (payload) => ({
        url: `transactionRoute/transferFund/`,
        method: "POST",
        body: payload
      }),
    }),

    // Verify Account
    verifyAccount: builder.query<IVerifyAccount, void>({
      query: () => ({
        url: `transactionRoute/transferFund/`,
        method: "POST",
      }),
    }),

    // Deposit fund with stripe
    depositFundStripe: builder.mutation<IDepositFundStripe, void>({
      query: (payload) => ({
        url: `transactionRoute/depositFundStripe/`,
        method: "POST",
        body: payload
      }),
    }),

    // Webhook
    webhook: builder.query<IWebhook, void>({
      query: () => ({
        url: `transactionRoute/webhook/`,
        method: "POST",
      }),
    }),

    // Deposit Fund with Flutterwave
    depositFundFLW: builder.query<IDepositFundFLW, void>({
      query: (payload) => ({
        url: `transactionRoute/depositFundFLW/`,
        method: "POST",
        body: payload
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useTransferFundMutation,
  useVerifyAccountQuery,
  useDepositFundStripeMutation,
  useWebhookQuery,
  useDepositFundFLWQuery
} = transactionApi;
