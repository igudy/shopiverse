import React from "react";
import useProducts from "../../service/axios-utils";
import { Progress } from "../../components/ui/progress";
import { truncate } from "lodash";

const AllProducts = () => {
  const { data, error, isLoading } = useProducts();

  return (
    <>
      <div className="relative p-3 overflow-x-auto shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-500 uppercase bg-white border-b font-bold ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                ProductImg
              </th>
              <th scope="col" className="px-6 py-3">
                Quan.
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                F. Price
              </th>
              <th scope="col" className="px-6 py-3">
                Cat.
              </th>

              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                className="bg-white text-black hover:bg-gray-50"
                key={item._id}
              >
                <th scope="row" className="px-6 py-4  text-[#2B3674] font-bold">
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  <img src={`${item.producImg}`} alt={item.name} />
                </td>
                <td className="px-6 py-4 flex items-center flex-col gap-2 font-bold">
                  {item.quantity}
                  <Progress value={item.quantity} className="h-2" />
                </td>
                <td className="px-6 py-4 text-gray-800">N{item.price}</td>
                <td className="px-6 py-4 text-gray-800">N{item.falsePrice}</td>
                <td className="px-6 py-4 text-gray-800">{item.category}</td>

                <td className="px-6 py-4 text-gray-800 ">{item.brand}</td>
                <td className="px-6 py-4 text-gray-800 ">{item.desc}</td>
                <td className="text-[12px] px-6 py-4 text-gray-800 ">
                  {truncate(item.createdAt, {
                    length: 15,
                    omission: "...",
                  })}
                </td>
                <td className="px-6 py-4  text-blue-600 underline cursor-pointer">
                  Edit
                </td>
                <td className="px-6 py-4  text-blue-600 underline cursor-pointer">
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProducts;
