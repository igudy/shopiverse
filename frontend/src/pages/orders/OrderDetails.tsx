import React from "react";
import Navbar from "../../components/navbar/Navbar";
import OrderDetialsComponent from "../../components/orders/OrderDetialsComponent";
import Footer from "../../components/footer/Footer";

const OrderDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-14">
        <OrderDetialsComponent />
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
