import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StarRatingComponent from "react-star-rating-component";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../redux/api/productApi";
import { useGetProductQuery } from "../redux/api/api";
import toast from "react-hot-toast";
import { useGetOrderQuery } from "../redux/api/orderApi";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/auth/authSlice";

const schema = z.object({
  review: z.string().min(1, "Review is required"),
});

const EditProductComp = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const orderId = urlParams.get("order-details");
  const { id: productId } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    data: orderDetails,
    isLoading: isLoadingOrderDetails,
    isError: isErrorOrderDetails,
  } = useGetOrderQuery(orderId);

  const ratings = orderDetails?.product?.ratings;

  const [
    deleteReview,
    { isLoading: isLoadingDeleteReview, isError: isLoadingDeleteError },
  ] = useDeleteReviewMutation();

  const {
    data: product,
    error: isErrorProduct,
    isLoading: isLoadingProduct,
  } = useGetProductQuery(productId);
  const onStarClick = (nextValue: number) => {
    setRating(nextValue);
  };

  const [
    updateReview,
    { isLoading: isLoadingUpdateReview, isError: isErrorUpdateReview },
  ] = useUpdateReviewMutation();

  const user = useSelector(selectUser);

const onSubmit = async (data: any) => {
  const payload = {
    id: productId,
    userID: user?._id,
    star: rating,
    review: data.review,
    reviewDate: new Date().toISOString(),
  };

  try {
    const res = await updateReview({ ...payload }).unwrap();
    toast.success(res.message || "Review Updated");
    navigate(`/productDetails/${product?._id}`);
  } catch (error: any) {
    toast.error(error.data?.message || "Failed to update review");
  }
};

  return (
    <>
      <div className="font-bold text-3xl text-purple-600 my-4">
        Review Products
      </div>
      <div className="flex justify-between gap-10 my-3">
        <div className="w-[50%] border-[2px] shadow-2xl border-purple-600 p-2 rounded-xl">
          <div className="">
            <span className="text-[12px]">Product Name:</span>{" "}
            <span className="font-medium mb-4 flex flex-col">
              {product?.name}
            </span>
          </div>
          <div>
            <span className="text-[12px]">Product Image: </span>

            <img
              src={product?.productImg}
              alt="product-review-image"
              className="h-32 rounded-xl mb-4"
            />
          </div>

          <div className="">
            <span className="text-[12px]">Product Description:</span>

            <span className="flex font-medium  mb-4 flex-col">
              {product?.desc}
            </span>
          </div>
          <div className="">
            <span className="text-[12px]">Product Price:</span>
            <span className="font-medium flex flex-col text-3xl mb-4">
              N{product?.falsePrice}
            </span>
          </div>
          <div className="">
            <span className="text-[12px]">Product Quantity:</span>

            <span className="font-medium flex flex-col">
              {product?.quantity}
            </span>
          </div>
        </div>

        <div className="w-[50%] border-[2px] shadow-2xl border-purple-600 p-2 rounded-xl">
          <div className="flex flex-col gap-2 mt-4">
            <div className="font-medium">Rating:</div>
            <div>
              <StarRatingComponent
                name="rating"
                starCount={5}
                value={rating}
                onStarClick={onStarClick}
                renderStarIcon={() => (
                  <span style={{ fontSize: "3rem" }}>★</span>
                )}
              />
            </div>
            <div className="font-medium">Review:</div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-2"
            >
              <textarea
                {...register("review")}
                placeholder="Write your review here..."
                className="rounded-md p-2 w-full border-2"
                rows={8}
              />
              {errors.review && (
                <p className="text-red-500">
                  {errors.review.message as string}
                </p>
              )}

              <button
                type="submit"
                className="bg-purple-600 text-white font-medium py-2 px-4 rounded"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductComp;
