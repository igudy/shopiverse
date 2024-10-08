import React from "react";
import AdminOrders from "../../components/orders/AdminOrders";

const Orders = () => {
  return (
    <div>
      {" "}
      <p className="text-sm text-[#707EAE] font-medium mt-3 ">
        Pages / View Orders
      </p>
      <p className="text-2xl font-[700] text-[#2B3674]">All Orders</p>

      <AdminOrders/>
    </div>
  );
};

export default Orders;
