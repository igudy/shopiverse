import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetCoupon,
  IPostCoupon,
  IDeleteCoupon,
} from "./types/couponApi.types";
import { BASE_URL, API_VERSION } from "../../constants/constants";
import { Dispatch, SetStateAction } from "react";

export const couponApi = createApi({
  reducerPath: "couponApi",
  tagTypes: ["couponTagTypes"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/${API_VERSION}` }),
  endpoints: (builder) => ({
    getCoupons: builder.query<IGetCoupon, any>({
      query: () => `couponRoute/getCoupons`,
      providesTags: ["couponTagTypes"],
    }),
    getCoupon: builder.query<
      any,
      { couponName: string | Dispatch<SetStateAction<string>> }
    >({
      query: ({ couponName }) => `couponRoute/${couponName}`,
      providesTags: ["couponTagTypes"],
    }),
    createCoupon: builder.mutation<IDeleteCoupon, any>({
      query: (payload) => ({
        url: `couponRoute/createCoupon`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["couponTagTypes"],
    }),
    deleteCoupon: builder.mutation<any, { couponName: string }>({
      query: ({ couponName }) => ({
        url: `couponRoute/${couponName}`,
        method: "DELETE",
      }),
      invalidatesTags: ["couponTagTypes"],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
