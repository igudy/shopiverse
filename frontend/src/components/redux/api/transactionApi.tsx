import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetTransactions,
  ITransferFund,
  IVerifyAccount,
  IDepositFundStripe,
  IWebhook,
  IDepositFundFLW,
  ITransferFundRequest,
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
    transferFund: builder.mutation<ITransferFund, ITransferFundRequest>({
      query: (payload) => ({
        url: `transactionRoute/transferFund/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Transactions"],
    }),

    // Verify Account
    verifyAccount: builder.mutation<IVerifyAccount, { receiver: string }>({
      query: (payload) => ({
        url: `transactionRoute/verifyAccount/`,
        method: "POST",
        body: payload,
      }),
    }),

    // Deposit fund with stripe
    depositFundStripe: builder.mutation<IDepositFundStripe, void>({
      query: (payload) => ({
        url: `transactionRoute/depositFundStripe/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Transactions"],
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
        body: payload,
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useTransferFundMutation,
  useVerifyAccountMutation,
  useDepositFundStripeMutation,
  useWebhookQuery,
  useDepositFundFLWQuery,
} = transactionApi;
