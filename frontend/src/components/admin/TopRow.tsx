import Card from "./Card";
import React from "react";
import { TbPigMoney } from "react-icons/tb";
import { MdAttachMoney } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdOutlineHomeWork } from "react-icons/md";
import { MdOutlineStackedBarChart } from "react-icons/md";

interface ITopRow {}
const TopRow = ({}: ITopRow) => {
  return (
    <div>
      <p className="text-sm text-[#707EAE] font-medium mt-3 ">
        Pages / Dashboard
      </p>
      <p className="text-2xl font-[700] text-[#2B3674]">Main Dashboard</p>
      <div className="grid grid-cols-5 xsm:grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3 mr-3 2xl:grid-cols-5 justify-self-between">
        <Card
          top={"Earnings"}
          icon={MdOutlineStackedBarChart}
          amount={"₦350.4"}
          data-testid="earnings"
        />
        <Card
          top={"Spend this Month"}
          icon={MdAttachMoney}
          amount={"₦642.3"}
          data-testid="spent"
        />
        <Card
          top={"Sales"}
          icon={TbPigMoney}
          amount={"₦574.3"}
          data-testid="sales"
        />
        <Card
          top={"Total Balance "}
          icon={MdAccountBalanceWallet}
          amount={"₦123.1 "}
          data-testid="wallet"
        />
        <Card
          top={"Total Projects"}
          icon={MdOutlineHomeWork}
          amount={"₦2935"}
          data-testid="projects"
        />
      </div>
    </div>
  );
};

export default TopRow;
