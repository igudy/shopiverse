import React from "react";
import { deleteProduct, useProducts } from "../../service/axios-utils";
import { Progress } from "../../components/ui/progress";
import { truncate } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  productImg: string;
  quantity: number;
  price: number;
  falsePrice: number;
  category: string;
  brand: string;
  desc: string;
  createdAt: string;
}

const AllProducts = () => {
  const { data, error, isLoading } = useProducts()
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Delete");
    },
    onError: (error: any) => {
      console.log(error.message, "Error product wasn't deleted");
    },
  });

  const deleteFunc = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Product Deleted");
    } catch (error: any) {
      console.error("Error deleting product:", error.message);
    }
  };

  const navigateEdit = (productId: string) => {
    navigate(`update-product/${productId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <p className="text-sm text-[#707EAE] font-medium mt-3 ">
        Pages / All Products
      </p>
      <p className="text-2xl font-[700] text-[#2B3674]">Product Listing</p>
      <div className="relative p-3 overflow-x-auto sm:rounded-lg rounded-2xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-500 uppercase bg-white border-b font-bold ">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">ProductImg</th>
              <th scope="col" className="px-6 py-3">Quan.</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">F. Price</th>
              <th scope="col" className="px-6 py-3">Cat.</th>
              <th scope="col" className="px-6 py-3">Brand</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Edit</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any) => (
              <tr
                className="bg-white text-black hover:bg-gray-50"
                key={item._id}
              >
                <th scope="row" className="px-6 py-4 text-[#2B3674] font-bold">
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  <img src={item.productImg} alt={item.name} />
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
                <td
                  className="px-6 py-4 text-blue-600 underline cursor-pointer"
                  onClick={() => navigateEdit(item._id)}
                >
                  Edit
                </td>
                <td
                  className="px-6 py-4 text-blue-600 underline cursor-pointer"
                  onClick={() => deleteFunc(item._id)}
                >
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
