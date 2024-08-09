import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import CheckoutStripeComp from "../../components/checkout/CheckoutStripeComp";
import Footer from "../../components/footer/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../components/redux/slices/auth/authSlice";
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from "../../components/redux/slices/cart/CartSlice";
import { extractIdAndCartQuantity } from "../../utils";

const CheckoutStripe = () => {
  const [clientSecret, setClientSecret] = useState("");
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch()
  const totalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const customerEmail = "";
  const { coupon } = useSelector((state: any) => state.coupon);
  
    useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
    }, [dispatch, cartItems, coupon]);
  
  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  const productIDs = extractIdAndCartQuantity(cartItems);
  // console.log(newCartItems);
  // const newCartTotalAmount = calculateTotalPrice(cartItems, productIDs);
  // console.log(newCartTotalAmount);

  // const shippingAddress = useSelector(selectShippingAddress) || "";
  const shippingAddress = "";
  // const billingAddress = useSelector(selectBillingAddress) || "";
  const billingAddress = "";
  const backendUrl: string = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  
  const [message, setMessage] = useState("Initializing checkout...");

  useEffect(() => {
    // Create paymentIntent as soon as the page loads
    fetch(
      `${backendUrl}/api/order/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productIDs,
          // userEmail: customerEmail,
          shipping: shippingAddress,
          billing: billingAddress,
          description,
          coupon,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout")
        toast.error("Something went wrong!!!");
      });
  }, []);

  const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PK);

  return (
    <div>
      <Navbar />
        {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutStripeComp clientSecret={clientSecret} stripePromise={stripePromise}
            setClientSecret={setClientSecret} />
        </Elements>
      )}
      <Footer />
    </div>
  );
};

export default CheckoutStripe;
