import React, { useState, useEffect } from "react";
import { useGetProductQuery } from "../redux/api/api";
import { useParams } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import dayjs from "dayjs";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  const {
    data: productData,
    isError: isErrorProduct,
    isLoading: isLoadingProduct,
  } = useGetProductQuery(id);

  useEffect(() => {
    if (productData?.ratings?.length) {
      const totalStars = productData.ratings.reduce(
        (sum: number, review: any) => sum + review.star,
        0
      );
      const averageRating = totalStars / productData.ratings.length;
      setRating(averageRating);
    }
  }, [productData]);

  // const onStarClick = (nextValue: number) => {
  //   setRating(nextValue);
  // };

  console.log("productData==>", productData);

  return (
    <div>
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <div>
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={rating}
            renderStarIcon={() => <span className="text-xl sm:text-2xl">★</span>}
          />
        </div>
        <div className="text-sm sm:text-base text-gray-600">
          ({productData?.ratings?.length || 0} reviews)
        </div>
      </div>
      <div className="mt-4">
        {!productData?.ratings?.length ? (
          <p className="text-gray-500 text-sm sm:text-base">No reviews yet</p>
        ) : (
          <div className="space-y-3">
            {productData?.ratings.map((item: any, index: number) => (
              <div
                key={index}
                className="border p-3 sm:p-4 rounded-xl shadow-sm bg-gray-50"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm sm:text-base">{item.review}</p>
                  <p className="text-xs sm:text-sm text-gray-600">By: {item.name}</p>
                  <p className="text-xs text-gray-500">
                    {dayjs(item.reviewDate).format("MMMM D, YYYY h:mm A")}
                  </p>
                  <div>
                    <StarRatingComponent
                      name="rating"
                      starCount={5}
                      value={item.star}
                      renderStarIcon={() => (
                        <span className="text-sm sm:text-base">★</span>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
