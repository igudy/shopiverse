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

  const onStarClick = (nextValue: number) => {
    setRating(nextValue);
  };

  console.log("productData==>", productData);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div>
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={rating}
            onStarClick={onStarClick}
            renderStarIcon={() => <span style={{ fontSize: "2rem" }}>★</span>}
          />
        </div>
        <div>({productData?.ratings?.length})</div>
      </div>
      <div>
        {productData?.ratings?.length < 1 ? (
          <>No reviews yet</>
        ) : (
          <>
            {productData?.ratings.map((item: any, index: number) => (
              <div
                key={index}
                className="border-[1.5px] p-2 rounded-xl shadow-sm my-2 text-[12px]"
              >
                <div className="flex flex-col">
                  <div className="font-medium text-md">{item.review}</div>
                  <div>By: {item.name}</div>
                  <div>{dayjs(item.reviewDate).format("MMMM D, YYYY h:mm A")}</div>
                  <div>
                    <StarRatingComponent
                      name="rating"
                      starCount={5}
                      value={item.star}
                      renderStarIcon={() => (
                        <span style={{ fontSize: "1rem" }}>★</span>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Reviews;
