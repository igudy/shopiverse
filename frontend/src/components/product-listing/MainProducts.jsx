import React from "react";
import ProductCards, { AllProductsCard } from "../reusable/ProductCards";
import { useGetProductsQuery } from "../redux/api/api";

const MainProducts = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  console.log(data);
  return (
    <div>
      <p className="relative text-5xl sm:text-4xl sm:mb-2 font-extrabold my-10">
        All Products
      </p>
      {/* Remeber styling is in max */}
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 grid-cols-4 gap-8 w-full">
          {data?.map((item) => (
            <div className="" key={item._id}>
              <AllProductsCard
                id={item._id}
                title={item.name}
                text={item.brand}
                discountPrice={item.price}
                rating={"5"}
                img={item.productImg}
                price={item.falsePrice}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainProducts;
