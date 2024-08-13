import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useGetCouponQuery, useGetCouponsQuery } from "../redux/api/couponApi";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../redux/slices/cart/CartSlice";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { selectIsLoggedIn } from "../redux/slices/auth/authSlice";
import { useSaveCartToDBMutation } from "../redux/api/cartApi";
import { REMOVE_COUPON, SAVE_COUPON } from "../redux/slices/coupon/couponSlice";

const CouponDiscount = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  // checkoout summary page
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [saveCartDB, { isLoading: isLoadingCartDB }] =
    useSaveCartToDBMutation();

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
    //   dispatch(SAVE_COUPON({coupon: query}))
  }, 100);
    


  const handleCouponChange = (event: any) => {
    debouncedQuery(event.target.value);
  };

  const {
    data: couponData,
    isLoading: isLoadingCoupon,
    error: isErrorCoupon,
    isSuccess: isSuccessCoupon,
  } = useGetCouponQuery({ couponName: coupon }, { skip: !coupon });

    useEffect(() => {
    if (isSuccessCoupon && couponData) {
      dispatch(setCoupon(couponData?.name));
    }
    }, [isSuccessCoupon, couponData, dispatch]);
    
  const {
    data: couponAllData,
    isLoading: isLoadingAllCoupon,
    error: isErrorAllCoupon,
  } = useGetCouponsQuery({});


  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      {" "}
      <div>
        {isLoadingCoupon ? (
          <p>
            <LoaderIcon />
          </p>
        ) : isErrorCoupon ? (
          <p>Coupon not valid😢</p>
        ) : (
          <div>
            {isSuccessCoupon && (
              <>
                <div className="font-medium border-purple-500 border-2 p-2 rounded-xl">
                  Initial Total: ${fixedCartTotalAmount} |{" "}
                  {couponData ? couponData.name : <> Coupon </>} |{" "}
                  {couponData ? couponData.discount : <> Discount</>}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponDiscount;
