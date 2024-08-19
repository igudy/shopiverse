import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery, useGetProductsQuery } from "../redux/api/api";
import { HorizontalLine } from "../reusable/HorizontalLine";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../redux/slices/cart/CartSlice";
import { useSaveCartToDBMutation } from "../redux/api/cartApi";

const Details = () => {
  const { id } = useParams();

  // ***** Skipped image slider logic ***** //
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const { data: product, error, isLoading } = useGetProductQuery(id);
  const [saveCartDB, { isLoading: isLoadingCartDB }] =
    useSaveCartToDBMutation();

  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart: any) => cart._id === id);
  const isCartAdded = cartItems.findIndex((cart: any) => {
    return cart._id === id;
  });

  const addToCart = (product: any) => {
    dispatch(ADD_TO_CART(product));
    saveCartDB({
      cartItems: JSON.parse(localStorage.getItem("cartItems") as string) as [],
    });
  };

  const decreaseCart = (product: any) => {
    dispatch(DECREASE_CART(product));
    saveCartDB({
      cartItems: JSON.parse(localStorage.getItem("cartItems") as string) as [],
    });
  };


  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({}));
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
  }, [cartItems, dispatch]);

  return (
    <div className="my-5 mx-10">
      <div>
        <div className="text-sm text-gray-500 font-medium">
          Home <span className="mx-3"> &gt; </span> {product?.category}
        </div>
        <div className="my-4 flex">
          <div className="p-1 rounded-xl w-[50%]">
            <img
              src={product?.productImg}
              className="rounded-lg object-cover cursor-pointer w-[60%] h-[400px] shadow-lg"
            />
          </div>
          <div className="w-[50%]">
            <div className="font-bold capitalize text-2xl">{product?.name}</div>
            <div>
              Brand:
              <span className="font-bold text-purple-700 cursor-pointer">
                {product?.brand}
              </span>
            </div>
            <HorizontalLine />
            <div className="flex gap-5 text-4xl font-bold items-center">
              <div>₦{product?.price}.00</div>
              <div className="text-gray-400 text-2xl font-medium line-through">
                ₦{product?.falsePrice}.00
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {product?.quantity} units availiable
            </div>
            <div className="text-sm text-gray-600">
              {product?.sold || "0"} sold
            </div>
            <HorizontalLine />
            <div className="flex items-center gap-1 font-bold">
              5
              <AiFillStar className="text-yellow-500" size={23} />
              <div className="text-sm font-medium text-gray-500">
                (5 verified ratings)
              </div>
            </div>

            {isCartAdded < 0 ? null : (
              <>
                {" "}
                <div className="flex items-center gap-2">
                  <div className="mt-3 font-bold text-2xl text-gray-500">
                    Quantity
                  </div>
                  <div className="border-2 p-1 rounded-lg gap-5 flex 
                  items-center justify-center font-semibold">
                    <div
                      className="w-10 h-10 cursor-pointer 
                      hover:bg-gray-100 bg-white rounded-lg 
                      shadow-lg flex justify-center items-center
                       text-2xl"
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </div>
                    <div>{cart.cartQuantity}</div>
                    <div
                      className="w-10 h-10 cursor-pointer 
                      hover:bg-purple-600 bg-purple-500 
                      rounded-lg shadow-lg flex justify-center 
                      items-center text-2xl"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Product Quantity */}
            {product?.quantity > 0 ? (
              <>
                <button
                  className="bg-purple-500 hover:bg-purple-600 
                  cursor-pointer text-white w-full flex 
                  justify-center items-center rounded-lg 
                  font-bold text-sm h-10 border-1 mt-5"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <>
                <button
                  disabled
                    className="bg-purple-500 
                    hover:bg-purple-600 cursor-pointer 
                  text-white w-full flex justify-center 
                  items-center rounded-lg font-bold text-sm 
                  h-10 border-1 mt-5"
                >
                  Out of Stock
                </button>
              </>
            )}

            <HorizontalLine />
            <div className="text-xl font-bold text-purple-800 mb-2">
              Description
            </div>
            <div>{product?.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
