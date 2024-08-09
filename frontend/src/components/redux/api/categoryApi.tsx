import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDeleteCategory,
  IPostCategory,
  IGetCategories,
} from "./types/categoryApi.types";
import { BASE_URL, API_VERSION } from "../../constants/constants";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["categoryTagTypes"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${API_VERSION}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<IGetCategories, any>({
      query: () => `category/getCategories`,
      providesTags: ["categoryTagTypes"],
    }),

    createCategory: builder.mutation<IPostCategory, any>({
      query: (payload) => ({
        url: `category/createCategory`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["categoryTagTypes"],
    }),

    deleteCategory: builder.mutation<IDeleteCategory, any>({
      query: (slug) => ({
        url: `category/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categoryTagTypes"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
