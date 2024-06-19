import {
    AiFillDelete,
  } from "react-icons/ai";
  import { useDispatch, useSelector } from "react-redux";
  import {
    selectCartItems,
    selectTotalQuantity,
    setDecreaseItemQuantity,
    setGetTotalAmount,
    setIncreaseItemQuantity,
    setRemoveItemFromCart,
  } from "../redux/slices/cart/CartSlice";
  import { useEffect } from "react";
  
  const CartItems = ({
    item: { id, title, text, img, color, shadow, price, cartQuantity },
  }) => {
  
    const totalQuantity = useSelector(selectTotalQuantity);
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(setGetTotalAmount())
    },[cartItems, dispatch])
  
    const removeFromCart = () => {
      const temp = {id, title, text, img, price, color, shadow};
      dispatch(setRemoveItemFromCart(temp))
    }
  
    const increaseCartItem = () => {
      const temp = {id, title, text, img, price, color, shadow};
      dispatch(setIncreaseItemQuantity(temp))
    }
  
    const decreaseCartItem = () => {
      const temp = {id, title, text, img, price, color, shadow};
      dispatch(setDecreaseItemQuantity(temp))
    }
  
    return (
      <div className="xsm:text-sm sm:text-sm">
        <div className="flex justify-between my-5 ">
          <div className="left-0">
            <div className="flex flex-row">
              <img
                src={img}
                alt={title}
                className={`relative bg-gradient-to-b ${color} ${shadow} rounded-xl py-2 xsm:py-1 sm:py-2 px-3 transition-all duration-700 ease-in-out xsm:w-28 sm:w-28 w-40 hover:scale-95 text-white sm:my-[0.5px]`}
              />
              <div className="ml-[-50px] mt-2 z-20 bg-gray-300 w-12 h-5 xsm:w-10 xsm:h-4 rounded-xl">
              <p className="text-sm text-center justify-center xsm:text-[12px] xsm:mt-[-2px]">${price}</p>
              </div>
              <div className="mx-2 xsm:ml-4 flex-col">
                <p className="font-bold xsm:font-normal">{title}</p>
                <p>{text}</p>
                <div className="flex items-center gap-6">
                  <div className="bg-theme-cart bg-theme-cart rounded w-6 h-6  flex items-center justify-center active:scale-90 cursor-pointer">
                    {/* Decrease(-) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-white stroke-[2]"
                      onClick={() => decreaseCartItem()}
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
                  <div className="bg-theme-cart bg-theme-cart rounded w-6 h-6  flex items-center justify-center active:scale-90 cursor-pointer">
                    {/* Increase(+) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-white stroke-[2]"
                      onClick={() => increaseCartItem()}
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
              <p className="font-bold">${price * cartQuantity}</p>
              <div className="bg-theme-cart bg-theme-cart rounded w-6 h-6 flex items-center justify-center active:scale-90 cursor-pointer">
                <AiFillDelete className="w-5 h-5 lg:w-8 lg:h-8 text-white stroke-[2]" onClick={() => removeFromCart()}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CartItems;
  