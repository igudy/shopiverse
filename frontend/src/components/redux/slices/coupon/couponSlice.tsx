import { createSlice } from '@reduxjs/toolkit'

interface CouponState {
  coupon: string | null;
}

const initialState: CouponState = {
    coupon: null,
}

const couponSlice = createSlice({
  name: "coupon",
  initialState,
    reducers: {
    SAVE_COUPON(state, action)
    {
        state.coupon = action.payload;
    },
    REMOVE_COUPON(state, action) {
        state.coupon = null;
    }
  }
});

export const {SAVE_COUPON, REMOVE_COUPON} = couponSlice.actions

export default couponSlice.reducer