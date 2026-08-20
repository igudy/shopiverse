import React, { useEffect, useState } from "react";
import CheckoutSummary from "../checkoutdetails/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../redux/slices/cart/CartSlice";
import { selectUser } from "../redux/slices/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreateOrderMutation } from "../redux/api/orderApi";
import axios from "axios";
import toast from "react-hot-toast";
import { BiLogoFlutter } from "react-icons/bi";

const CheckoutFlutterwaveSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [urlParams] = useSearchParams();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const { coupon } = useSelector((state: any) => state.coupon);

  const [createOrder, { isLoading: isLoadingCreateOrder }] =
    useCreateOrderMutation();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon }));
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
  }, [dispatch, cartItems, coupon]);

  const paymentMethodParsed = JSON.parse(
    localStorage.getItem("paymentMethod") as string
  );
  const shippingAddressParsed = JSON.parse(
    localStorage.getItem("shippingAddress") as string
  );

  const clearCart = () => {
    dispatch(CLEAR_CART({}));
  };

  const saveOrder = async () => {
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: totalAmount,
      orderStatus: "Order Placed",
      cartItems: cartItems,
      shippingAddress: shippingAddressParsed,
      paymentMethod: paymentMethodParsed,
      coupon: coupon || { name: "nil" },
    };

    try {
      const res = await createOrder(formData).unwrap();
      toast.success(res.message || "Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  // The final url
  // const test =
  //  "http://localhost:5173/response?status=successful&tx_ref=Shopiverse-242341342315348u78913&transaction_id=6553934"

  const status = urlParams.get("status");
  const tx_ref = urlParams.get("tx_ref");
  const transaction_id = urlParams.get("transaction_id");

  useEffect(() => {
    if (
      // tx_ref === import.meta.env.VITE_REACT_APP_TX_REF && // Uncomment if needed
      status === "successful" &&
      tx_ref !== "" &&
      transaction_id !== ""
    ) {
      toast.success("Payment successful");
      saveOrder();
    } else if (status === "failed") {
      toast.error("Payment Failed, please try again later");
    }
  }, [status, tx_ref, transaction_id]);

  const payWithFlutterwave = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/orderRoute/payWithFlutterwave`,
        {
          items: cartItems.map((item: any) => {
            return {
              _id: item._id,
              cartQuantity: item.quantity,
            };
          }),
          userID: user._id,
        }
      );
      window.location.href = response.data.data.link;
      if (response.data.data.link) {
        clearCart();
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <div className="px-3 sm:px-6 md:px-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10">
        <div className="w-full lg:w-1/2">
          <CheckoutSummary />
        </div>
        <div className="w-full lg:w-1/2 mt-4 lg:mt-10">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-center mb-4">
              Flutterwave Checkout
            </h3>
            <button
              type="button"
              onClick={payWithFlutterwave}
              className="flex justify-center items-center my-4 rounded-xl shadow-xl bg-purple-500 text-white p-3 sm:p-4 w-full hover:bg-purple-400 transition text-sm sm:text-base font-medium"
            >
              <BiLogoFlutter className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlutterwaveSection;
