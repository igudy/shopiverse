import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white h-screen w-1/5 p-4">
      <ul>
        <li className="mb-4">
          <NavLink to="/admin" activeClassName="text-blue-500">
            Dashboard
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink to="/admin/all-products" activeClassName="text-blue-500">
            All Products
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink to="/admin/add-product" activeClassName="text-blue-500">
            Add Product
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink to="/admin/orders" activeClassName="text-blue-500">
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
