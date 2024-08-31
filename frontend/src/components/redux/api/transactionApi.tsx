import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetTransactions } from "./types/transactionApi.types";
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
  }),
});

export const { useGetTransactionsQuery } = transactionApi;
