import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import CheckoutStripeComp from "../../components/checkout/CheckoutStripeComp";
import Footer from "../../components/footer/Footer";
import {
  Elements,
} from "@stripe/react-stripe-js";
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
import CircularProgress from "@mui/material/CircularProgress";  // Import CircularProgress
import Box from "@mui/material/Box";  // Import Box for centering

const CheckoutStripe = () => {
  const backendUrl: string = import.meta.env.VITE_REACT_APP_BACKEND_URL as string;
  const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PK);

  const [clientSecret, setClientSecret] = useState("");
  const user = useSelector(selectUser);
  console.log("🚀 ~ CheckoutStripe ~ user:", user)
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

  return (
    <div>
      <Navbar />
      {!clientSecret ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh"
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutStripeComp
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
