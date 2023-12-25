import React from "react";
import Card from "../../components/admin/Card";

import Ranking from "../../assets/dashboard/ranking.svg";

const Dashboard = () => {
  return (
    <div className="">
      <div>
        <p className="text-sm text-[#707EAE] font-medium mt-3 ">
          Pages / Dashboard
        </p>

        <p className="text-2xl font-[700] text-[#2B3674]">Main Dashboard</p>
      </div>

      <div className="grid items-center grid-cols-1 xsm:grid-cols-1  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-[100%] 2xl:grid-cols-6">
        <div className="flex gap-3">
          <Card top={"Earnings"} image={Ranking} amount={"$350.4"} />
          <Card top={"Spend this Month"} image={Ranking} amount={"$642.3"} />
          <Card top={"Sales"} image={Ranking} amount={"$574.3"} />
          <Card top={"Total Balance "} image={Ranking} amount={"$123.1 "} />
          <Card top={"Total Projects"} image={Ranking} amount={"2935"} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
