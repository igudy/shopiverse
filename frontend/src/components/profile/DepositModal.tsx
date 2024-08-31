import React from "react";
import { useForm } from "react-hook-form";
import { MdCancel, MdOutlineWaves } from "react-icons/md";
import { FaCcStripe, FaPaypal, FaBitcoin, FaWallet } from "react-icons/fa";

const DepositModal = ({ isOpen, onClose }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("data==>", data);
    // Handle form submission with the selected payment method and amount
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[600px]">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">
              Deposit Fund into Your Wallet
            </h2>
            <h2
              className="text-xl mb-4 font-bold cursor-pointer"
              onClick={handleClose}
            >
              <MdCancel />
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                {...register("amount", { required: "Amount is required" })}
                className="border border-gray-300 rounded p-2 w-full"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">
                  {errors.amount.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center bg-gray-100 p-2 shadow-md cursor-pointer mb-2 hover:translate-x-1 transition-all">
                <input
                  type="radio"
                  {...register("paymentMethod", { required: "Payment method is required" })}
                  value="stripe"
                  className="mr-2"
                />
                <FaCcStripe className="text-blue-700 mr-2" />
                <span>Stripe</span>
              </label>

              <label className="flex items-center cursor-pointer mb-2 bg-gray-100 p-2 shadow-md hover:translate-x-1 transition-all">
                <input
                  type="radio"
                  {...register("paymentMethod", { required: "Payment method is required" })}
                  value="flutterwave"
                  className="mr-2"
                />
                <MdOutlineWaves className="text-yellow-500 mr-2" />
                <span>Flutterwave</span>
              </label>

              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  {errors.paymentMethod.message as string}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-10">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 rounded text-white bg-purple-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
