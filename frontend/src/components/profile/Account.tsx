import React from "react";
import { CiDollar } from "react-icons/ci";
import { FaCcMastercard } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import Mastercard from '../../assets/mastercard.png';


const Account = () => {
  return (
    <div className="border-2 rounded-xl border-purple-500 shadow-md p-3 h-[14rem] max-h-[14rem]">
      <div className="flex flex-col">
        <div>Hello,</div>
        <div className="text-xl font-bold cursor-pointer">Igudy</div>

        {/* Horizontal line */}
        <div className="w-full bg-gray-500 h-[0.3px] mt-3"></div>
        <div className="flex justify-between items-center">
          <div>

        <div className="text-xl font-medium mt-3">Account Balance</div>
        <div className="text-md font-bold mt-2">$1000.00</div>

          </div>
          <div>
            
          </div>
        </div>

        <div className="flex justify-center items-center my-2 gap-3">
          <div className="flex gap-1 font-medium items-center p-2 bg-purple-700 text-white rounded-xl shadow-md hover:bg-purple-900 cursor-pointer w-[10rem] justify-center">
            <CiDollar />
            Deposit Money
          </div>
          <div className="flex gap-1 font-medium items-center p-2 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 cursor-pointer w-[10rem] justify-center">
            <IoIosSend />
            Transfer
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;
