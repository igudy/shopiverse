import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import CartModal from "../modal/CartModal";
import { Link, useNavigate } from "react-router-dom";
import { RESET, logout, selectUser } from "../redux/slices/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Logoout functionality
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

  return (
    <div
      className={
        !navState
          ? `flex flex-row justify-between items-center mx-14 py-8 xsm:mx-2 xsm:py-6 sm:mx-2 sm:py-8 md:mx-8 md:py-8`
          : `flex flex-row justify-between items-center mx-14 py-8 xsm:mx-2 xsm:py-6 sm:mx-2 sm:py-8 md:mx-8 md:py-8`
      }
    >
      <div className="">
        <img src={logo} className="w-[120px] h-6 cursor-pointer" alt="logo" />
      </div>
      <div className="flex text-white items-center gap-4 xsm:gap-0 sm:gap-1 right-0 z-[999999]">
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
          <Link to="/profile">
            <p className="cursor-pointer hover:underline">Hi {user?.name}</p>
          </Link>
        </ShowOnLogin>
        <ShowOnLogin>
          <Link to="/profile">
            <p className="cursor-pointer hover:underline">Profile</p>
          </Link>
        </ShowOnLogin>
        <ShowOnLogin>
          <p className="cursor-pointer hover:underline" onClick={logoutUser}>
            Logout
          </p>
        </ShowOnLogin>
        <CartModal
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default HomeNavbar;
