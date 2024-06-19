import React from "react";
import { Approved, Disable, Error } from "./StatusProgress";
import { Progress } from "../ui/progress";

interface IComplexTable {}

const ComplexTable = ({}: IComplexTable) => {
  return (
    <div>
      <div className="relative p-3 overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[400px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-500 uppercase bg-white border-b font-bold ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Progress
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white text-black hover:bg-gray-50">
              <th scope="row" className="px-6 py-4  text-[#2B3674] font-bold">
                MacBook Pro 22
              </th>
              <td className="px-6 py-4">
                <Approved />
              </td>
              <td className="px-6 py-4">10th March</td>
              <td className="px-6 py-4">
                <Progress value={80} className="h-2" />
              </td>
            </tr>
            <tr className="bg-white  text-black hover:bg-gray-50 ">
              <th
                scope="row"
                className="px-6 py-4  text-[#2B3674] font-bol-900 whitespace-nowrap"
              >
                Google Pixel 3aXl
              </th>
              <td className="px-6 py-4">
                <Approved />
              </td>
              <td className="px-6 py-4">10th March</td>
              <td className="px-6 py-4">
                <Progress value={50} className="h-2" />
              </td>
            </tr>
            <tr className="bg-white  text-black hover:bg-gray-50 ">
              <th
                scope="row"
                className="px-6 py-4  text-[#2B3674] font-bol-900 whitespace-nowrap"
              >
                Google Pixel 7 Pro
              </th>
              <td className="px-6 py-4">
                <Disable />
              </td>
              <td className="px-6 py-4">10th March</td>
              <td className="px-6 py-4">
                <Progress value={100} className="h-2" />
              </td>
            </tr>
            <tr className="bg-white  text-black hover:bg-gray-50 ">
              <th
                scope="row"
                className="px-6 py-4  text-[#2B3674] font-bol-900 whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">
                <Error />
              </td>
              <td className="px-6 py-4">10th March</td>
              <td className="px-6 py-4">
                <Progress value={25} className="h-2" />
              </td>
            </tr>
            <tr className="bg-white  text-black hover:bg-gray-50 ">
              <th
                scope="row"
                className="px-6 py-4 text-[#2B3674] font-bol-900 whitespace-nowrap"
              >
                Samsung A22
              </th>
              <td className="px-6 py-4">
                <Approved />
              </td>
              <td className="px-6 py-4">10th March</td>
              <td className="px-6 py-4">
                <Progress value={38} className="h-2" />
              </td>
            </tr>
            <tr className="bg-white  text-black hover:bg-gray-50 ">
              <th
                scope="row"
                className="px-6 py-4  text-[#2B3674] font-bol-900 whitespace-nowrap"
              >
                Samsung S23 Ultra
              </th>
              <td className="px-6 py-4">
                <Error />
              </td>
              <td className="px-6 py-4">10th March</td>
              <td className="px-6 py-4">
                <Progress value={36} className="h-2" />
              </td>
            </tr>
            <tr className="bg-white  text-black hover:bg-gray-50 ">
              <th
                scope="row"
                className="px-6 py-4  text-[#2B3674] font-bol-900 whitespace-nowrap"
              >
                Iphone 13 Pro Max
              </th>
              <td className="px-6 py-4">
                <Approved />
              </td>
              <td className="px-6 py-4">10th March</td>
              <td className="px-6 py-4">
                <Progress value={13} className="h-2" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplexTable;
