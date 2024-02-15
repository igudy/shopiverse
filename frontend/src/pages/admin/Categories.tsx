import React, { useState } from "react";
import { CardGraph } from "../../components/admin/Card.jsx";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../components/redux/api/categoryApi.jsx";
import { toast } from "react-hot-toast";

interface ICategory {
  name: string;
  slug: string;
}

const Categories = () => {
  const {
    data: category = [],
    error: getCategoryError,
    isLoading,
  } = useGetCategoriesQuery({}) ?? {};

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  const handleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        name: categoryName,
        slug: categorySlug,
      };
      console.log(payload);
      await createCategory(payload);
      toast.success(`Category ${categoryName} created successfully`);

      setCategoryName("");
      setCategorySlug("");
    } catch (error) {
      // Fix this error part
      const errorMessage =
        error.response?.data?.messageerror.response ||
        error.response.data ||
        error.response.data.message ||
        error.message;
      ("An error occurred while creating the category");
      toast.error(errorMessage);
      console.log("Error creating category:", error);
    }
  };

  return (
    <div>
      <p className="text-sm text-[#707EAE] font-medium mt-3 ">
        Pages / Add Categories
      </p>
      <p className="text-2xl font-[700] text-[#2B3674]">Categories</p>
      <div className="px-2">
        <CardGraph>
          <form
            onSubmit={handleCategorySubmit}
            className="p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-5">
              <div className="flex flex-col w-[50%]">
                <div className="mb-6 text-xl">
                  Use the form to{" "}
                  <span className="font-bold">Create a Category</span>
                </div>
                <label className="text-gray-600 font-bold text-sm mt-3">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Laptop"
                  required
                  className="bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block"
                  name="name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <label className="text-gray-600 font-bold text-sm mt-3">
                  Slug:
                </label>
                <input
                  type="text"
                  placeholder="Slug(Url) Name"
                  required
                  className="bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block"
                  name="slug"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                />
              </div>
            </div>

            <button className="w-[50%] bg-purple-600 text-white h-12 my-5 rounded-lg shadow-xl font-bold hover:bg-purple-700">
              Add Product
            </button>
          </form>

          <div>
            <div className="text-2xl font-bold px-4">All Categories</div>
            <div className="relative p-3 overflow-x-auto sm:rounded-lg rounded-2xl">
              <table className="w-full text-sm text-left  text-gray-500">
                <thead className="text-xs text-gray-500 uppercase bg-white border-b-2 font-bold ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S/N
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Slug
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {category?.map((item: ICategory, index: number) => (
                  <tbody>
                    <tr className="bg-white text-black hover:bg-gray-50">
                      <td className="px-6 py-4  text-[#2B3674] font-bold">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4 text-gray-800">{item.slug}</td>
                      <td className="px-6 py-4 text-gray-800">Delete</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </CardGraph>
      </div>
    </div>
  );
};

export default Categories;
