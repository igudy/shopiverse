import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredUsers: [],
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts =
        products?.filter((product: any) =>
          product?.name?.toLowerCase().includes(search?.toLowerCase())
        ) ||
        products?.category?.toLowerCase().includes(search?.toLowerCase()) ||
        [];

      state.filteredProducts = tempProducts;
    },

    FILTER_USERS(state, action) {
      const { users, search } = action.payload;
      const tempUsers = users.filter(
        (user: any) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredUsers = tempUsers;
    },

    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products;
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a: any, b: any) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a: any, b: any) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProducts = products.slice().sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === "z-a") {
        tempProducts = products.slice().sort((a: any, b: any) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = tempProducts;
    },

    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tempProducts = [];

      if (category === "All") {
        tempProducts = products;
      } else {
        tempProducts = products?.filter(
          (product: any) => product?.category === category
        );
      }

      state.filteredProducts = tempProducts;
    },

    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action?.payload;
      let tempProducts = [];

      if (brand === "All") {
        tempProducts = products;
      } else {
        tempProducts = products?.filter(
          (product: any) => product?.brand === brand
        );
      }

      state.filteredProducts = tempProducts;
    },

    FILTER_BY_PRICE(state, action) {
      const { products, price } = action?.payload;
      let tempProducts = [];
      tempProducts = products?.filter(
        (product: any) =>
          product?.price >= price[0] && product?.price <= price[1]
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTER_USERS,
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilterUsers = (state: any) => state.filter.filteredUsers;
export const selectFilterProducts = (state: any) =>
  state.filter.filteredProducts;

export default filterSlice.reducer;
