import React from "react";
import Navbar from "../../components/navbar/Navbar";
import OrderDetailsComponent from "../../components/orders/OrderDetailsComponent";
import Footer from "../../components/footer/Footer";

const OrderDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-14">
        <OrderDetailsComponent />
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
