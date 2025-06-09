import { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon 
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET, logout, selectUser } from "../redux/slices/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import NavImage from "../../assets/logo/shopi.png";
import { 
  selectCartTotalQuantity, 
  CALCULATE_TOTAL_QUANTITY, 
  selectCartItems 
} from "../redux/slices/cart/CartSlice";

const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const user = useSelector(selectUser);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems);

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
  }, [cartItems, dispatch]);

  const handleNavigate = () => {
    navigate("/cart");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`bg-purple-800 text-white text-sm ${navState ? "shadow-sm" : ""}`}>
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="z-50">
          <img src={NavImage} className="w-[160px] cursor-pointer" alt="logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/profile" className="hover:underline">
            {user?.name ? <>Hi {user.name.split(" ")[0]}</> : <>Profile</>}
          </Link>
          
          <Link to="/admin" className="hover:underline">Admin</Link>
          
          <ShowOnLogin>
            <Link to="/order-history" className="hover:underline">My Orders</Link>
          </ShowOnLogin>
          
          <ShowOnLogout>
            <Link to="/login" className="hover:underline">Login</Link>
          </ShowOnLogout>
          
          <ShowOnLogout>
            <Link to="/register" className="hover:underline">Register</Link>
          </ShowOnLogout>
          
          <ShowOnLogin>
            <button onClick={logoutUser} className="hover:underline">Logout</button>
          </ShowOnLogin>

          {/* Cart Icon */}
          <div className="relative cursor-pointer" onClick={handleNavigate}>
            <div className="absolute -top-2 -right-2 bg-white shadow-xl w-5 h-5 rounded-full flex items-center justify-center z-10">
              <span className="text-purple-800 text-xs">{cartTotalQuantity}</span>
            </div>
            <ShoppingBagIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Mobile Menu Button and Cart */}
        <div className="flex md:hidden items-center gap-4">
          <div className="relative cursor-pointer" onClick={handleNavigate}>
            <div className="absolute -top-2 -right-2 bg-white shadow-xl w-5 h-5 rounded-full flex items-center justify-center z-10">
              <span className="text-purple-800 text-xs">{cartTotalQuantity}</span>
            </div>
            <ShoppingBagIcon className="w-6 h-6" />
          </div>
          
          <button onClick={toggleMobileMenu} className="text-white">
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-purple-800 shadow-lg transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40 md:hidden`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <img src={NavImage} className="w-[120px]" alt="logo" />
              <button onClick={toggleMobileMenu} className="text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 flex-grow">
              <Link to="/profile" className="hover:underline py-2" onClick={toggleMobileMenu}>
                {user?.name ? <>Hi {user.name.split(" ")[0]}</> : <>Profile</>}
              </Link>

              <Link to="/admin" className="hover:underline py-2" onClick={toggleMobileMenu}>Admin</Link>
              
              <ShowOnLogin>
                <Link to="/order-history" className="hover:underline py-2" onClick={toggleMobileMenu}>My Orders</Link>
              </ShowOnLogin>
              
              <ShowOnLogout>
                <Link to="/login" className="hover:underline py-2" onClick={toggleMobileMenu}>Login</Link>
              </ShowOnLogout>
              
              <ShowOnLogout>
                <Link to="/register" className="hover:underline py-2" onClick={toggleMobileMenu}>Register</Link>
              </ShowOnLogout>
              
              <ShowOnLogin>
                <button onClick={() => { logoutUser(); toggleMobileMenu(); }} className="hover:underline py-2 text-left">Logout</button>
              </ShowOnLogin>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
            onClick={toggleMobileMenu}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;