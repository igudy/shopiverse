import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery, useGetProductsQuery } from "../redux/api/api";
import { HorizontalLine } from "../reusable/HorizontalLine";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";

const Details = () => {
  const { id } = useParams();

  // Skipped image slider logic
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);

  const { data, error, isLoading } = useGetProductQuery(id);
  console.log(data);

  return (
    <div className="my-5 mx-10">
      <div>
        <div className="text-sm text-gray-500 font-medium">
          Home <span className="mx-3"> &gt; </span> {data?.category}
        </div>
        <div className="my-4 flex">
          <div className="p-1 rounded-xl w-[50%]">
            <img
              src={data?.productImg}
              className="rounded-lg object-cover cursor-pointer w-[60%] h-[400px] shadow-lg"
            />
          </div>
          <div className="w-[50%]">
            <div className="font-bold capitalize text-2xl">{data?.name}</div>
            <div>
              Brand:{" "}
              <span className="font-bold text-purple-700 cursor-pointer">
                {data?.brand}
              </span>
            </div>
            <HorizontalLine />
            <div className="flex gap-5 text-4xl font-bold items-center">
              <div>₦{data?.price}.00</div>
              <div className="text-gray-400 text-2xl font-medium line-through">
                ₦{data?.falsePrice}.00
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {data?.quantity} units availiable
            </div>
            <HorizontalLine />
            <div className="flex items-center gap-1 font-bold">
              5
              <AiFillStar className="text-yellow-500" size={23} />
              <div className="text-sm font-medium text-gray-500">
                (5 verified ratings)
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="mt-3 font-bold text-2xl text-gray-500">
                Quantity
              </div>
              <div className="border-2 p-1 rounded-lg gap-5 flex items-center justify-center font-semibold">
                <div className="w-10 h-10 cursor-pointer hover:bg-gray-100 bg-white rounded-lg shadow-lg flex justify-center items-center text-2xl">
                  -
                </div>
                <div>1</div>
                <div className="w-10 h-10 cursor-pointer hover:bg-purple-600 bg-purple-500 rounded-lg shadow-lg flex justify-center items-center text-2xl">
                  +
                </div>
              </div>
            </div>

            <div className="bg-purple-500 hover:bg-purple-600 cursor-pointer text-white w-full flex justify-center items-center rounded-lg font-bold text-sm h-10 border-1 mt-5">
              Add to Cart
            </div>
            <HorizontalLine />
            <div className="text-xl font-bold text-purple-800 mb-2">
              Description
            </div>
            <div>{data?.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
