import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StarRatingComponent from "react-star-rating-component";
import Mastercard from "../../assets/mastercard.png";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useReviewProductMutation } from "../redux/api/productApi";
import { useGetProductQuery } from "../redux/api/api";
import toast from "react-hot-toast";

const schema = z.object({
  review: z.string().min(1, "Review is required"),
});

const ReviewProductComp = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { id } = useParams<{ id: string }>();

  const [
    reviewProduct,
    { isLoading: isLoadingReview, isError: isLoadingError },
  ] = useReviewProductMutation();

  const { data: product, error, isLoading } = useGetProductQuery(id);
  console.log("product==>", { product, rating });

  const onStarClick = (nextValue: number) => {
    setRating(nextValue);
  };

  const onSubmit = async (data: any) => {
    const payload = {
      id: id,
      star: rating,
      review: data.review,
      reviewDate: new Date().toISOString(),
    };
    const res = await reviewProduct({ ...payload }).unwrap();
    toast.success(res.message || "Review Submitted");
    navigate(`/productDetails/${product?._id}`)
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

export default ReviewProductComp;
