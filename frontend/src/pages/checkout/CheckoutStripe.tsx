import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import CheckoutStripeComp from "../../components/checkout/CheckoutStripeComp";
import Footer from "../../components/footer/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../../components/redux/slices/cart/CartSlice";
import { extractIdAndCartQuantity } from "../../utils";
import { selectUser } from "../../components/redux/slices/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import Box from "@mui/material/Box"; // Import Box for centering
import { useCreateOrderMutation } from "../../components/redux/api/orderApi";

const CheckoutStripe = () => {
  const backendUrl: string = import.meta.env
    .VITE_REACT_APP_BACKEND_URL as string;
  const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PK);
  const [clientSecret, setClientSecret] = useState("");
  const user = useSelector(selectUser);
  const [message, setMessage] = useState("Initializing checkout...");

  const shippingAddress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress") as string)
    : "";

  const billingAddress = localStorage.getItem("billingAddress")
    ? JSON.parse(localStorage.getItem("billingAddress") as string)
    : "";

  useEffect(() => {
    // Create paymentIntent as soon as the page loads
    fetch(`${backendUrl}/api/orderRoute/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: productIDs,
        userEmail: user?.email,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
        coupon,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data?.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const { coupon } = useSelector((state: any) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
  }, [dispatch, cartItems, coupon]);

  const description = `eShop payment: email: ${user?.email}, Amount: ${totalAmount}`;

  const productIDs = extractIdAndCartQuantity(cartItems);

  const paymentMethodParsed = JSON.parse(
    localStorage.getItem("paymentMethod") as string
  );

  const shippingAddressParsed = JSON.parse(
    localStorage.getItem("shippingAddress") as string
  );

  const [createOrder, { isLoading: isLoadingCreateOrder }] =
    useCreateOrderMutation({});

  // Save order to Order History
  const saveOrder = async () => {
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleDateString(),
      orderAmount: totalAmount,
      orderStatus: "Order Placed",
      cartItems: cartItems.map((item: any) => ({
      _id: item._id,
      cartQuantity: item.quantity,
    })),
      shippingAddress: shippingAddressParsed,
      paymentMethod: paymentMethodParsed,
      coupon: coupon != null ? coupon : { name: "nil" },
    };

    try {
      const res = await createOrder(formData).unwrap();
      toast.success(res.message || "Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  return (
    <div>
      <Navbar />
      {!clientSecret ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutStripeComp
              saveOrder={saveOrder}
            clientSecret={clientSecret}
            stripePromise={stripePromise}
            setClientSecret={setClientSecret}
          />
        </Elements>
      )}
      <Footer />
    </div>
  );
};

export default CheckoutStripe;
