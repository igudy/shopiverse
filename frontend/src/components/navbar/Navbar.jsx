import { useEffect, useState } from "react";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import CartModal from '../modal/CartModal';
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navState, setNavState] = useState(false);

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
      className={ `flex flex-row justify-between items-center py-8 px-10 sm:py-8 md:py-8 bg-purple-700`
      }
    >
      <div className="">
        {/* <img src={logo} className="w-[120px] h-6 cursor-pointer" alt="logo" /> */}
        <Link to="/">
            Shopiverse
        </Link>
      </div>
      <div className="flex items-center gap-4 xsm:gap-0 sm:gap-1 right-0">
        {/* <HeartIcon className="w-8 h-6 cursor-pointer" />

        <MagnifyingGlassIcon className="w-8 h-6 cursor-pointer" /> */}

        <Link to="/profile">
          <p className="cursor-pointer hover:underline">Profile</p>
        </Link>
        <Link to="/login">
          <p className="cursor-pointer hover:underline">Login</p>
        </Link>
        <Link to="/register">
          <p className="cursor-pointer hover:underline">Register</p>
        </Link>
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
