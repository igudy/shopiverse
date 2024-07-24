import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { getCartQuantityById } from "../../../../utils";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  fixedCartTotalAmount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// ADD_TO_CART(Add one item for one product)
// setRemoveItemFromCart(Remove all items of one product)
// setIncreaseItemQuantity(Increase cart quantity)
// setDecreaseItemQuantity(Decrease the quantity)
// setClearItems(Clear all items from cart)
// setGetTotals(Total for all price)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      // console.log(action.payload);
      const cartQuantity = getCartQuantityById(
        state.cartItems,
        action.payload._id
      );
      console.log(cartQuantity, action.payload);

      const productIndex = state.cartItems.findIndex(
        (item: any) => item._id === action.payload._id
      );

      if (productIndex >= 0) {
        // Item already exists in the cart
        // Increase the cartQuantity
        if (cartQuantity === action.payload.quantity) {
          state.cartItems[productIndex].cartQuantity += 0;
          toast.success("Max number of product reached!!!");
        } else {
          state.cartItems[productIndex].cartQuantity += 1;
          toast.success(`${action.payload.name} increased by one`, {
            position: "top-left",
          });
        }
      } else {
        // Item doesn't exists in the cart
        // Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      // save cart to LS
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART(state, action) {
      // console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item: any) => item._id === action.payload._id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item: any) => item._id !== action.payload._id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    setIncreaseItemQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      }
    },

    setDecreaseItemQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(`Item QTY Decreased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setClearItems: (state, action) => {
      state.cartItems = [];
      toast.success(`Cart cleared`);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setGetTotalAmount: (state, action) => {
      let { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalPrice = price * cartQuantity;

          cartTotal.totalAmount += totalPrice;
          cartTotal.totalQuantity += cartQuantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );

      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  setRemoveItemFromCart,
  setIncreaseItemQuantity,
  setDecreaseItemQuantity,
  setClearItems,
  setGetTotalAmount,
} = cartSlice.actions;

// This cart below is not the name, its the cart in the store
export const selectCartItems = (state: any) => state.cart.cartItems;
export const selectCartTotalQuantity = (state: any) =>
  state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state: any) => state.cart.cartTotalAmount;

export const selectPreviousURL = (state: any) => state.cart.previousURL;

export default cartSlice.reducer;
