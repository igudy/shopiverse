import { useEffect, useState } from "react";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import logo from "../../assets/logo.png";
import CartModal from "../modal/CartModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET, logout, selectUser } from "../redux/slices/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import NavImage from "../../assets/logo/shopi.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navState, setNavState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
          {/* <HeartIcon className="w-8 h-6 cursor-pointer" />
        <MagnifyingGlassIcon className="w-8 h-6 cursor-pointer" /> */}
          <Link to="/admin">
            <p className="cursor-pointer hover:underline">Admin</p>
          </Link>
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
          {/* <Link to="/contact">
          <p className="cursor-pointer hover:underline">Contact</p>
        </Link> */}
          <CartModal
            openModal={openModal}
            closeModal={closeModal}
            isOpen={isOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
