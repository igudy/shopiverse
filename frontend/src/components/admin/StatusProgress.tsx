import React from "react";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

interface IApproved {}

export const Approved = ({}: IApproved) => {
  return (
    <div className="flex items-center font-bold text-[#2B3674]">
      <FaCheck
        className="bg-green-600 text-white w-5 h-5 rounded-full p-1 mr-1"
        aria-label="check_icon"
      />
      Approved
    </div>
  );
};

export const Disable = () => {
  return (
    <div className="flex items-center  font-bold text-[#2B3674]">
      <IoCloseSharp
        className=" bg-red-600 text-white w-5 h-5 rounded-full p-1 mr-1"
        aria-label="close_sharp"
      />
      Disable
    </div>
  );
};

export const Error = () => {
  return (
    <div className="flex items-center  font-bold text-[#2B3674]">
      <FaExclamation
        className=" bg-yellow-500 text-white w-5 h-5 rounded-full p-1 mr-1"
        aria-label="exclamation"
      />
      Error
    </div>
  );
};
