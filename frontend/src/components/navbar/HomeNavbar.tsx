import { useEffect, useState } from "react";
// import CartModal from "../modal/CartModal";
import { Link, useNavigate } from "react-router-dom";
import { RESET, logout, selectUser } from "../redux/slices/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import NavImage from "../../assets/logo/shopi.png";
import { selectCartTotalQuantity } from "../redux/slices/cart/CartSlice";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  // Logout functionality
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  // Modals
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

  const handleNavigate = () => {
    navigate("/cart");
  };

  return (
    <div
      className={
        !navState
          ? `flex flex-row justify-between items-center 
          mx-14 py-2 xsm:mx-2 xsm:py-6 sm:mx-2 sm:py-8
           md:mx-8 md:py-2`
          : `flex flex-row justify-between items-center 
          mx-14 py-2 xsm:mx-2 xsm:py-6 sm:mx-2 sm:py-8 
          md:mx-8 md:py-2`
      }
    >
      <div className="">
        <img src={NavImage} className="w-[160px] cursor-pointer" alt="logo" />
      </div>
      <div
        className="flex text-white items-center gap-4 
      xsm:gap-0 sm:gap-1 right-0 z-[999999]"
      >
        <Link to="/profile">
          <p className="cursor-pointer hover:underline">
            {user?.name ? <>Hi {user.name.split(" ")[0]}</> : <>Profile</>}
          </p>{" "}
        </Link>

        <Link to="/admin">
          <p className="cursor-pointer hover:underline">Admin</p>
        </Link>
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
          <Link to="/order-history">
            <p className="cursor-pointer hover:underline">My Orders</p>
          </Link>
        </ShowOnLogin>
        <ShowOnLogin></ShowOnLogin>
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

        {/* <CartModal
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        /> */}
      </div>
    </div>
  );
};

export default HomeNavbar;
