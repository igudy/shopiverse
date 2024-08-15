import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentMethod: localStorage.getItem("paymentMethod")
    ? (JSON.parse(localStorage.getItem("paymentMethod") as string) as [])
    : [],
    shippingAddress: localStorage.getItem("shippingAddress")
    ? (JSON.parse(localStorage.getItem("shippingAddress") as string) as {})
    : {},
    billingAddress: localStorage.getItem("billingAddress")
    ? (JSON.parse(localStorage.getItem("billingAddress") as string) as {})
    : {},
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },

    SAVE_BILLING_ADDRESS(state, action) {
      state.billingAddress = action.payload 
      localStorage.setItem('billingAddress', JSON.stringify(state.billingAddress));
    },
    // SAVE_PAYMENT_METHOD(state: any, action) {
    //   state.paymentMethod = action.payload
    //   localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
    // },
    // SAVE_PAYMENT_METHOD(state, action) {
    //   state.paymentMethod = action.payload;
    //   localStorage.setItem(
    //     "paymentMethod",
    //     JSON.stringify(state.paymentMethod)
    //   );
    // },
    SAVE_PAYMENT_METHOD(state, action) {
      console.log("Action Payload:", action.payload);
      state.paymentMethod = action.payload;
      console.log("Updated State Payment Method:", state.paymentMethod);
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
  }
});

export const { SAVE_SHIPPING_ADDRESS, SAVE_BILLING_ADDRESS, SAVE_PAYMENT_METHOD } = checkoutSlice.actions;

export const selectShippingAddress = (state: any) => state?.checkout?.shippingAddress;
export const selectBillingAddress = (state: any) => state?.checkout?.billingAddress;
export const selectPaymentMethod = (state: any) => state?.checkout?.paymentMethod;

export default checkoutSlice.reducer;
