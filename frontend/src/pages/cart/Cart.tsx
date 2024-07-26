import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import CartItems from "../../components/cart/CartIems";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <CartItems />
      <Footer />
    </div>
  );
};

export default Cart;
