import React from "react";
import CheckoutSummary from "../checkoutdetails/CheckoutSummary";
import Mastercard from "../../assets/mastercard.png";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../redux/slices/cart/CartSlice";
import { usePayWithWalletMutation } from "../redux/api/orderApi";
import toast from "react-hot-toast";

const CheckoutWalletSection = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  // const cartItems = JSON.parse(localStorage.getItem("cartItems") as string) || [];
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress") as string) || {};

    const cartItems = useSelector(selectCartItems);

  console.log("cartItems==>", cartItems)

  console.log("user==>", user)
  console.log("cartItems==>",
    cartItems.map((item: any) => ({
      _id: item._id,
      cartQuantity: item.quantity,
    })))

  const [
    payWallet,
    { isLoading: isLoadingPayWallet, isError: isErrorPayWallet },
  ] = usePayWithWalletMutation();


const payWithWallet = async () => {

  const payload = {
    items: cartItems.map((item: any) => ({
      _id: item._id,
      cartQuantity: item.quantity,
    })),
    cartItems,
    shippingAddress,
    coupon: "",
  };

  try {
    const res = await payWallet(payload).unwrap();
    if (res.url) {
      console.log("Successful")
      // navigate(res.url)
    } else {
      console.log("Payment failed", res);
    }
  } catch (error) {
    console.error("Payment error", error);
  }
};


  console.log("cartTotalAmount==>", cartTotalAmount);

  return (
    <div>
      <div className="flex px-10 gap-10 mb-10">
        <div className="w-[50%]">
          <CheckoutSummary />
        </div>
        <div className="w-[50%] mt-10">
          <div
            className="text-2xl font-bold px-2 text-purple-500 
          xsm:text-xl sm:text-xl md:text-xl sm:mt-1"
          >
            Checkout wallet section
          </div>
          <div className="border-2 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="text-sm font-medium">Account Balance</div>
                <div className="text-md font-bold mt-2">
                  ₦
                  {new Intl.NumberFormat("en-NG", {
                    minimumFractionDigits: 2,
                  }).format(user?.balance || 0)}
                </div>
              </div>
              <div>
                {/* Mastercard image */}
                <img
                  src={Mastercard}
                  className="h-20 "
                  alt="mastercard-image"
                />
              </div>
            </div>

            {/* Button */}
            <div className="flex flex-col justify-center items-center">
              {cartTotalAmount > user?.balance ? (
                <>
                  {" "}
                  <div className="text-red-600 font-medium text-2xl">
                    Insufficient Balance.
                  </div>
                  <div
                    className="p-2 rounded-md w-full bg-purple-700
               text-white text-center my-2 cursor-pointer
                hover:bg-purple-800"
                    onClick={() => navigate("/profile?wallet")}
                  >
                    Top Up Wallet
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/checkout-success"
                    onClick={payWithWallet}
                    className="p-2 rounded-md w-full bg-purple-700
               text-white text-center my-2 cursor-pointer
                hover:bg-purple-800"
                  >
                    Pay Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutWalletSection;
