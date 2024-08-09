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

interface ICheckoutStripeComp{
  clientSecret: any,
  stripePromise: any,
  setClientSecret: any
}

const CheckoutStripeComp = ({ clientSecret, stripePromise, setClientSecret }: ICheckoutStripeComp) => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const user = useSelector(selectUser);
  const customerEmail = "";
  // const customerEmail = user.email ?? "";

  // const shippingAddress = useSelector(selectShippingAddress) || "";
  const shippingAddress = "";
  // const billingAddress = useSelector(selectBillingAddress) || "";
  const billingAddress = "";
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
 
  const handleSubmit = () => {
    console.log("Handle submit.")
  }
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
              <h2>Checkout</h2>

              {/****** SUMMARY ******/}
              <form onSubmit={handleSubmit}>
                <div>
                  <CardPayment>
                    <CheckoutSummary />
                  </CardPayment>
                </div>
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
                          "Pay now"
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
