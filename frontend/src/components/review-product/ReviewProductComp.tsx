import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StarRatingComponent from "react-star-rating-component";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useReviewProductMutation } from "../redux/api/productApi";
import { useGetProductQuery } from "../redux/api/api";
import toast from "react-hot-toast";
import { useGetOrderQuery } from "../redux/api/orderApi";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

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

  const [urlParams] = useSearchParams();
  const orderId = urlParams.get("order-details");

  const {
    data: orderDetails,
    isLoading: isLoadingOrderDetails,
    isError: isErrorOrderDetails,
  } = useGetOrderQuery(orderId);

  const ratings = orderDetails?.product?.ratings;
  console.log("ratings==>", ratings);
  console.log("ratings.length==>", ratings?.length);

  const { id } = useParams<{ id: string }>();

  const [
    reviewProduct,
    { isLoading: isLoadingReview, isError: isLoadingError },
  ] = useReviewProductMutation();

  const { data: product, error, isLoading } = useGetProductQuery(id);
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
    navigate(`/productDetails/${product?._id}`);
  };

  return (
    <>
      {(ratings?.length as any) > 0 ? (
        <>
          <div className="font-bold text-3xl text-purple-600 my-4">
            Product Review
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

            <div
              className="flex flex-col w-[50%] border-[2px] shadow-2xl 
            border-purple-600 p-2 rounded-xl"
            >
              {ratings?.slice(0, 1).map((item: any) => (
                <div key={item.id} className="">
                  <div className="text-3xl font-bold">Review:</div>

                  <div className="text-[12px] flex flex-col my-4">
                    <span>Name:</span>
                    <span className="font-bold text-xl">{item?.name}</span>
                  </div>
                  <div className="text-[12px] flex flex-col my-4">
                    <span className="">Review:</span>
                    <span className="font-bold text-xl">{item?.review}</span>
                  </div>
                  <div className="text-[12px] flex flex-col my-4">
                    <span>Date:</span>
                    <span className="font-bold text-xl">
                      {item?.reviewDate}
                    </span>
                  </div>
                  <div className="text-[12px] flex flex-col my-4">
                    <span>Star:</span>
                    <span className="font-bold text-xl">
                      {" "}
                      <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={item.star}
                        renderStarIcon={() => (
                          <span style={{ fontSize: "2rem" }}>★</span>
                        )}
                      />
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-10 items-center">
                <div
                  className="bg-purple-600 p-2 text-white w-32 
                  justify-center flex rounded-xl shadow-lg 
                  hover:bg-purple-700 cursor-pointer 
                  items-center gap-1"
                >
                  <div>
                    <CiEdit className="h-5 w-5" />
                  </div>
                  <div>Edit</div>
                </div>
                <div
                  className="bg-purple-600 p-2 text-white 
                  hover:bg-purple-700 cursor-pointer w-32 
                  justify-center flex rounded-xl shadow-lg 
                  items-center gap-1" 
                ><div>
                     <MdDeleteForever className="h-5 w-5" />
                  </div>
                  <div>
                  Delete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
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
      )}
    </>
  );
};

export default ReviewProductComp;
