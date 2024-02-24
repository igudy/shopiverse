import React, { useState } from "react";
import { CardGraph } from "../../components/admin/Card.jsx";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../components/redux/api/categoryApi.jsx";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

interface ICategory {
  name?: string;
  slug?: string;
  _id?: string;
}

const Categories = () => {
  const {
    data: category = [] as ICategory[],
    error: getCategoryError,
    isLoading,
  } = useGetCategoriesQuery({}) ?? {};

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [categoryName, setCategoryName] = useState<string>("");
  const [categorySlug, setCategorySlug] = useState<string>("");

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
        (error as any).response?.data?.messageerror.response ||
        (error as any).response.data ||
        (error as any).response.data.message ||
        (error as any).message;
      ("An error occurred while creating the category");
      toast.error(errorMessage);
      console.log("Error creating category:", error);
    }
  };

  const deleteFunction = (slug?: string) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteCategory(slug); // Change id to slug here
              toast.success(`Category deleted successfully`);
            } catch (error) {
              const errorMessage =
                (error as any).response?.data?.message ||
                "An error occurred while deleting the category";
              toast.error(errorMessage);
              console.log("Error deleting category:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
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
                      Slug
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {Array.isArray(category) &&
                  category.map((item: ICategory, index: number) => (
                    <tbody key={item.slug} className="pt-10">
                      <tr className="bg-white text-black hover:bg-gray-50">
                        <td className="px-6 py-4  text-[#2B3674] font-bold">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4 text-gray-800">{item.slug}</td>
                        <td
                          className="px-6 py-4 p-1 bg-purple-600 mt-2 cursor-pointer flex justify-center items-center font-bold hover:bg-purple-800 text-white rounded-2xl"
                          onClick={() => deleteFunction(item.slug)}
                        >
                          Delete
                        </td>
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
