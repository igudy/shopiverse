import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import OrderHistoryComp from "../../components/orders/OrderHistoryComp";

const OrderHistory = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-10">
        <OrderHistoryComp />
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
