import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
export const createProduct = async (payload) => {
  const response = await publicRequest.post("/products", payload);
  return response?.data;
};

// Update Product
export const updateProduct = async (id, payload) => {
  const response = await privateRequest.put(`/products/${id}`, payload);
  return response?.data;
};

// Delete Product
export const deleteProduct = async (id) => {
  await privateRequest.delete(`/products/${id}`);
};

export const useProducts = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
};
