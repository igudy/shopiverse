import React, { useEffect, useState } from "react";
import ProductCards, { AllProductsCard } from "../reusable/ProductCards";
import { useGetProductsQuery } from "../redux/api/api";
import { CircularProgress } from "../ui/loader";
import { IoSearchCircleOutline } from "react-icons/io5";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_SEARCH,
  selectFilterProducts,
  SORT_PRODUCTS,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} from "../redux/slices/auth/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../redux/api/categoryApi";
import { useGetBrandQuery } from "../redux/api/brandApi";
import ReactPaginate from "react-paginate";

const MainProducts = () => {
  const { data, error, isLoading: isLoadingProducts } = useGetProductsQuery({});
  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isError: isCategoryError,
  } = useGetCategoriesQuery({});

  const {
    data: brandData,
    error: brandError,
    isLoading: brandLoading,
  } = useGetBrandQuery({});

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 1000]);
  const [sort, setSort] = useState("latest");
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilterProducts);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("");

  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (data) {
      const minPrice = Math.min(...data.map((product: any) => product.price));
      const maxPrice = Math.max(...data.map((product: any) => product.price));

      setPrice([minPrice, maxPrice]);

      dispatch(FILTER_BY_SEARCH({ products: data, search: "" }));
    }
  }, [dispatch, data]);

  const minPrice = data
    ? Math.min(...data?.map((product: any) => product?.price))
    : 0;
  const maxPrice = data
    ? Math.max(...data?.map((product: any) => product?.price))
    : 1000;

  useEffect(() => {
    if (data) {
      dispatch(FILTER_BY_SEARCH({ products: data, search: "" }));
    }
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products: data, search }));
  }, [dispatch, data, search]);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products: data, sort }));
  }, [dispatch, data, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products: data, brand }));
  }, [dispatch, data, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products: data, price }));
  }, [dispatch, data, price]);

  const filteredProductFunc = (cat: any) => {
    setCategory(cat);
    dispatch(
      FILTER_BY_CATEGORY({
        products: data,
        category: cat,
      })
    );
  };

  const onChange = (value: any) => {
    setPrice(value);
  };

  const clearFilters = async () => {
    setCategory("All");
    setBrand("");
    setPrice([minPrice, maxPrice]);
    dispatch(FILTER_BY_SEARCH({ products: data, search: "" }));
    dispatch(SORT_PRODUCTS({ products: data, sort: "latest" }));
  };

  console.log("currentItems==>", currentItems);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (currentItems?.ratings?.length) {
      const totalStars = currentItems.ratings.reduce(
        (sum: number, review: any) => sum + review.star,
        0
      );
      const averageRating = totalStars / currentItems.ratings.length;
      setRating(averageRating);
    }
  }, [currentItems]);

  const calculateAverageRating = (ratings: any) => {
    if (ratings?.length) {
      const totalStars = ratings.reduce(
        (sum: number, review: any) => sum + review.star,
        0
      );
      return (totalStars / ratings.length).toFixed(1);
    }
    return 0;
  };

  return (
    <div className="px-2 sm:px-4">
      <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold my-6 sm:my-10">
        All Products
      </p>

      <div className="border-2 rounded-xl p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-2 px-2 sm:px-5 py-2">
          <div className="font-bold text-sm sm:text-base">
            {filteredProducts?.length} Products Found
          </div>

          {/* Search - moved to top on mobile */}
          <div className="w-full sm:mx-2 sm:flex-1 order-first sm:order-none">
            <div className="relative flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoSearchCircleOutline className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>
              <input
                type="search"
                className="p-3 sm:p-4 pl-9 sm:pl-10 w-full text-sm text-purple-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:border-purple-600 dark:text-black outline-none"
                placeholder="Search ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="button"
                className="text-white bg-purple-800 hover:bg-purple-800 font-medium rounded-r-lg text-sm px-3 sm:px-4 py-2"
                onClick={() =>
                  dispatch(FILTER_BY_SEARCH({ products: data, search }))
                }
              >
                Search
              </button>
            </div>
          </div>

          {/* Sort - full width on mobile */}
          <div className="w-full sm:w-auto sm:mx-2 sm:flex-1">
            <select
              className="bg-gray-50 border border-gray-300 text-purple-900 text-sm rounded-lg block w-full p-3 sm:p-4"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="p-2 w-full sm:w-[30%]">
            <div className="flex flex-col gap-2 border-2 rounded-xl p-2 w-full lg:w-[250px]">
              <div>
                <div className="font-bold text-purple-600">Categories</div>
                <div className="flex gap-2 p-1 flex-wrap text-white text-sm">
                  <div
                    className="p-1 bg-purple-500 hover:bg-purple-800 w-[30px] text-center rounded-xl capitalize cursor-pointer"
                    onClick={() => filteredProductFunc("All")}
                  >
                    All
                  </div>
                  {categoryData?.map((cat: any) => (
                    <div
                      className="p-1 bg-purple-500 hover:bg-purple-800 rounded-xl capitalize cursor-pointer"
                      onClick={() => filteredProductFunc(cat?.name)}
                      key={cat?.id}
                    >
                      {cat?.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold mt-4 text-purple-600">Brand</div>
                <div className="w-full">
                  <select
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full text-black p-2"
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                  >
                    <option value="">Choose a brand</option>
                    {brandData?.map((brand: any) => (
                      <option key={brand?._id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="mt-5">
                  <p className="font-bold text-purple-600">Price Range</p>
                </div>

                <div className="py-2 m-2 pr-2 sm:px-5 max-w-[250px]">
                  <Slider
                    range
                    marks={{
                      [price[0]]: `$${price[0]}`,
                      [price[1]]: `$${price[1]}`,
                    }}
                    min={minPrice}
                    max={maxPrice}
                    value={price}
                    onChange={onChange}
                    trackStyle={[{ backgroundColor: "#9333ea" }]}
                    handleStyle={[
                      {
                        borderColor: "#9333ea",
                        width: "16px",
                        height: "16px",
                        marginTop: "-6px",
                      },
                      {
                        borderColor: "#9333ea",
                        width: "16px",
                        height: "16px",
                        marginTop: "-6px",
                      },
                    ]}
                    railStyle={{ backgroundColor: "#e9d5ff", height: "4px" }}
                    dotStyle={{ display: "none" }}
                    activeDotStyle={{ display: "none" }}
                  />
                </div>
              </div>

              <div>
                <button
                  className="p-2 sm:p-3 w-full bg-purple-600 text-white mt-2 rounded-lg hover:bg-purple-800 text-sm sm:text-base"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 w-full sm:w-[70%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
              {isLoadingProducts ? (
                <div className="col-span-full flex justify-center">
                  <CircularProgress />
                </div>
              ) : error ? (
                <p className="col-span-full text-center">
                  Error loading products
                </p>
              ) : (
                currentItems?.map((item: any) => (
                  <div key={item._id} className="w-full">
                    <AllProductsCard
                      id={item._id}
                      title={item.name}
                      text={item.brand}
                      discountPrice={item.price}
                      rating={calculateAverageRating(item.ratings)}
                      img={item.productImg}
                      price={item.falsePrice}
                    />
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 pb-4">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="Prev"
                containerClassName="flex gap-2 items-center"
                pageLinkClassName="px-3 py-1 rounded border text-sm"
                previousLinkClassName="px-3 py-1 rounded border text-sm"
                nextLinkClassName="px-3 py-1 rounded border text-sm"
                activeLinkClassName="bg-purple-600 text-white border-purple-600"
                disabledLinkClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProducts;
