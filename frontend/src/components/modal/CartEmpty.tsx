import React from "react";
import ShoppingBag from "../../assets/emptybag.png";

const CartEmpty = () => {
  return (
    <div>
      <div className="">
        <img
          src={ShoppingBag}
          className="flex justify-center text-center mx-auto opacity-60 w-[40%] h-[40%]"
          alt="shopping_bag"
        />
      </div>
    </div>
  );
};

export default CartEmpty;
