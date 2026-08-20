import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/slices/cart/CartSlice";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/slices/auth/authSlice";
import { useSaveCartToDBMutation } from "../redux/api/cartApi";
import CartEmpty from "../modal/CartEmpty";
import CartBottomSection from "./CartBottomSection";
import { FaCcStripe, FaPaypal, FaBitcoin, FaWallet } from "react-icons/fa";
import { MdOutlineWaves } from "react-icons/md";
import {
  useDeleteCouponMutation,
  useGetCouponQuery,
  useLazyGetCouponQuery,
  useGetCouponsQuery,
} from "../redux/api/couponApi";
import debounce from "lodash.debounce";
// import debounce from "lodash/debounce";
import toast, { LoaderIcon } from "react-hot-toast";
import CouponDiscount from "../coupon/CouponDiscount";
import { REMOVE_COUPON } from "../redux/slices/coupon/couponSlice";
import { SAVE_PAYMENT_METHOD } from "../redux/slices/checkout/checkoutSlice";

const CartItems = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [saveCartDB, { isLoading: isLoadingCartDB }] =
    useSaveCartToDBMutation();

  const { fixedCartTotalAmount } = useSelector((state: any) => state.cart);

  const increaseCart = (cart: any) => {
    dispatch(ADD_TO_CART(cart));
    saveCartDB({
      cartItems: JSON.parse(localStorage.getItem("cartItems") as string) || [],
    });
  };

  const decreaseCart = (cart: any) => {
    dispatch(DECREASE_CART(cart));
    saveCartDB({
      cartItems: JSON.parse(localStorage.getItem("cartItems") as string) as [],
    });
  };

const removeFromCart = (cart: any) => {
  dispatch(REMOVE_FROM_CART(cart));
  dispatch(CALCULATE_TOTAL_QUANTITY({}));
  saveCartDB({
    cartItems: JSON.parse(localStorage.getItem("cartItems") as string) as [],
  });
};

  const [coupon, setCoupon] = useState("");

  const [triggerCouponQuery,
    { data: couponData, isLoading: isLoadingCoupon,
      isError: isErrorCoupon, isSuccess: isSuccessCoupon }
  ] = useLazyGetCouponQuery();

  // Function to handle coupon input
  const handleCouponChange = (event: any) => {
    setCoupon(event.target.value);
  };


  const verifyCoupon = () => {
    if (!coupon) {
      toast.error("Please enter a coupon code.");
    } else {
      triggerCouponQuery({ couponName: coupon });
      console.log("Coupon Data: ", couponData);
    }
  };


  const {
    data: couponAllData,
    isLoading: isLoadingAllCoupon,
    error: isErrorAllCoupon,
  } = useGetCouponsQuery({});


const removeCoupon = () => {
  setCoupon(""); 
  dispatch(REMOVE_COUPON({}));
};

  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);
    localStorage.setItem(
      "paymentMethod",
      JSON.stringify(selectedPaymentMethod)
    );
  };

  return (
    <>
      {/* Cart Top Section */}
      <div className="">
        <div className="xsm:text-sm sm:text-sm">
          {/* If cart is empty */}
          {cartItems.length === 0 ? (
            <div className="h-screen flex justify-center items-center">
              <CartEmpty />
            </div>
          ) : (
            <div
              className="border-2 rounded-xl border-purple-600 mx-2 sm:mx-3 p-2 sm:p-3 max-h-[70vh] sm:max-h-[600px] overflow-y-auto"
            >
              {cartItems.map((cart: any, index: number) => {
                const { _id, name, price, productImg, cartQuantity } = cart;
                return (
                  <div className="flex flex-col sm:flex-row justify-between my-5 gap-3 sm:gap-0" key={_id}>
                    <div className="flex flex-row items-start">
                      <div className="relative flex-shrink-0">
                        <img
                          src={productImg}
                          alt={name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg transition-all duration-700 ease-in-out hover:scale-95"
                        />
                        <div className="absolute -top-2 -right-2 bg-gray-300 px-2 py-0.5 rounded-xl z-10">
                          <p className="text-xs sm:text-sm text-center">
                            ₦{price}
                          </p>
                        </div>
                      </div>
                      <div className="ml-3 sm:ml-4 flex flex-col flex-1 min-w-0">
                        <p className="font-bold text-sm sm:text-base truncate">{name}</p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{name}</p>
                        <div className="flex items-center gap-3 sm:gap-6 mt-2">
                          <div
                            className="bg-theme-cart rounded w-6 h-6 flex items-center justify-center active:scale-90 cursor-pointer"
                            onClick={() => decreaseCart(cart)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 12h-15"
                              />
                            </svg>
                          </div>
                          <div className="bg-theme-cart rounded w-10 sm:w-12 h-7 flex items-center justify-center">
                            <span className="text-white text-sm sm:text-base">{cartQuantity}</span>
                          </div>
                          <div
                            className="bg-theme-cart rounded w-6 h-6 flex items-center justify-center active:scale-90 cursor-pointer"
                            onClick={() => increaseCart(cart)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 pl-2 sm:pl-0">
                      <p className="font-bold text-sm sm:text-base">
                        ₦{(price * cartQuantity).toFixed(2)}
                      </p>
                      <div
                        className="bg-theme-cart rounded w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center active:scale-90 cursor-pointer"
                        onClick={() => removeFromCart(cart)}
                      >
                        <AiFillDelete className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 my-5 mx-3">
        <div className="p-3 md:p-4 border-2 rounded-xl shadow-md bg-white">
          <div className="my-5">
            <div className="flex justify-between items-center text-base font-semibold uppercase border-b pb-2">
              <div>Subtotal</div>
              <div className="text-black">
                ₦{!isNaN(cartTotalAmount) ? cartTotalAmount : 0}
              </div>
            </div>
          </div>

          <div className="my-6 md:my-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div className="font-medium text-sm md:text-base">Have a coupon?</div>
              {coupon && (
                <>
                  <div
                    className="text-red-500 font-bold p-2 rounded-xl 
                    mb-4 hover:font-extrabold cursor-pointer"
                    onClick={removeCoupon}
                  >
                    Remove Coupon
                  </div>
                </>
              ) 
              }
            </div>

            <div className="flex">
              <input
                type="text"
                onChange={handleCouponChange}
                value={coupon}
                className="flex-1 p-2 border rounded-l-xl outline-none text-sm md:text-base min-w-0"
                placeholder="Coupon code"
              />
              <button className="bg-purple-500 text-white px-3 py-2 rounded-r-xl hover:bg-purple-600 transition text-sm md:text-base whitespace-nowrap"
                onClick={verifyCoupon}
              >
                Verify
              </button>
            </div>
          </div>

          {/* Coupon Discount */}
      <div>
          {isLoadingCoupon ? (
            <p>Loading...</p>
          ) : isErrorCoupon ? (
            <p>Coupon not valid 😢</p>
          ) : isSuccessCoupon && couponData ? (
            <div className="font-medium border-purple-500 border-2 p-2 rounded-xl">
             Coupon Applied: {couponData.name} | Discount: {couponData.discount}%
            </div>
          ) : null}
        </div>

          {/* Cart Discount if any */}
          {/* <CouponDiscount /> */}
        </div>

        <div className="p-3 md:p-4 border-2 rounded-xl shadow-md bg-white">
          <div className="font-semibold mb-4 text-lg md:text-2xl">
            Please choose a payment method.
          </div>

          <label className="flex items-center bg-gray-100 p-2 shadow-md cursor-pointer mb-2 hover:translate-x-1 transition-all">
            <input
              type="radio"
              name="payment"
              value="stripe"
              className="mr-2"
              checked={paymentMethod === "stripe"}
              onChange={handlePaymentMethodChange}
            />
            <FaCcStripe className="text-blue-700 mr-2" />
            <span>Stripe</span>
          </label>

          <label className="flex items-center cursor-pointer mb-2 bg-gray-100 p-2 shadow-md hover:translate-x-1 transition-all">
            <input
              type="radio"
              name="payment"
              value="flutterwave"
              className="mr-2"
              checked={paymentMethod === "flutterwave"}
              onChange={handlePaymentMethodChange}
            />
            <MdOutlineWaves className="text-yellow-500 mr-2" />
            <span>Flutterwave</span>
          </label>

          <label
            className="flex bg-gray-100 p-2 shadow-md 
          items-center cursor-pointer mb-2
          hover:translate-x-1 transition-all"
          >
            <input
              type="radio"
              name="payment"
              value="paypal"
              className="mr-2"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
            />
            <FaPaypal className="text-blue-600 mr-2" />
            <span>PayPal</span>
          </label>

          {/* <label className="flex bg-gray-100 p-2 shadow-md items-center cursor-pointer mb-2 hover:translate-x-1 transition-all">
            <input
              type="radio"
              name="payment"
              value="btc"
              checked={paymentMethod === "btc"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <FaBitcoin className="text-orange-500 mr-2" />
            <span>Bitcoin (BTC)</span>
          </label> */}

          <label className="flex bg-gray-100 p-2 shadow-md items-center cursor-pointer mb-2 hover:translate-x-1 transition-all">
            <input
              type="radio"
              name="payment"
              value="wallet"
              checked={paymentMethod === "wallet"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <FaWallet className="text-green-500 mr-2" />
            <span>Wallet</span>
          </label>
        </div>
      </div>

      {/* Cart Bottom Section */}
      <CartBottomSection
        paymentMethod={paymentMethod}
        handlePaymentMethodChange={handlePaymentMethodChange}
      />
    </>
  );
};

export default CartItems;
