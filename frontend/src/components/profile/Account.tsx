import React, { useState } from "react";
import { CiDollar } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import Mastercard from "../../assets/mastercard.png";
import TransferModal from "./TransferModal";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/auth/authSlice";
import DepositModal from "./DepositModal";

const Account = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDepositModal, setIsDepositModal] = useState<boolean>(false);

  const user = useSelector(selectUser);

    // Transfer Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
    // Deposit Modal
  const openDepositModal = () => setIsDepositModal(true);
  const closeDepositModal = () => setIsDepositModal(false);

  return (
    <div className="border-2 rounded-xl border-purple-500 shadow-md p-3 h-[14rem] max-h-[14rem]">
      <div className="flex flex-col">
        <div>Hello,</div>
        <div className="text-xl font-bold cursor-pointer">{user?.name}</div>

        {/* Horizontal line */}
        <div className="w-full bg-gray-500 h-[0.3px] mt-3"></div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-medium mt-3">Account Balance</div>
          <div className="text-md font-bold mt-2">
            ₦{new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2 }).format(user?.balance || 0)}
          </div>
          </div>
          <div>
            {/* Mastercard image */}
            <img src={Mastercard} alt="mastercard_image" className="h-14" />
          </div>
        </div>

        <div className="flex justify-center items-center my-2 gap-3">
          <div className="flex gap-1 font-medium items-center p-2 bg-purple-800 
          text-white rounded-xl shadow-md hover:bg-purple-900
          cursor-pointer w-[10rem] justify-center"
           onClick={openDepositModal}
          >
            <CiDollar />
            Deposit Money
          </div>
          <div
            onClick={openModal}
            className="flex gap-1 font-medium items-center p-2 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 cursor-pointer w-[10rem] justify-center"
          >
            <IoIosSend />
            Transfer
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      <TransferModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Deposit Modal */}
      <DepositModal isOpen={isDepositModal} onClose={closeDepositModal} />

    </div>
  );
};

export default Account;
