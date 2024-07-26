import React, { useState } from "react";
import { CardGraph } from "../../components/admin/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Coupon = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  return (
    <div>
      <p className="text-sm text-[#707EAE] font-medium mt-3 ">
        Pages / View and Add Coupon
      </p>
      <p className="text-2xl font-[700] text-[#2B3674]">Coupon</p>
      <div className="px-2">
        <CardGraph>
          <form
            // onSubmit={handleBrandSubmit}
            className="p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-5">
              <div className="flex flex-col w-[50%]">
                <div className="mb-6 text-xl">
                  Use the form to{" "}
                  <span className="font-bold">Create a Coupon</span>
                </div>
                <label className="text-gray-600 font-bold text-sm mt-3">
                  Coupon Name:
                </label>
                <input
                  type="text"
                  placeholder="CHRISTMAS"
                  required
                  className="bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block"
                  name="name"
                  // value={brandName}
                  // onChange={(e) => setBrandName(e.target.value)}
                />
                <label className="text-gray-600 font-bold text-sm mt-3">
                  Coupon Discount:
                </label>
                <input
                  type="text"
                  placeholder="10%"
                  required
                  className="bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block"
                  name="name"
                  // value={slugName}
                  // onChange={(e) => setSlugName(e.target.value)}
                />
                <label className="text-gray-600 font-bold text-sm mt-3">
                  Expiry Date:
                </label>
                <div className="">
                  {/* Date picker here */}
                  <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    onCalendarClose={handleCalendarClose}
                    onCalendarOpen={handleCalendarOpen}
                    required
                    className="text-center border-l-4 border-purple-500  w-full p-1 rounded border-2  outline-none  focus:ring-0 bg-transparent"
                    isClearable
                    placeholderText="Click and select date"
                  />
                </div>
              </div>
            </div>
            <button className="w-[50%] bg-purple-600 text-white h-12 my-5 rounded-lg shadow-xl font-bold hover:bg-purple-700">
              Add Coupon
            </button>
          </form>

          <div>
            <div className="text-2xl font-bold px-4">All Coupons</div>
            <div className="relative p-3 overflow-x-auto sm:rounded-lg rounded-2xl">
              <table className="w-full text-sm text-left  text-gray-500 ">
                <thead className="text-xs text-gray-500 uppercase bg-white border-b-2 font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S/N
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Discount(%)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Expiry Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                {/* {Array.isArray(brand) &&
                  brand?.map((item: IBrand, index: number) => ( */}
                {/* <tbody key={item.slug} className="pt-10"> */}
                <tbody className="pt-10">
                  <tr className="bg-white text-black hover:bg-gray-50">
                    <td className="px-6 py-4  text-[#2B3674] font-bold">
                      {/* {index + 1} */}1
                    </td>
                    <td className="px-6 py-4">
                      Name
                      {/* {item.name} */}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {/* {item.slug} */}
                      50%
                    </td>
                    <td className="px-6 py-4">
                      {/* {item.category} */}
                      2024-07-14
                    </td>
                    <td className="px-6 py-4">
                      {/* {item.category} */}
                      2024-09-14
                    </td>
                    <td
                      className="px-6 py-4 p-1 bg-purple-600 mt-2 cursor-pointer flex justify-center items-center font-bold hover:bg-purple-800 text-white rounded-2xl"
                      // onClick={() => deleteFunction(item.slug)}
                    >
                      Delete
                    </td>
                  </tr>
                </tbody>
                {/* // ))} */}
              </table>
            </div>
          </div>
        </CardGraph>
      </div>
    </div>
  );
};

export default Coupon;
