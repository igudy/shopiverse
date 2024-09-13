import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/slices/cart/CartSlice";
import { useSaveCartToDBMutation } from "../redux/api/cartApi";
import toast from "react-hot-toast";
// import { SAVE_PAYMENT_METHOD } from "../redux/slices/checkout/checkoutSlice";
import { selectIsLoggedIn } from "../redux/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { SAVE_PAYMENT_METHOD } from "../redux/slices/checkout/checkoutSlice";

interface ICartBottomSection {
  paymentMethod: any;
  handlePaymentMethodChange: any;
}


const CartBottomSection = ({
  paymentMethod,
  handlePaymentMethodChange }
  : ICartBottomSection) =>
{
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [saveCartDB, { isLoading: isLoadingCartDB }] =
    useSaveCartToDBMutation();

  const clearCart = () => {
    dispatch(CLEAR_CART({}));
    saveCartDB({
      cartItems: JSON.parse(localStorage.getItem("cartItems") as string) as [],
    });
  };

  const paymentFunc = (e: any) => {
    if (paymentMethod === "")
    {
      return toast.error("Please select a payment method");
    }
    // dispatch(SAVE_PAYMENT_METHOD(paymentMethod)); 
    if (isLoggedIn) {
      navigate("/checkout-details")
    } else {
      navigate("/login?redirect=cart")
    }
  }

  return (
    <div>
      <div
        className="bottom-0 w-full px-5 py-2 xsm:mb-16 
      sm:mb-16 grid items-center"
      >
        <div className="grid items-center gap-2">
          <p className="text-sm font-medium text-center">
            Taxes and shipping will be calculated at shipping.
          </p>
          <button
            type="button"
            className="button-theme bg-theme-cart py-5 hover:bg-grey-800 text-white"
            onClick={paymentFunc}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartBottomSection;
