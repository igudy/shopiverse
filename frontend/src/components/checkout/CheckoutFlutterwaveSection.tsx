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
  console.log("user===>", user);
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
      orderStatus: "Order Placed...",
      cartItems,
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
    } else if (status === "failed")
    {
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
      console.log("response", response);
      window.location.href = response.data.data.link;
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <div>
      <div className="flex px-10 gap-10 mb-10">
        <div className="w-[50%]">
          <CheckoutSummary />
        </div>
        <div className="w-[50%] mt-10">
          <div>
            <h3 className="text-2xl flex justify-center">
              Flutterwave Checkout
            </h3>
            <button
              type="button"
              onClick={payWithFlutterwave}
              className="flex justify-center items-center 
                my-4 rounded-xl shadow-xl bg-purple-500
                text-white p-4 w-full hover:bg-purple-400"
            >
              <BiLogoFlutter className="w-8 h-8 mr-2" />
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlutterwaveSection;
