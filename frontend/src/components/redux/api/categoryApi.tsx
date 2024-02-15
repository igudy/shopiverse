import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDeleteCategory,
  IGetCategory,
  IPostCategory,
} from "./types/categoryApi.types";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BACKEND_URL as string;
const API_VERSION: string = "api";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["categoryTagTypes"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/${API_VERSION}` }),
  endpoints: (builder) => ({
    getCategories: builder.query<IGetCategory, any>({
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
