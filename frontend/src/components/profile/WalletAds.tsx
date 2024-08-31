import React from "react";
import { AiFillGift } from "react-icons/ai";
import { HiCurrencyDollar } from "react-icons/hi";
import EcommerceImg from "../../assets/ecommercepng.png";

const WalletAds = () => {
  return (
    <div className="border-2 rounded-xl border-purple-500 shadow-md p-3 h-[14rem] max-h-[14rem]">
      <div className="flex">
        <div className="w-[70%] flex flex-col justify-between">
          <div className="font-medium text-xl gap-1 flex items-center">
            <HiCurrencyDollar className="text-orange-500 h-[40px] w-[40px]" />{" "}
            <span className="font-bold">Shopiverse Wallet </span>
          </div>
          <div className=" text-xl flex gap-1 items-center font-medium  my-3">
            Cashback up to 80%{" "}
            <AiFillGift className="text-orange-500 h-[30px] w-[30px]" />
          </div>
          <div className="flex flex-wrap text-xs">
            Use your Shopiverse wallet at checkout and get up to 80% cashback{" "}
          </div>
        </div>
        <div className="w-30%">
          <div>
            <img
              src={EcommerceImg}
              alt="ecommerce-image"
              className="h-[180px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAds;
