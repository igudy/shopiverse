import React from "react";
import ShoppingBag from "../../assets/emptybag.png";

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src={ShoppingBag}
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-60"
        alt="shopping_bag"
      />
      <p className="text-gray-500 mt-4 text-sm sm:text-base">Your cart is empty</p>
    </div>
  );
};

export default CartEmpty;
