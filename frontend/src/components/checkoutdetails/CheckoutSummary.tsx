import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/slices/cart/CartSlice";
import { Link } from "react-router-dom";
import CouponDiscount from "../coupon/CouponDiscount";

const CheckoutSummary = () => {
  const coupon = useSelector((state: any) => state.coupon.coupon);

  console.log('coupon==>', coupon)

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: coupon }));
  }, [cartItems, dispatch, coupon]);

  return (
    <div>
      <h1 className="text-2xl font-bold px-2 text-purple-500 xsm:text-xl sm:text-xl mt-10 md:text-xl sm:mt-1">
        Checkout Summary
      </h1>
      {cartItems.length === 0 ? (
        <>
          <h1 className="text-xl font-bold">No item in your cart</h1>
          <div>
            <button className="">
              <Link to="/">Back To Shop</Link>
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="grid gap-2 p-2">
            <div className="flex justify-between">
              <div>Cart Item(s):</div>
              <div className="font-bold">{cartTotalQuantity}</div>
            </div>
            <div className="flex justify-between">
              <div>Subtotal</div>
              <div className="font-bold">${cartTotalAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Cart Discount if any */}
          <CouponDiscount />

          {cartItems.map((item: any, index: number) => (
            <div
              key={index}
              className="border-2 mt-2 border-purple-500 rounded-xl p-3 text-sm shadow-md bg-gray-100"
            >
              <div className="grid gap-2 p-2">
                <div className="flex justify-between">
                  <div className="text-left">Product:</div>
                  <div className="text-right font-bold">{item.name}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-left">Quantity:</div>
                  <div className="text-right font-bold">{item.cartQuantity}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-left">Unit Price:</div>
                  <div className="text-right font-bold">${item.price}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-left">Set Price:</div>
                  <div className="text-right font-bold">
                    ${item.price * item.cartQuantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;
