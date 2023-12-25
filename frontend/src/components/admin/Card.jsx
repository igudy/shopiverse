import React from "react";

const Card = ({ top, image, amount }) => {
  return (
    <div>
      <div className="mt-4 text-sm flex bg-white rounded-3xl w-[200px] pl-2 pr-10 py-3  shadow-purple-200 shadow-md items-center">
        <div className="bg-gray-200 rounded-full items-center m-2">
          <img src={image} className="w-12" alt="name" />
        </div>
        <div className="flex-col space-y-1">
          <p className="text-[#A3AED0] text-[9px]">{top}</p>
          <p className="text-[#2B3674] font-[600] text-[20px]">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
