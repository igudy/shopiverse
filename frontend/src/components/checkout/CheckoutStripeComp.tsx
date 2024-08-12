import React, { useEffect, useState } from "react";
import CheckoutSummary from "../checkoutdetails/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../redux/slices/cart/CartSlice";
import { selectUser } from "../redux/slices/auth/authSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../redux/slices/checkout/checkoutSlice";
import { extractIdAndCartQuantity } from "../../utils";
import toast from "react-hot-toast";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Card from "../admin/Card";
import { FaSpinner } from "react-icons/fa";
import { CardPayment } from "../cards/Card";
import { useNavigate } from "react-router-dom";

interface ICheckoutStripeComp{
  clientSecret: any,
  stripePromise: any,
  setClientSecret: any
}

const CheckoutStripeComp = ({ clientSecret, stripePromise, setClientSecret }: ICheckoutStripeComp) => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const customerEmail = "";
  // const customerEmail = user.email ?? "";

  const shippingAddress = localStorage.getItem("shippingAddress")
  const billingAddress = localStorage.getItem("billingAddress")
  const { coupon } = useSelector((state: any) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
  }, [dispatch, cartItems, coupon]);

  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  const productIDs = extractIdAndCartQuantity(cartItems);
  // console.log(newCartItems);
  // const newCartTotalAmount = calculateTotalPrice(cartItems, productIDs);
  // console.log(newCartTotalAmount);

  
  const stripe = useStripe();
  const elements = useElements();
 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${import.meta.env.VITE_REACT_APP_FRONTEND_URL}/checkout-success`,
        },
        redirect: "if_required",
      })
      .then((result) => {
        // ok - paymentIntent // bad - error
        if (result.error) {
          toast.error(result.error.message as any);
          setMessage(result.error.message as any);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            // saveOrder();
            navigate(`/checkout-success`);
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <div className="flex px-10 gap-10 mb-10">

      <div className="w-[50%]">
        <CheckoutSummary />
      </div>
      <div className="w-[50%] mt-10">
        <div>
          <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
        </div>

        {/* Stripe form coming from their library */}
        <div>
          {clientSecret && (
            <div>
              {/****** SUMMARY ******/}
              <form onSubmit={handleSubmit}>
                <div>
                  {/***** STRIPE CHECKOUT *****/}
                  <CardPayment>
                    <h3>Stripe Checkout</h3>
                    <PaymentElement />
                    <button
                      disabled={isLoading || !stripe || !elements}
                      id="submit"
                    >
                      <span id="button-text">
                        {isLoading ? (
                          <FaSpinner />
                        ) : (
                            <div className="p-2 hover:bg-blue-800 bg-blue-600 text-white rounded-xl flex justify-center my-6 w-full">
                              Pay now
                          </div>

                          
                        )}
                      </span>
                    </button>
                    {/* Show any error or success messages */}
                    {message && (
                      <div>{message}</div>
                    )}
                  </CardPayment>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutStripeComp;
