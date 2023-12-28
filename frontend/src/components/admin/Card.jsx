import React from "react";

const Card = ({ top, icon: Icon, amount }) => {
  return (
    <div>
      <div className="mt-4 text-sm flex bg-white rounded-3xl pl-2 pr-10 py-3 shadow-purple-200 shadow-md items-center">
        <div className="bg-gray-200 rounded-full items-center m-2">
          <Icon className="w-[40px] h-[40px] p-1 text-[#2B3674]" />
        </div>
        <div className="flex-col space-y-1">
          <p className="text-[#39393b] text-[9px]">{top}</p>
          <p className="text-[#2B3674] font-[600] text-[20px]">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

export const CardGraph = ({ children }) => {
  return (
    <div className="my-6 rounded-xl w-full bg-white shadow-xl">{children}</div>
  );
};
