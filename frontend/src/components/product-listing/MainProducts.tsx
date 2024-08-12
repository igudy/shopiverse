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

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  // React paginate
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  // Load all products on first render
  useEffect(() => {
    if (data) {
      // Determine min and max price from products data
      const minPrice = Math.min(...data.map((product: any) => product.price));
      const maxPrice = Math.max(...data.map((product: any) => product.price));

      // Set price range based on min and max prices
      setPrice([minPrice, maxPrice]);

      dispatch(FILTER_BY_SEARCH({ products: data, search: "" }));
    }
  }, [dispatch, data]);


  // Determine min and max price from products data
  const minPrice = data
    ? Math.min(...data?.map((product: any) => product?.price))
    : 0;
  const maxPrice = data
    ? Math.max(...data?.map((product: any) => product?.price))
    : 1000;

  // Load all products on first render
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


  return (
    <div>
      <p
        className="relative text-5xl sm:text-4xl
      sm:mb-2 font-extrabold my-10"
      >
        All Products
      </p>

      {/* Categories and Product */}
      <div className="border-2 rounded-xl p-3">
        <div>
          <div
            className="flex justify-between
          items-center px-5 py-2"
          >
            <div className="font-bold mr-20">
              {filteredProducts?.length} Products Found
            </div>

            {/* Search */}
            <div className="mx-2 flex-1">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium
                text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative flex">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IoSearchCircleOutline className="w-6 h-6 text-black" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="p-4 pl-10 w-full text-sm text-purple-900 border border-gray-300
                  rounded-l-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500
                  dark:border-purple-600 dark:text-black outline-none
                  dark:focus:border-purple-500"
                  placeholder="Search ..."
                  required
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white bg-purple-700 hover:bg-purple-800 font-medium
                  rounded-r-lg text-sm px-4 py-2 dark:bg-purple-600
                  dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  onClick={() =>
                    dispatch(FILTER_BY_SEARCH({ products: data, search }))
                  }
                >
                  Search
                </button>
              </div>
            </div>

            {/* Sort */}
            <div className="mx-2 flex-1">
              <select
                className="bg-gray-50 border border-gray-300 text-purple-900
                text-sm rounded-lg block w-full dark:bg-purple-700 dark:border-purple-600
                 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500
                  dark:focus:border-purple-500 p-4"
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
        </div>

        <div className="flex">
          <div className="flex gap-5 p-5">
            {/* Filtering */}
            <div className="flex flex-col gap-2 border-2 rounded-xl p-2 w-[250px]">
              <div>
                <div className="font-bold text-purple-600 cursor-pointer">
                  Categories
                </div>
                <div
                  className="font-medium cursor-pointer"
                  onClick={() => filteredProductFunc("All")}
                >
                  All
                </div>
                <div className="flex gap-2 flex-wrap text-white text-sm ">
                  {categoryData?.map((cat: any) => (
                    <div
                      className="p-1 bg-purple-500 hover:bg-purple-700 rounded-xl capitalize gap-2 cursor-pointer"
                      onClick={() => filteredProductFunc(cat?.name)}
                      key={cat?.id}
                    >
                      {cat?.name}
                    </div>
                  ))}
                </div>
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
                <div className="m-2">
                <Slider
                  range
                  marks={{
                    [price[0]]: `$${price[0]}`,
                    [price[1]]: `$${price[1]}`,
                  }}
                    min={data && data.length > 0 ?
                      Math.min(...data.map((product: any) =>
                        product.price)) : 0}
                    
                    max={data && data.length > 0 ?
                      Math.max(...data.map((product: any) =>
                        product.price)) : 1000}
                    
                  value={price}
                  onChange={onChange}
                />
                </div>
              </div>

              <div>
                <button
                  className="p-3 w-full bg-purple-600 text-white mt-2 rounded-lg hover:bg-purple-800"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
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
                currentItems?.map((item: any) => (
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
                ))
              )}
            </div>

            <div className="flex justify-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="activePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProducts;