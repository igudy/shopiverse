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
                <label>Product Name:</label>
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
                <label>Product Quantity:</label>
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

            <label>Product Image</label>
            <label className="text-sm">Change Photo:</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />

            <div className="flex">
              <label>Product Price:</label>
              <input
                type="text"
                placeholder="Product Price"
                required
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>

            <label>Product Discounted Price:</label>
            <input
              type="text"
              placeholder="Product Discounted Price"
              required
              name="name"
              value={product.falsePrice}
              onChange={handleInputChange}
            />

            <label>Product Category</label>
            <select
              required
              name="category"
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
              name="brand"
              value={product.falsePrice}
              onChange={handleInputChange}
            />

            <label>Product Description</label>
            <textarea
              name="desc"
              required
              placeholder="Product Description"
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            />

            <button>Add Product</button>
          </form>
        </CardGraph>
      </div>
    </div>
  );
};

export default AddProduct;
