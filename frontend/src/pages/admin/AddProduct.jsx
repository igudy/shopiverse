import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card, { CardGraph } from "../../components/admin/Card";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Shoes" },
  { id: 5, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  quantity: 0,
  price: 0,
  falsePrice: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const { name, imageURL, quantity, price, falsePrice, category, brand, desc } =
    product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {};

  const handleAddProduct = (e) => {};

  return (
    <div>
      <p className="text-sm text-[#707EAE] font-medium mt-3 ">
        Pages / Add Product
      </p>
      <p className="text-2xl font-[700] text-[#2B3674]">Add Product</p>

      <div className="px-2">
        <CardGraph>
          <form onSubmit={handleAddProduct} className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-5">
              <div className="flex flex-col w-[50%]">
                <label className="text-gray-600">Product Name:</label>
                <input
                  type="text"
                  placeholder="Iphone 15 Pro Max"
                  required
                  className="bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block`"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <label className="text-gray-600">Product Quantity:</label>
                <input
                  type="text"
                  placeholder="45"
                  required
                  className="bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <label className="text-gray-600">Product Image:</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  value={product.imageURL}
                />
              </label>
            </div>
            {/* <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            /> */}

            <div className="flex gap-5">
              <div className="flex flex-col w-[50%]">
                <label>Product Price:</label>
                <input
                  type="text"
                  placeholder="Product Price"
                  required
                  className="bg-gray-50 border border-gray-500 rounded-lg p-2.5 sm:w-full sm:block"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col w-[50%]">
                <label>Product Discounted Price:</label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-500 rounded-lg p-2.5 sm:w-full sm:block"
                  placeholder="Product Discounted Price"
                  required
                  name="falsePrice"
                  value={product.falsePrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <label>Product Category</label>
            <select
              required
              name="category"
              className="bg-gray-50 border border-gray-500 rounded-lg p-2.5 sm:w-full sm:block"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              {categories?.map((cat) => (
                <option key={cat.id}>{cat.name}</option>
              ))}
            </select>

            <label>Product Brand</label>
            <input
              type="text"
              placeholder="Product Brand"
              className="bg-gray-50 border border-gray-500 rounded-lg p-2.5 sm:w-full sm:block"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
            />

            <label>Product Description</label>
            <textarea
              name="desc"
              required
              className="bg-gray-50 border border-gray-500 rounded-lg p-2.5 sm:w-full sm:block"
              placeholder="Product Description"
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            />

            <button className="w-full bg-purple-600 text-white h-14 my-10 rounded-lg shadow-xl font-bold hover:bg-purple-700">
              Add Product
            </button>
          </form>
        </CardGraph>
      </div>
    </div>
  );
};

export default AddProduct;
