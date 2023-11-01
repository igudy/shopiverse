import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

// setAddItemToCart(Add one item for one product)
// setRemoveItemFromCart(Remove all items of one product)
// setIncreaseItemQuantity(Increase cart quantity)
// setDecreaseItemQuantity(Decrease the quantity)
// setClearItems(Clear all items from cart)
// setGetTotals(Total for all price)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      } else {
        // Declaring cartquantity for the first time
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);
        toast.success(`${action.payload.title} added to Cart`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      toast.success(`${action.payload.title} Removed From Cart`);
    },
    
    setIncreaseItemQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item)=>item.id === action.payload.id)

      if(itemIndex >= 0)
      {
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
      toast.success(`Cart cleared`)
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
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
  setAddItemToCart,
  setRemoveItemFromCart,
  setIncreaseItemQuantity,
  setDecreaseItemQuantity,
  setClearItems,
  setGetTotalAmount,
} = cartSlice.actions;

// this cart below is not the name, its the cart in the store
export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotalAmount = (state) => state.cart.cartTotalAmount;

export const selectTotalQuantity = (state) => state.cart.cartTotalQuantity;

export default cartSlice.reducer;
