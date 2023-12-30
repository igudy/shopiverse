import { useQuery } from "@tanstack/react-query";
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

// Get Products
const fetchProducts = async () => {
  const response = await publicRequest.get("/products");
  return response?.data;
};

// Create Products
export const createProduct = async (payload) => {
  const response = await publicRequest.post("/products", payload);
  return response?.data;
};

export const useProducts = () => {
  return useQuery({ queryKey: ["products"], queryFn: fetchProducts });
};
