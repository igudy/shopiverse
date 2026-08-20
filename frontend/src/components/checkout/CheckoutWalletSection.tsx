import React from "react";
import CheckoutSummary from "../checkoutdetails/CheckoutSummary";
import Mastercard from "../../assets/mastercard.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../redux/slices/cart/CartSlice";
import {
  useCreateOrderMutation,
  usePayWithWalletMutation,
} from "../redux/api/orderApi";
import toast from "react-hot-toast";

const CheckoutWalletSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>()
  const user = useSelector(selectUser);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  // const cartItems = JSON.parse(localStorage.getItem("cartItems") as string) || [];
  const shippingAddress =
    JSON.parse(localStorage.getItem("shippingAddress") as string) || {};

  const cartItems = useSelector(selectCartItems);

  const [
    payWallet,
    { isLoading: isLoadingPayWallet, isError: isErrorPayWallet },
  ] = usePayWithWalletMutation();

  // Save order
  const [createOrder, { isLoading: isLoadingCreateOrder }] =
    useCreateOrderMutation({});

  const paymentMethodParsed = JSON.parse(
    localStorage.getItem("paymentMethod") as string
  );

  const shippingAddressParsed = JSON.parse(
    localStorage.getItem("shippingAddress") as string
  );

  const { coupon } = useSelector((state: any) => state.coupon);

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
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

      const clearCart = () => {
    dispatch(CLEAR_CART({}));
  };

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
        clearCart();
      saveOrder();
      if (res.url) {
        console.log("Successful");
        // navigate(res.url)
      } else {
        console.log("Payment failed", res);
      }
    } catch (error) {
      console.error("Payment error", error);
    }
  };

  return (
    <div className="px-3 sm:px-6 md:px-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10">
        <div className="w-full lg:w-1/2">
          <CheckoutSummary />
        </div>
        <div className="w-full lg:w-1/2 mt-4 lg:mt-10">
          <div className="text-xl sm:text-2xl font-bold px-2 text-purple-500 mb-4">
            Checkout Wallet Section
          </div>
          <div className="border-2 rounded-lg p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="text-sm font-medium">Account Balance</div>
                <div className="text-lg sm:text-xl font-bold mt-2">
                  ₦{new Intl.NumberFormat("en-NG", {
                    minimumFractionDigits: 2,
                  }).format(user?.balance || 0)}
                </div>
              </div>
              <div>
                <img
                  src={Mastercard}
                  className="h-12 sm:h-16 md:h-20"
                  alt="mastercard"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-4">
              {cartTotalAmount > user?.balance ? (
                <>
                  <div className="text-red-600 font-medium text-lg sm:text-xl md:text-2xl text-center">
                    Insufficient Balance.
                  </div>
                  <div
                    className="p-3 rounded-md w-full bg-purple-800 text-white text-center my-2 cursor-pointer hover:bg-purple-600 transition text-sm sm:text-base"
                    onClick={() => navigate("/profile?wallet")}
                  >
                    Top Up Wallet
                  </div>
                </>
              ) : (
                <Link
                  to="/checkout-success"
                  onClick={payWithWallet}
                  className="p-3 rounded-md w-full bg-purple-800 text-white text-center my-2 cursor-pointer hover:bg-purple-600 transition text-sm sm:text-base font-medium"
                >
                  Pay Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutWalletSection;
