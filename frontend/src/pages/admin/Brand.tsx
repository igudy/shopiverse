import React, { useState } from "react";
import { CardGraph } from "../../components/admin/Card";
import {
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandQuery,
} from "../../components/redux/api/brandApi";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { useGetCategoriesQuery } from "../../components/redux/api/categoryApi";

interface IBrand {
  slug?: string;
  _id?: string;
  category?: string;
  name?: string;
}

interface ICategory {
  name?: string;
  slug?: string;
  _id?: string;
}

const Brand = () => {
  const {
    data: category = [] as ICategory[],
    error: getCategoryError,
    isLoading: categoryLoading,
  } = useGetCategoriesQuery({}) ?? {};

  const {
    data: brand = [] as IBrand[],
    error: getBrandError,
    isLoading,
  } = useGetBrandQuery({}) ?? {};

  const [createBrand] = useCreateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();
  const [brandName, setBrandName] = useState<string>("");
  const [slugName, setSlugName] = useState<string>("");
  const [brandSlug, setBrandSlug] = useState<string>("");
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  const handleBrandSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        name: brandName,
        slug: slugName,
        category: selectedSlug,
      };
      console.log(payload);
      await createBrand(payload);
      toast.success(`Brand ${brandName} created successfully`);

      setBrandName("");
      setBrandSlug("");
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.messageerror.response ||
        (error as any).response.data ||
        (error as any).response.data.message ||
        (error as any).message;
      ("An error occurred while creating the brand");
      toast.error(errorMessage);
      console.log("Error creating brand:", error);
    }
  };

  const deleteFunction = (slug?: string) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this brand?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteBrand(slug);
              toast.success(`Brand deleted successfully`);
            } catch (error) {
              const errorMessage =
                (error as any).response?.data?.message ||
                "An error occurred while deleting the brand";
              toast.error(errorMessage);
              console.log("Error deleting brand:", error);
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

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategorySlug = e.target.value;
    setSelectedSlug(selectedCategorySlug);

    const selectedCategory = category.find(
      (cat: any) => cat.slug === selectedCategorySlug
    );

    if (selectedCategory) {
      setBrandSlug(selectedCategory.slug);
    } else {
      setBrandSlug("");
    }
  };

  return (
    <div>
      <p className="text-sm text-[#707EAE] font-medium mt-3 ">
        Pages / Add Brand
      </p>
      <p className="text-2xl font-[700] text-[#2B3674]">Brand</p>
      <div className="px-2">
        <CardGraph>
          <form
            onSubmit={handleBrandSubmit}
            className="p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-5">
              <div className="flex flex-col w-[50%]">
                <div className="mb-6 text-xl">
                  Use the form to{" "}
                  <span className="font-bold">Create a Brand</span>
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
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
                <label className="text-gray-600 font-bold text-sm mt-3">
                  Slug:
                </label>
                <input
                  type="text"
                  placeholder="Iphone-11-Pro-Max"
                  required
                  className="bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block"
                  name="name"
                  value={slugName}
                  onChange={(e) => setSlugName(e.target.value)}
                />
                <label className="text-gray-600 font-bold text-sm mt-3">
                  Select Category:
                </label>
                <select
                  required
                  name="category"
                  className="bg-gray-50 border border-gray-500 rounded-lg p-2.5 sm:w-full sm:block"
                  value={selectedSlug}
                  onChange={handleBrandChange}
                >
                  <option value="">Select a category</option>
                  {category?.map((cat: any) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="w-[50%] bg-purple-600 text-white h-12 my-5 rounded-lg shadow-xl font-bold hover:bg-purple-700">
              Add Brand
            </button>
          </form>

          <div>
            <div className="text-2xl font-bold px-4">All Brands</div>
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
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {Array.isArray(brand) &&
                  brand?.map((item: IBrand, index: number) => (
                    <tbody key={item.slug} className="pt-10">
                      <tr className="bg-white text-black hover:bg-gray-50">
                        <td className="px-6 py-4  text-[#2B3674] font-bold">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4 text-gray-800">{item.slug}</td>
                        <td className="px-6 py-4">{item.category}</td>
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

export default Brand;
