import React from "react";
import ShoppingBag from "../../assets/emptybag.png";

const CartEmpty = () => {
  return (
      <div className="">
        <img
          src={ShoppingBag}
          className="w-[50%] h-[50%] opacity-60"
          alt="shopping_bag"
        />
    </div>
  );
};

export default CartEmpty;
