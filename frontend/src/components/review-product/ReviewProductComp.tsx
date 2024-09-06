import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Mastercard from "../../assets/mastercard.png";

// Define the validation schema using zod
const schema = z.object({
  review: z.string().min(1, "Review is required"),
});

const ReviewProductComp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission (e.g., send data to the backend)
  };

  return (
    <>
      <div className="font-bold text-3xl text-purple-600 my-4">
        Review Products
      </div>
      <div className="flex justify-between gap-10 my-3">
        <div className="w-[50%] border-[2px] shadow-2xl border-purple-600 p-2 rounded-xl">
          <div className="font-medium">
            Product Name: <span className="font-medium">Master Card</span>
          </div>
          <img src={Mastercard} alt="product-review-image" className="h-32" />
                    <div className="font-medium">
            Product Description: <span className="font-medium">Master Card</span>
          </div>
        </div>

        <div className="w-[50%] border-[2px] shadow-2xl border-purple-600 p-2 rounded-xl">
          <div className="flex flex-col gap-2 mt-4">
            <div className="font-medium">Rating:</div>
            <div>
              {/* Add your Star Rating component here */}
              **Star Rating Here**
            </div>
            <div className="font-medium">Review:</div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-2"
            >
              <textarea
                {...register("review")}
                placeholder="Write your review here..."
                className="border rounded-md p-2 w-full"
                rows={8}
              />
              {errors.review && (
                <p className="text-red-500">{errors.review.message}</p>
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
