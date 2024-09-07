import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EnterAccessCode from "./pages/auth/EnterAccessCode";
import Profile from "./pages/profile/Profile";
import Verify from "./pages/auth/Verify";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import AllProducts from "./pages/admin/AllProducts";
import Categories from "./pages/admin/Categories";
import Brand from "./pages/admin/Brand";
import Coupon from "./pages/admin/Coupon";
import AddProduct from "./pages/admin/AddProduct";
import Orders from "./pages/admin/Orders";
import UpdateProduct from "./pages/admin/UpdateProduct";
import ProductDetails from "./pages/productDetails/ProductDetails";
import NotFound from "./pages/404/NotFound.jsx";
import Cart from "./pages/cart/Cart.jsx";
import CheckoutDetails from "./pages/checkout-details/CheckoutDetails.jsx";
import CheckoutStripe from "./pages/checkout/CheckoutStripe.jsx";
import CheckoutSuccess from "./pages/checkout-success/CheckoutSuccess.jsx";
import OrderHistory from "./pages/orders/OrderHistory.jsx";
import OrderDetails from "./pages/orders/OrderDetails.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser, loginStatus, selectIsLoggedIn, selectUser } from "./components/redux/slices/auth/authSlice";
import { useGetCartQuery } from "./components/redux/api/cartApi.jsx";
import CheckoutFlutterwave from "./pages/checkout/CheckoutFlutterwave";
import CheckoutPaypal from "./pages/checkout/CheckoutPaypal";
import CheckoutWallet from "./pages/checkout/CheckoutWallet";
import { AppDispatch } from "./components/redux/store";
import ReviewProduct from "./pages/review/ReviewProduct";
import EditProduct from "./pages/review/EditProduct";

axios.defaults.withCredentials = true;

const RedirectToCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/chekout-success")) {
      navigate("/checkout-success" + location.search);
    }
  }, [location, navigate]);

  return null;
};

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
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

        <Route path="/checkout-stripe" element={<CheckoutStripe />} />
        <Route path="/checkout-flutterwave" element={<CheckoutFlutterwave />} />
        <Route path="/checkout-paypal" element={<CheckoutPaypal />} />
        <Route path="/checkout-wallet" element={<CheckoutWallet />} />

        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-details" element={<OrderDetails />} />

        <Route path="/review-product/:id" element={<ReviewProduct />} />
        <Route path="/edit-review/:id" element={<EditProduct />} />

        {/* Admin section */}
        <Route path="/admin/*" element={<Admin />}>
          {/* Nested admin routes */}
          <Route index element={<Dashboard />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="all-products/update-product/:id" element={<UpdateProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="brand" element={<Brand />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        
        <Route path="/chekout-success/*" element={<RedirectToCheckout />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
