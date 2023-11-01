import React from "react";
import { topratedsales } from "../data/data";
import ProductCards from "./sub-components/ProductCards";

const TopRatedSales = () => {
  return (
    <div>
      <p className="relative text-5xl sm:text-4xl sm:mb-2 font-extrabold my-10">
        {topratedsales.title}
      </p>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 grid-cols-4 gap-4 w-full">
          {topratedsales?.items?.map((item) => (
            <div className="" key={item.id}>
              <ProductCards
                id={item.id}
                title={item.title}
                text={item.text}
                rating={item.rating}
                btn={item.btn}
                img={item.img}
                price={item.price}
                color={item.color}
                shadow={item.shadow}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedSales;
