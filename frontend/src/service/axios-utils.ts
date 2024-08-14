import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API_VERSION = "api";

export const privateRequest = axios.create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
  withCredentials: true,
});

export const publicRequest = axios.create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
});

// Get Product
const fetchProducts = async () => {
  const response = await publicRequest.get("/products");
  return response?.data;
};

// Create Product
export const createProduct = async (payload: any) => {
  const response = await privateRequest.post("/products", payload);
  return response?.data;
};

// Update Product
export const updateProductAxios = async ({ id, payload }: any) => {
  const response = await privateRequest.patch(`/products/${id}`, payload);
  return response?.data;
};

// Delete Product
export const deleteProduct = async (id: any) => {
  await privateRequest.delete(`/products/${id}`);
};

export const useProducts = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    // onSuccess: () => {
    //   queryClient.invalidateQueries("products");
    // },
  });
};
