import React, { useState } from "react";
import Reviews from "./Reviews";
import ProductInformation from "./ProductInformation";
import MoreProduct from "./MoreProduct";
import {
  HorizontalLine,
  HorizontalReviewLine,
} from "../reusable/HorizontalLine";

const allTabs = [
  { tabName: "Product Reviews" },
  // { tabName: "Other product information" },
  { tabName: "Related Product" },
];

const ProductDetailsBottomTabs = () => {
  const [tab, setTab] = useState("Product Reviews");
  return (
    <>
      <div className="mt-6 sm:mt-10 flex flex-wrap px-3 sm:px-6 md:px-10 text-sm sm:text-base md:text-lg gap-2 sm:gap-4 md:gap-12 text-gray-500">
        {allTabs?.map((item, i) => (
          <button
            key={i}
            className={`flex items-center px-3 py-2 sm:py-1 cursor-pointer rounded-lg transition ${
              item.tabName === tab
                ? "font-medium text-white bg-purple-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setTab(item.tabName)}
          >
            {item.tabName}
          </button>
        ))}
      </div>
      <div>
        <HorizontalReviewLine />

        <div className="my-4 sm:my-5 mx-2 sm:mx-4 md:mx-6 lg:mx-10">
          <div>{tab === "Product Reviews" && <Reviews />}</div>
          <div>
            {tab === "Other product information" && <ProductInformation />}
          </div>
          <div>{tab === "Related Product" && <MoreProduct />}</div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsBottomTabs;
