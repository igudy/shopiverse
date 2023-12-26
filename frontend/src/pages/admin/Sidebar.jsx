import { NavLink, useRoutes, useMatch } from "react-router-dom";
import LogoDashboard from "../../assets/logo/shopiverse-dashboard-06.png";
import { MdHome } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

const Dashboard = () => {
  const match = useMatch("/admin");
  return (
    <NavLink
      to="/admin"
      className={`flex items-center ${
        match ? "text-purple-700 font-[700]" : ""
      }`}
    >
      <MdHome className="w-5 h-5 mr-1" />
      Dashboard
    </NavLink>
  );
};

const AllProducts = () => {
  const match = useMatch("/admin/all-products");
  return (
    <NavLink
      to="/admin/all-products"
      className={`flex items-center ${
        match ? "text-purple-700 font-[700]" : ""
      }`}
    >
      <FaList className="w-5 h-5 mr-1" />
      All Products
    </NavLink>
  );
};

const AddProduct = () => {
  const match = useMatch("/admin/add-product");
  return (
    <NavLink
      to="/admin/add-product"
      className={`flex items-center ${
        match ? "text-purple-700 font-[700]" : ""
      }`}
    >
      <MdAddBox className="w-5 h-5 mr-1" />
      Add Product
    </NavLink>
  );
};

const Orders = () => {
  const match = useMatch("/admin/orders");
  return (
    <NavLink
      to="/admin/orders"
      className={`flex items-center ${
        match ? "text-purple-700 font-[700]" : ""
      }`}
    >
      <MdOutlineShoppingCart className="w-5 h-5 mr-1" />
      Orders
    </NavLink>
  );
};

const Exit = () => {
  const match = useMatch("/login");
  return (
    <NavLink
      to="/login"
      className={`flex items-center ${
        match ? "text-purple-700 font-[700]" : ""
      }`}
    >
      <IoExitOutline className="w-5 h-5 mr-1" />
      Exit
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <nav className="bg-white text-gray-700 font-medium h-screen min-w-[200px  ] w-1/6">
      <img
        src={LogoDashboard}
        className="w-[130px] mx-4 h-20 mb-5"
        alt={"logo"}
      />

      <div className="w-[100%] bg-gray-200 h-[1px] my-6"></div>

      <ul className="space-y-7 font-[400] text-sm text-gray-500 p-4">
        <li className="">
          <Dashboard />
        </li>
        <li className="">
          <AllProducts />
        </li>
        <li className="">
          <AddProduct />
        </li>
        <li className="">
          <Orders />
        </li>
      </ul>
      <div className="mt-32 p-4">
        <Exit />
      </div>
    </nav>
  );
};

export default Sidebar;
