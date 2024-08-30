import React from "react";
import Account from "./Account";
import WalletAds from "./WalletAds";

const Wallet = () => {
  return (
    <div className="flex gap-5">
      <div className="w-[50%]">
        <Account />
      </div>
      <div className="w-[50%]">
        <WalletAds />
      </div>
    </div>
  );
};

export default Wallet;
