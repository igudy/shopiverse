import Card from "./Card";
import Ranking from "../../assets/dashboard/ranking.svg";
import Dollar from "../../assets/dashboard/dollar.svg";

const TopRow = () => {
  return (
    <div>
      <p className="text-sm text-[#707EAE] font-medium mt-3 ">
        Pages / Dashboard
      </p>
      <p className="text-2xl font-[700] text-[#2B3674]">Main Dashboard</p>
      <div className="grid grid-cols-5 xsm:grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 mr-5 2xl:grid-cols-6 place-content-between">
        <Card top={"Earnings"} image={Ranking} amount={"$350.4"} />
        <Card top={"Spend this Month"} image={Dollar} amount={"$642.3"} />
        <Card top={"Sales"} image={Ranking} amount={"$574.3"} />
        <Card top={"Total Balance "} image={Ranking} amount={"$123.1 "} />
        <Card top={"Total Projects"} image={Ranking} amount={"2935"} />
      </div>
    </div>
  );
};

export default TopRow;
