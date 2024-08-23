import React, { useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import CheckoutSummary from "../checkoutdetails/CheckoutSummary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartTotalAmount } from "../redux/slices/cart/CartSlice";
import toast from "react-hot-toast";

const CheckoutPaypalSection = () => {
  const navigate = useNavigate();
  const backendUrl: string = import.meta.env.VITE_REACT_APP_BACKEND_URL as string;
  const totalAmount = useSelector(selectCartTotalAmount);

  const createOrder = async (data: any, actions: any) => {
    return axios
      .post(`${backendUrl}/api/orderRoute/paypal/create-order`, { value: totalAmount })
      .then((res: any) => res.data.id);
  };

  const onApprove = async (data: any, actions: any) => {
    return axios
      .post(`${backendUrl}/api/orderRoute/paypal/capture-order`, {
        orderID: data.orderID,
      })
      .then((res) => {
        console.log("Order Captured:", res);
        navigate("/checkout-success");
        toast.success("Successful")
      })
      .catch((err) => {
        console.error("Capture Error:", err);
      });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_REACT_APP_CLIENT_ID }}>
      <div>
        <div className="flex px-10 gap-10 mb-10">
          <div className="w-[50%]">
            <CheckoutSummary />
          </div>
          <div className="w-[50%] mt-10">
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default CheckoutPaypalSection;
