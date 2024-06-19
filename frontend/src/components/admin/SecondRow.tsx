import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { CardGraph } from "./Card";

interface ISecondRow {}

const SecondRow = ({}: ISecondRow) => {
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Low - 2013",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#BF40BF", "#5D3FD3"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Products",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          text: "Temperature",
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  return (
    <div className="flex gap-5 justify-between p-2">
      {/* Line charts */}
      <CardGraph>
        <div id="chart" className="p-4">
          <ReactApexChart
            options={chartState.options as any}
            series={chartState.series}
            type="line"
            height={350}
          />
        </div>
      </CardGraph>

      {/* Column charts */}
      <CardGraph>
        <div id="chart" className="p-4">
          <ReactApexChart
            options={chartState.options as any}
            series={chartState.series}
            type="bar"
            height={350}
          />
        </div>
      </CardGraph>
    </div>
  );
};

export default SecondRow;
