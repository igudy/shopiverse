import React, { useState } from "react";
import ProductCards, { AllProductsCard } from "../reusable/ProductCards";
import { useGetProductsQuery } from "../redux/api/api";
import { CircularProgress } from "../ui/loader";
import { IoSearchCircleOutline } from "react-icons/io5";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MainProducts = () => {
  const { data, error, isLoading: isLoadingProducts } = useGetProductsQuery();

  const [price, setPrice] = useState([0, 1000]);

  const onChange = (value: any) => {
    setPrice(value);
  };

  console.log("Price==>", price);

  return (
    <div>
      <p className="relative text-5xl sm:text-4xl sm:mb-2 font-extrabold my-10">
        All Products
      </p>

      {/* Categories and Product */}
      <div className="border-2 rounded-xl p-3">
        <div>
          <div className="flex justify-between items-center px-5 py-2">
            <div className="font-bold mr-20">10 Products Found</div>

            {/* Search */}
            <div className="mx-2 flex-1">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative flex">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IoSearchCircleOutline className="w-6 h-6 text-white" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="p-4 pl-10 w-full text-sm text-purple-900 border border-gray-300 
                  rounded-l-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 
                  dark:bg-purple-700 dark:border-purple-600 dark:placeholder-purple-400
                   dark:text-white dark:focus:ring-purple-500
                    dark:focus:border-purple-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
                <button
                  type="submit"
                  className="text-white bg-purple-700 hover:bg-purple-800 font-medium 
                  rounded-r-lg text-sm px-4 py-2 dark:bg-purple-600 
                  dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Country */}
            <div className="mx-2 flex-1">
              <select
                className="bg-gray-50 border border-gray-300 text-purple-900 
                text-sm rounded-lg block w-full dark:bg-purple-700 dark:border-purple-600
                 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500
                  dark:focus:border-purple-500 p-4"
              >
                <option value="" selected>
                  Choose a country
                </option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex gap-5 p-5">
            {/* Filtering */}
            <div className="flex flex-col gap-2 border-2 rounded-xl p-2 w-[250px]">
              <div>
                <div className="font-bold text-purple-600 cursor-pointer">
                  Categories
                </div>
                <div className="font-medium cursor-pointer">All</div>
                <div>Games</div>
                <div>Laptops</div>
                <div>Games</div>
                <div>Laptops</div>
                <div>Games</div>
                <div>Laptops</div>
              </div>

              <div>
                <div className="font-bold mt-4 text-purple-600 cursor-pointer">
                  Brand
                </div>
                <div className="w-full">
                  <select
                    className="bg-gray-50 border border-gray-300 
                text-sm rounded-lg block w-full
                 text-black  p-2"
                  >
                    <option value="" selected>
                      Choose a country
                    </option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="mt-5">
                  <p className="font-bold text-purple-600">Price Range</p>
                </div>
                <div className="m-2">
                  <Slider
                    range
                    min={0}
                    max={1000}
                    defaultValue={price}
                    onChange={onChange}
                  />
                  <p>
                    Price range: ${price[0]} - ${price[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          <div className="max-w-screen-xl mx-auto">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 grid-cols-4 gap-4 w-full">
              {isLoadingProducts ? (
                <CircularProgress />
              ) : error ? (
                <p>Error loading products</p>
              ) : (
                <>
                  {data?.map((item: any) => (
                    <div key={item._id}>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProducts;
