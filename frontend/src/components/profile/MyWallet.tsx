import React, { useEffect, useState } from "react";
import Account from "./Account";
import WalletAds from "./WalletAds";
import WalletTable from "./WalletTable";
import { useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import toast from "react-hot-toast";

const Wallet = () => {
  const [urlParams] = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);

  const payment = urlParams.get("payment");

  useEffect(() => {
    if (payment === "successful") {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    } else if (payment === "failed") {
      toast.error("Failed transaction");
    }
  }, [payment]);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="flex flex-col md:flex-row gap-4 md:gap-5">
        <div className="w-full md:w-1/2">
          <Account />
        </div>
        <div className="w-full md:w-1/2">
          <WalletAds />
        </div>
      </div>
      <WalletTable />
    </>
  );
};

export default Wallet;
