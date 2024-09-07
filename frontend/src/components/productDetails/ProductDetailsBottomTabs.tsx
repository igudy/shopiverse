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
      <div className="mt-10 flex px-10 text-lg gap-12 text-gray-500">
        {allTabs?.map((item, i) => (
          <div
            key={i}
            className={`flex items-center px-3 cursor-pointer ${
              item.tabName === tab
                ? "font-medium rounded-lg text-white bg-purple-700"
                : "text-gray-700"
            }`}
            onClick={() => setTab(item.tabName)}
          >
            {item.tabName}
          </div>
        ))}
      </div>
      <div className="">
        <HorizontalReviewLine />

        <div className="my-5 mx-10 sm:mx-2 xsm:mx-2 lg:mx-3">
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
