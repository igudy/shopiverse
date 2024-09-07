import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery, useGetProductsQuery } from "../redux/api/api";
import { HorizontalLine } from "../reusable/HorizontalLine";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../redux/slices/cart/CartSlice";
import {
  useAddToWishListMutation,
  useSaveCartToDBMutation,
} from "../redux/api/cartApi";
import toast from "react-hot-toast";

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

  const [
    addToWish,
    { isLoading: isLoadingAddWishList, isError: isErrorAddWishList },
  ] = useAddToWishListMutation();

  const addToWishList = async () => {
    try {
      const res = await addToWish({ productId: id }).unwrap();
      toast.success(res.message || "Product added to wishlist");
    } catch (error: any) {
      toast.error("Error: ", error);
    }
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({}));
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
  }, [cartItems, dispatch]);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (product?.ratings?.length) {
      const totalStars = product.ratings.reduce(
        (sum: number, review: any) => sum + review.star,
        0
      );
      const averageRating = totalStars / product.ratings.length;
      setRating(averageRating);
    }
  }, [product]);

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
              className="rounded-lg object-cover 
              cursor-pointer w-[60%] h-[400px] shadow-lg"
            />
          </div>
          <div className="w-[50%]">
            <div className="font-bold capitalize text-2xl">{product?.name}</div>
            <div>
              Brand:
              <span className="font-bold text-purple-700 cursor-pointer">
                {" "}
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
              <div>{Math.round(rating)}</div>

              <AiFillStar className="text-yellow-400" size={23} />
              <div>
                <span className="font-normal">(Verified Review)</span>
              </div>
            </div>

            {isCartAdded < 0 ? null : (
              <>
                <div className="flex items-center gap-2">
                  <div className="mt-3 font-bold text-2xl text-gray-500">
                    Quantity
                  </div>
                  <div
                    className="border-2 p-1 rounded-lg gap-5 flex 
                  items-center justify-center font-semibold"
                  >
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
              <div className="flex gap-5 items-center mt-5">
                <button
                  className="bg-purple-500 hover:bg-purple-600 
                  cursor-pointer text-white w-full flex 
                  justify-center items-center rounded-lg 
                  font-bold text-sm h-14 border-1"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-600 
                  cursor-pointer text-white w-full flex 
                  justify-center items-center rounded-lg 
                  font-bold text-sm h-14 border-1"
                  onClick={addToWishList}
                >
                  Add to Wishlist
                </button>
              </div>
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
