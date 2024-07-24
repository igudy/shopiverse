import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetBrand,
  IDeleteBrand,
  IPostBrand,
  IGetBrands,
} from "./types/brandApi.types";
import { BASE_URL, API_VERSION } from "../../constants/constants";

export const brandApi = createApi({
  reducerPath: "brandApi",
  tagTypes: ["brandTagTypes"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/${API_VERSION}` }),
  endpoints: (builder) => ({
    getBrand: builder.query<IGetBrands, any>({
      query: () => `brandRoute/getBrands`,
      providesTags: ["brandTagTypes"],
    }),
    createBrand: builder.mutation<IPostBrand, any>({
      query: (payload) => ({
        url: `brandRoute/createBrand`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["brandTagTypes"],
    }),
    deleteBrand: builder.mutation<IDeleteBrand, any>({
      query: (slug) => ({
        url: `brandRoute/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brandTagTypes"],
    }),
  }),
});

export const {
  useGetBrandQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
