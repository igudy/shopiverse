import React from "react";
import ProductCards, { AllProductsCard } from "../reusable/ProductCards";

const MainProducts = () => {
  return (
    <div>
      <p className="relative text-5xl sm:text-4xl sm:mb-2 font-extrabold my-10">
        All Products
      </p>
      {/* Remeber styling is in max */}
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 grid-cols-4 gap-4 w-full">
          <AllProductsCard />
          {/* {topratedsales?.items?.map((item) => (
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
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default MainProducts;
