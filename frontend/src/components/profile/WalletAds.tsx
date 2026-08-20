import React from "react";
import { AiFillGift } from "react-icons/ai";
import { HiCurrencyDollar } from "react-icons/hi";
import EcommerceImg from "../../assets/ecommercepng.png";

const WalletAds = () => {
  return (
    <div className="border-2 rounded-xl border-purple-500 shadow-md p-3 sm:p-4 min-h-[14rem]">
      <div className="flex">
        <div className="w-[65%] sm:w-[70%] flex flex-col justify-between">
          <div className="font-medium text-base sm:text-xl gap-1 flex items-center">
            <HiCurrencyDollar className="text-orange-500 h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] flex-shrink-0" />
            <span className="font-bold">Shopiverse Wallet</span>
          </div>
          <div className="text-base sm:text-xl flex gap-1 items-center font-medium my-2 sm:my-3">
            Cashback up to 80%
            <AiFillGift className="text-orange-500 h-[24px] w-[24px] sm:h-[30px] sm:w-[30px] flex-shrink-0" />
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            Use your Shopiverse wallet at checkout and get up to 80% cashback
          </div>
        </div>
        <div className="w-[35%] sm:w-[30%] flex items-center justify-center">
          <img
            src={EcommerceImg}
            alt="ecommerce"
            className="h-[120px] sm:h-[160px] md:h-[180px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default WalletAds;
