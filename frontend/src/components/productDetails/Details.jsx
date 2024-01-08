import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery, useGetProductsQuery } from "../redux/api/api";

const Details = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductQuery(id);
  console.log(data);

  return (
    <div className="my-5 mx-10">
      <div>
        <div className="text-sm text-gray-500 font-medium">
          Home <span className="mx-3"> &gt; </span> {data?.category}
        </div>
        <div className="my-4 flex">
          <div className="shadow-xl p-1 rounded-xl">
            <img
              src={data?.productImg}
              className="rounded-lg object-cover cursor-pointer w-[400px] h-[400px]"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Details;
