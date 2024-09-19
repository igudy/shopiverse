import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { getCartQuantityById } from "../../../../utils";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? (JSON.parse(localStorage.getItem("cartItems") as string) as [])
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  fixedCartTotalAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// Apply discoount to cart
function applyDiscount(cartTotalAmount: any, discountPercentage: any) {
  var discountAmount = (discountPercentage / 100) * cartTotalAmount;
  var updatedTotal = cartTotalAmount - discountAmount;
  return updatedTotal;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state: any, action: any) {
      const cartQuantity = getCartQuantityById(
        state.cartItems,
        action.payload._id
      );

      const productIndex = state.cartItems.findIndex(
        (item: any) => item._id === action.payload._id
      );

      if (productIndex >= 0) {
        // Item already exists in the cart
        // Increase the cartQuantity
        if (cartQuantity === action.payload.quantity) {
          state.cartItems[productIndex].cartQuantity += 0;
          toast.error("Max number of product reached!!!");
        } else {
          state.cartItems[productIndex].cartQuantity += 1;
          toast.success(`${action.payload.name} increased by one`, {
            position: "top-center",
          });
        }
      } else {
        // Item doesn't exists in the cart
        // Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-center",
        });
      }
      // save cart to LS
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART(state: any, action) {
      const productIndex = state.cartItems.findIndex(
        (item: any) => item._id === action.payload._id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} decreased by one`, {
          position: "top-center",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item: any) => item._id !== action.payload._id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-center",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item: any) => item._id !== action.payload._id
      );

      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-center",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success(`Cart cleared`, {
        position: "top-center",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CALCULATE_SUBTOTAL(state, action) {
      const array: any = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a: any, b: any) => {
        return a + b;
      }, 0);

      state.fixedCartTotalAmount = totalAmount;
      if (action.payload && action?.payload?.coupon !== null) {
        const discountedTotalAmount = applyDiscount(
          totalAmount,
          action?.payload?.coupon?.discount
        );
        state.cartTotalAmount = discountedTotalAmount;
      } else {
        state.cartTotalAmount = totalAmount;
      }
    },

    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array: any = [];
      state.cartItems?.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array?.push(quantity);
      });
      const totalQuantity = array.reduce((a: any, b: any) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
} = cartSlice.actions;

// This cart below is not the name, its the cart in the store
export const selectCartItems = (state: any) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: any) =>
  state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: any) => state.cart.cartTotalAmount;

export const selectPreviousURL = (state: any) => state.cart.previousURL;

export default cartSlice.reducer;
