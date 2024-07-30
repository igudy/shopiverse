import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
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
import { useDeleteCouponMutation, useGetCouponQuery, useGetCouponsQuery } from "../redux/api/couponApi";
import debounce from "lodash.debounce";
// import debounce from "lodash/debounce";
import { LoaderIcon } from "react-hot-toast";


const CartItems = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [saveCartDB, { isLoading: isLoadingCartDB }] = useSaveCartToDBMutation();

  const { fixedCartTotalAmount } = useSelector((state: any) => state.cart);

  const increaseCart = (cart: any) => {
    dispatch(ADD_TO_CART(cart));
    saveCartDB({
      cartItems: JSON.parse(localStorage.getItem("cartItems") as string) as [],
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
    saveCartDB({
      cartItems: JSON.parse(localStorage.getItem("cartItems") as string) as [],
    });
  };

  const [coupon, setCoupon] = useState<any>("");

  // const debouncedQuery = useCallback(
  //   debounce((query) => {
  //     setCoupon(query);
  //   }, 500),
  //   [coupon]
  // );

  const debouncedQuery = debounce((query) => {
      setCoupon(query);
    }, 100)

  const handleCouponChange = (event: any) => {
    debouncedQuery(event.target.value);
  };

  const {
    data: couponData,
    isLoading: isLoadingCoupon,
    error: isErrorCoupon,
    isSuccess: isSuccessCoupon
  } = useGetCouponQuery({ couponName: coupon }, { skip: !coupon });

  const {
    data: couponAllData,
    isLoading: isLoadingAllCoupon,
    error: isErrorAllCoupon,
  } = useGetCouponsQuery({});

  // const [deleteCoupon, { isLoading: isLoadingDeleteCoupon, isSuccess: isSuccessDeleteCoupon }] = useDeleteCouponMutation();
// The useCallback hook is used to memoize functions in React.
//  This means that the function reference doesn't change between
//   renders, which can be useful for optimizing performance and
//    preventing unnecessary re - renders of child components that
//     rely on the function.

// In the context of the removeCoupon function, using useCallback
// ensures that the function reference is stable across renders, which
//  can be beneficial if removeCoupon is passed down as a prop to child
//  components or used in other hooks that depend on stable function references.

  // const removeCoupon = useCallback(() => {
  //   deleteCoupon({ couponName: coupon }).then(() => {
  //     setCoupon("");
  //   });
  // }, [coupon, deleteCoupon]);

  //   useEffect(() => {
  //   if (isSuccessDeleteCoupon) {
  //     console.log("Coupon deleted successfully");
  //   }
  // }, [isSuccessDeleteCoupon]);

    const removeCoupon = () => {
    // deleteCoupon({ couponName: coupon }).then(() => {
      setCoupon("");
    // });
  };


  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <>
      {/* Cart Top Section */}
      <div className="">
        <div className="xsm:text-sm sm:text-sm">
          {/* If cart is empty */}
          {cartItems.length === 0 ? (
            <div className="h-screen">
              <div className="w-[80px] h-[80px]">
                <CartEmpty />
              </div>
            </div>
          ) : (
            <div
              className="border-2 rounded-xl border-purple-600 m-3 p-3 max-h-600px 
              overflow-y-auto"
            >
              {cartItems.map((cart: any, index: number) => {
                const { _id, name, price, productImg, cartQuantity } = cart;
                return (
                  <div className="flex justify-between my-5" key={_id}>
                    <div className="left-0">
                      <div className="flex flex-row">
                        <div className="rounded-lg ">
                          <img
                            src={productImg}
                            alt={name}
                            className={`relative bg-gradient-to-b py-2 
                            xsm:py-1 sm:py-2 px-3 transition-all 
                            duration-700 ease-in-out xsm:w-28 sm:w-28 w-24
                            hover:scale-95 text-white sm:my-[0.5px]`}
                          />
                        </div>
                        <div className="ml-[-50px] mt-2 z-20 bg-gray-300 w-12 h-5 xsm:w-10 xsm:h-4 rounded-xl">
                          <p className="text-sm text-center justify-center xsm:text-[12px] xsm:mt-[-2px]">
                            ${price}
                          </p>
                        </div>
                        <div className="mx-2 xsm:ml-4 flex-col">
                          <p className="font-bold xsm:font-normal">{name}</p>
                          <p>{name}</p>
                          <div className="flex items-center gap-6">
                            <div
                              className="bg-theme-cart bg-theme-cart rounded w-6 h-6  flex items-center justify-center active:scale-90 cursor-pointer"
                              onClick={() => decreaseCart(cart)}
                            >
                              {/* Decrease(-) */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-white stroke-[2]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 12h-15"
                                />
                              </svg>
                            </div>
                            <div className="bg-theme-cart bg-theme-cart rounded w-12 h-7  flex items-center justify-center active:scale-90 cursor-pointer">
                              <span className="text-white">{cartQuantity}</span>
                            </div>
                            <div
                              className="bg-theme-cart bg-theme-cart rounded w-6 h-6  flex items-center justify-center active:scale-90 cursor-pointer"
                              onClick={() => increaseCart(cart)}
                            >
                              {/* Increase(+) */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-white stroke-[2]"
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
                    </div>
                    <div className="right-0">
                      <div className="grid gap-y-3 justify-items-center">
                        <p className="font-bold">
                          ${(price * cartQuantity).toFixed(2)}
                        </p>
                        <div
                          className="bg-theme-cart bg-theme-cart rounded w-6 h-6 flex items-center justify-center active:scale-90 cursor-pointer"
                          onClick={() => removeFromCart(cart)}
                        >
                          <AiFillDelete className="w-5 h-5 lg:w-8 lg:h-8 text-white stroke-[2]" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 my-5 mx-3">
        <div className="p-4 border-2 rounded-xl shadow-md bg-white">
          <div className="my-5">
            <div className="flex justify-between items-center text-base font-semibold uppercase border-b pb-2">
              <div>Subtotal</div>
              <div className="text-black">${cartTotalAmount}</div>
            </div>
          </div>

      <div className="my-10">
      <div className="flex justify-between items-center mb-2">
          <div className="font-medium">Have a coupon?</div>
            {couponData ? <>
                <div className="text-red-500 font-bold p-2 rounded-xl 
            mb-4 hover:font-extrabold cursor-pointer" 
            onClick={removeCoupon}>
                Remove Coupon
            </div>
            </> : <>
            <div className="text-white bg-purple-600 p-2 rounded-xl mb-4 shadow-lg cursor-pointer">
                Add Coupon
            </div>
            </>}
          </div>
            
        <div className="flex">
          <input
            type="text"
            onChange={handleCouponChange}
            value={coupon}
            className="flex-1 p-2 border rounded-l-xl outline-none"
            placeholder="Coupon code"
          />
          <button className="bg-purple-500 text-white p-2 rounded-r-xl hover:bg-purple-600 transition">
            Verify
          </button>
        </div>
      </div>

      <div>
        {isLoadingCoupon ? (
          <p><LoaderIcon /></p>
        ) : isErrorCoupon ? (
          <p>Coupon not valid😢</p>
        ) : (
        <div>
          {isSuccessCoupon && <>
            <div className="font-medium border-purple-500 border-2 p-2 rounded-xl">
            Initial Total: ${fixedCartTotalAmount} {" "}
            | {couponData ? couponData.name : <> Coupon </>} | {" "}
            {couponData ? couponData.discount : <> Discount</>}
          </div>
          </>}
        </div>
        )}
      </div>
        </div>

        <div className="p-4 border-2 rounded-xl shadow-md bg-white">
          <div className="font-semibold mb-4 text-2xl">
            Please choose a payment method.
          </div>

          <label className="flex items-center bg-gray-100 p-2 shadow-md cursor-pointer mb-2 hover:translate-x-1 transition-all">
            <input
              type="radio"
              name="payment"
              value="stripe"
              className="mr-2"
              checked={paymentMethod === 'stripe'}
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
              checked={paymentMethod === 'flutterwave'}
              onChange={handlePaymentMethodChange}
            />
            <MdOutlineWaves className="text-yellow-500 mr-2" />
            <span>Flutterwave</span>
          </label>

          <label className="flex bg-gray-100 p-2 shadow-md items-center cursor-pointer mb-2 hover:translate-x-1 transition-all">
            <input
              type="radio"
              name="payment"
              value="paypal"
              className="mr-2"
              checked={paymentMethod === 'paypal'}
              onChange={handlePaymentMethodChange}
            />
            <FaPaypal className="text-blue-600 mr-2" />
            <span>PayPal</span>
          </label>

          <label className="flex bg-gray-100 p-2 shadow-md items-center cursor-pointer mb-2 hover:translate-x-1 transition-all">
            <input type="radio"
              name="payment"
              value="btc"
              checked={paymentMethod === 'btc'}
              onChange={handlePaymentMethodChange}
              className="mr-2" />
            <FaBitcoin className="text-orange-500 mr-2" />
            <span>Bitcoin (BTC)</span>
          </label>

          <label className="flex bg-gray-100 p-2 shadow-md items-center cursor-pointer mb-2 hover:translate-x-1 transition-all">
            <input
              type="radio"
              name="payment"
              value="wallet"
              checked={paymentMethod === 'wallet'}
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
