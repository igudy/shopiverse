import React from "react";
import { popularsales } from "../data/data";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const PopularSales = () => {
  return (
    <div>
      <p className="relative text-5xl sm:text-4xl sm:mb-2 font-extrabold my-10">
        {popularsales.title}
      </p>

      <div className="flex sm:flex-col xsm:flex-col md:flex-col    xl:gap-5 lg:gap-5 sm:gap-4 md:gap-10 gap-5">
        {popularsales?.items?.map((item) => (
          <div key={item.id} className="text-white">
            <div
              className={`relative bg-gradient-to-b ${item.color} ${item.shadow} grid items-center justify-items-start rounded-xl py-3 px-2 transition-all duration-700 ease-in-out w-full hover:scale-90`}
            >
              <div className="flex justify-between px-1 sm:px-2 xsm:px-2">
                <div>
                  <p className="font-bold sm:text-sm xsm:text-sm md:text-xl my-2">
                    {item.title}
                  </p>
                  <p className="text-xs my-1">{item.text}</p>
                  <div className="flex gap-2 my-2">
                    <p className="font-bold sm:text-sm xsm:text-sm lg:font-bold xl:font-bold md:font-bold md:text-xl lg:text-lg">
                      ${item.price}
                    </p>
                    <span className="bg-slate-200 w-12 sm:w-8 md:w-16 lg:w-10 rounded-lg drop-shadow-xl text-black">
                      <p className="flex text font-medium sm:text-sm justify-center items-center md:font-bold md:text-md md:mt-[2px]">
                        {item.rating} <AiFillStar className="text-yellow-500" />
                      </p>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="border-[2px] w-7 h-6 cursor-pointer rounded-full drop-shadow-xl text-inherit items-center">
                      <span className="flex text-center items-center justify-center">
                        <BsFillCartCheckFill className="pt-1" />
                      </span>
                    </div>
                    <span className="mt-1 pl-2 xl:text-md text-sm shadow-md cursor-pointer">
                      {item.btn}
                    </span>
                  </div>
                </div>
                <div className="right-0">
                  <img
                    src={item.img}
                    alt={`${item.title}`}
                    className="h-[20vh] xsm:h-[10vh] xsm:mt-5 sm:h-[20vh] md:h-[20vh] lg:h-[12vh] w-auto transitions-theme -rotate-[15deg] hover:rotate-0 cursor-pointer object-fill"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSales;
