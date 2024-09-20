import React, { useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import CheckoutSummary from "../checkoutdetails/CheckoutSummary";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../redux/slices/cart/CartSlice";
import toast from "react-hot-toast";
import { selectUser } from "../redux/slices/auth/authSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../redux/slices/checkout/checkoutSlice";
import { useCreateOrderMutation } from "../redux/api/orderApi";
import { Card } from "@mui/material";

const CheckoutPaypalSection = () => {
  const navigate = useNavigate();
  const backendUrl: string = import.meta.env
    .VITE_REACT_APP_BACKEND_URL as string;
  const totalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state: any) => state.coupon);
  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");

  const clearCart = () => {
    dispatch(CLEAR_CART({}));
  };

  useEffect(() => {
    if (payment === "successful" && cartTotalAmount > 0) {
      toast.success("Payment successful");
      saveOrder();
    }
    if (payment === "failed") {
      toast.success("Payment Failed, please try again later");
    }
  }, [payment, cartTotalAmount]);

  const [createOrder, { isLoading: isLoadingCreateOrder }] =
    useCreateOrderMutation({});

  const paymentMethodParsed = JSON.parse(
    localStorage.getItem("paymentMethod") as string
  );

  const shippingAddressParsed = JSON.parse(
    localStorage.getItem("shippingAddress") as string
  );

  // Save order to Order History
  const saveOrder = async () => {
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleDateString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed",
      cartItems,
      shippingAddress: shippingAddressParsed,
      paymentMethod: paymentMethodParsed,
      coupon: coupon != null ? coupon : { name: "nil" },
    };

    try {
      const res = await createOrder(formData).unwrap();
      toast.success(res.message || "Order created successfully");
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error("Failed to create order");
    }
  };

  const clientId: any = process.env.VITE_REACT_APP_PAYPAL_CLIENT_ID;

  const initialOptions = {
    "client-id": clientId,
    currency: "NGN",
    intent: "capture",
  };

  // function extractCartProperties(arr: any) {
  //   return arr.map((item: any) => {
  //     return { sku: item.sku, quantity: item.quantity };
  //   });
  // }

  // Frontend implementation of create order.

  //   Create Order paypal
  // const createOrderPaypal = (data: any) => {
  //   return fetch(
  //     `${process.env.REACT_APP_BACKEND_URL}/my-server/create-paypal-order`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },

  //       body: JSON.stringify({
  //         product: {
  //           description: "Shopito product",
  //           cost: cartTotalAmount,
  //         },
  //         purchase_units: [
  //           {
  //             amount: {
  //               value: cartTotalAmount,
  //             },
  //           },
  //         ],
  //       }),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((order) => order.id);
  // };

  // const onApprove = (data: any) => {
  //   return fetch(
  //     `${process.env.REACT_APP_BACKEND_URL}/my-server/capture-paypal-order`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         orderID: data.orderID,
  //       }),
  //     }
  //   ).then((response) => response.json());
  // };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <section>
        <div>
          <form>
            <div className="flex px-10 gap-10 mb-10">
              <div className="w-[50%]">
                <CheckoutSummary />
              </div>
              <div className="w-[50%]">
                <h3 className="text-2xl flex justify-center mt-10">
                  Paypal Checkout
                </h3>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: cartTotalAmount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions: any) => {
                    return actions.order.capture().then((details: any) => {
                      const status = details.status;
                      if (status === "COMPLETED") {
                        toast.success("Payment Successful");
                        saveOrder();
                      } else {
                        toast.error(
                          "Something went wrong!!! Please Contact us."
                        );
                      }
                    });
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </PayPalScriptProvider>
  );
};

export default CheckoutPaypalSection;
