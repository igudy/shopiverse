import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/slices/cart/CartSlice";
import { useSaveCartToDBMutation } from "../redux/api/cartApi";

const CartBottomSection = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const clearCart = () => {
    const [saveCartDB, { isLoading: isLoadingCartDB }] =
      useSaveCartToDBMutation();

    dispatch(CLEAR_CART({}));
    saveCartDB({
      cartItems: JSON.parse(localStorage.getItem("cartItems") as string) as [],
    });
  };

  return (
    <div>
      <div className="bottom-0 w-full px-5 py-2 xsm:mb-16 sm:mb-16 grid items-center">
        {/* <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold uppercase">SubTotal</h1>
          <h1 className="text-sm rounded bg-theme-cart justify-center text-center w-20 text-slate-100 py-0.5">
            ${cartTotalAmount}
          </h1>
        </div> */}
        <div className="grid items-center gap-2">
          <p className="text-sm font-medium text-center">
            Taxes and shipping will be calculated at shipping.
          </p>
          <button
            type="button"
            className="button-theme bg-theme-cart py-5 hover:bg-grey-800 text-white"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartBottomSection;
