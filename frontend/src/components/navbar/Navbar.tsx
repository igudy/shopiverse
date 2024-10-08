import { useEffect, useState } from "react";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
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
  const [isOpen, setIsOpen] = useState(false);
  const [navState, setNavState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const user = useSelector(selectUser);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems);

  // Logoout functionality
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function openModal() {
    setIsOpen(true);
  }

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

  // Recalculate total quantity when cart items change
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
  }, [cartItems, dispatch]);

  const handleNavigate = () => {
    navigate("/cart");
  };

  return (
    <div className="text-white text-sm">
      <div
        className={`flex flex-row justify-between items-center px-3 bg-purple-700`}
      >
        <div className="">
          <Link to={"/"}>
            <img
              src={NavImage}
              className="w-[160px] cursor-pointer"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 xsm:gap-0 sm:gap-1 right-0">
          <Link to="/profile">
            <p className="cursor-pointer hover:underline">
              {user?.name ? <>Hi {user.name.split(" ")[0]}</> : <>Profile</>}
            </p>
          </Link>
          <Link to="/admin">
            <p className="cursor-pointer hover:underline">Admin</p>
          </Link>
          <ShowOnLogin>
            <Link to="/order-history">
              <p className="cursor-pointer hover:underline">My Orders</p>
            </Link>
          </ShowOnLogin>
          <ShowOnLogout>
            <Link to="/login">
              <p className="cursor-pointer hover:underline">Login</p>
            </Link>
          </ShowOnLogout>
          <ShowOnLogout>
            <Link to="/register">
              <p className="cursor-pointer hover:underline">Register</p>
            </Link>
          </ShowOnLogout>
          <ShowOnLogin>
            <p className="cursor-pointer hover:underline" onClick={logoutUser}>
              Logout
            </p>
          </ShowOnLogin>
        <div onClick={handleNavigate}>
          <div
            className="bg-white
             shadow-xl w-5 h-5 
          rounded-full flex items-center font-medium justify-center mr-[-50px]
          mt-[-20px] z-[999]"
          >
            <span
              className="text-purple-800 
            text-[12px]"
            >
              {cartTotalQuantity}
            </span>
          </div>
          <ShoppingBagIcon
            type="button"
            className="w-8 h-6 mt-[-9px] ml-[-10px] cursor-pointer"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
