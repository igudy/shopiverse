import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import {
  useTransferFundMutation,
  useVerifyAccountMutation,
} from "../redux/api/transactionApi";

const TransferModal = ({ isOpen, onClose }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset method from useForm
  } = useForm();

  const [
    verifyAccount,
    { data: dataVerify, isLoading: isLoadingVerify, isError: isErrorVerify },
  ] = useVerifyAccountMutation();

  const [
    transferFund,
    {
      data: transferFundData,
      isLoading: isLoadingTransferFund,
      isError: isErrorTransferFund,
    },
  ] = useTransferFundMutation();

  const [receiverEmail, setReceiverEmail] = useState("");

  const handleVerify = async () => {
    if (receiverEmail) {
      try {
        const result = await verifyAccount({
          receiver: receiverEmail,
        }).unwrap();
        toast.success(result.message || "Account verified successfully");
        console.log("Verification Result===>", result);
      } catch (error) {
        toast.error("Account not verified");
      }
    } else {
      toast.error("Please enter a receiver's email.");
    }
  };

  const onSubmit = async (data: any) => {
    console.log("data==>", data);
    try {
      const result = await transferFund({
        amount: data?.amount,
        receiver: data?.receiver,
        description: data?.description || "",
      }).unwrap();
      
      console.log("result-===>", result);
      if (result) {
        toast.success(result?.message || "Transaction Successful");
        reset();
        onClose();
      } 
    } catch (error) {
      toast.error("Transaction Failed");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[600px]">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Transfer Funds</h2>
          <h2
            className="text-xl mb-4 font-bold cursor-pointer"
            onClick={handleClose} // Use handleClose here
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
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Receiver's Account
            </label>
            <div className="flex">
              <input
                type="text"
                {...register("receiver", { required: "Receiver is required" })}
                className="border border-gray-300 rounded p-2 w-full"
                onChange={(e) => setReceiverEmail(e.target.value)}
              />
              <button
                type="button"
                className="bg-purple-600 p-2 text-white rounded-tr-lg rounded-br-lg"
                onClick={handleVerify}
                disabled={isLoadingVerify}
              >
                {isLoadingVerify ? "Verifying..." : "Verify"}
              </button>
            </div>
            {errors.receiver && (
              <p className="text-red-500 text-sm">
                {errors.receiver.message as string}
              </p>
            )}
          </div>

          {/* Receiver's name */}
          {dataVerify && (
            <>
              <div className="text-[12px] mb-2">
                Receiver's name: {dataVerify?.name}
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description (optional)
            </label>
            <textarea
              {...register("description")}
              className="border border-gray-300 rounded p-2 w-full"
            ></textarea>
          </div>
          <div>
            {!dataVerify ? (
              <div className="text-red-600 my-1 text-md">
                Please verify by clicking "Verify" before sending.
              </div>
            ) : (
              <div className="text-green-700 my-1 text-md">
                Account Verified.
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose} // Use handleClose here
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`p-2 rounded text-white ${
                !dataVerify ? "bg-gray-500" : "bg-purple-700"
              }`}
              disabled={!dataVerify}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
