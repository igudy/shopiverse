import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import About from "./pages/about/About.tsx";
import Contact from "./pages/contact/Contact.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import EnterAccessCode from "./pages/auth/EnterAccessCode.tsx";
import Profile from "./pages/profile/Profile.tsx";
import Verify from "./pages/auth/Verify.tsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Admin from "./pages/admin/Admin.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import AllProducts from "./pages/admin/AllProducts.tsx";
import Categories from "./pages/admin/Categories.tsx";
import Brand from "./pages/admin/Brand.tsx";
import Coupon from "./pages/admin/Coupon.tsx";
import AddProduct from "./pages/admin/AddProduct.tsx";
import Orders from "./pages/admin/Orders.tsx";
import UpdateProduct from "./pages/admin/UpdateProduct.tsx";
import ProductDetails from "./pages/productDetails/ProductDetails.tsx";
import "rc-slider/assets/index.css";

import {
  getUser,
  loginStatus,
  selectIsLoggedIn,
  selectUser,
} from "./components/redux/slices/auth/authSlice.tsx";
import NotFound from "./pages/404/NotFound.jsx";
import { useGetCartQuery } from "./components/redux/api/cartApi.jsx";
import Cart from "./pages/cart/Cart.jsx";
import CheckoutDetails from "./pages/checkout-details/CheckoutDetails.jsx";

axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(loginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/enter-access-code/:email" element={<EnterAccessCode />} />
        <Route path="/verify/:verificationToken" element={<Verify />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-details" element={<CheckoutDetails />} />

        {/* Admin section */}
        <Route path="/admin/*" element={<Admin />}>
          {/* Nested admin routes */}
          <Route index element={<Dashboard />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route
            path="all-products/update-product/:id"
            element={<UpdateProduct />}
          />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="brand" element={<Brand />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
