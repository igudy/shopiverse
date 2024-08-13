import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = ({ value, onChange }: any) => {
  return (
    <div>
      <>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black"
        >
          Search
        </label>
        <div className="relative items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BsSearch className="text-dark font-bold" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 text-sm text-gray-900  bg-gray-50  dark:placeholder-gray-400 dark:text-black border border-gray-500 rounded-lg md:w-full w-full sm:w-full"
            placeholder="Search products.."
            value={value}
            onChange={onChange}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Search
          </button>
        </div>
      </>
    </div>
  );
};

export default Search;
