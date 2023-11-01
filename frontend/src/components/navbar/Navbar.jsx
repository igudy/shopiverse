import { useEffect, useState } from "react";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import CartModal from "./modal/CartModal";

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
    <div
      className={
        !navState
          ? `flex flex-row justify-between items-center mx-14 py-8 xsm:mx-2 xsm:py-6 sm:mx-2 sm:py-8 md:mx-8 md:py-8` : `flex flex-row justify-between items-center mx-14 py-8 xsm:mx-2 xsm:py-6 sm:mx-2 sm:py-8 md:mx-8 md:py-8`
          // : `flex flex-row justify-between items-center px-16 xsm:mx-2 xsm:py-6 sm:mx-2 sm:py-8 md:mx-8 md:py-8 fixed top-0 left-0 right-0 h-[9vh]  opacity-100 z-[999999] bg-black
          // `
      }
    >
      <div className="">
        <img src={logo} className="w-20 h-6 cursor-pointer" alt="logo" />
      </div>
      <div className="flex text-white items-center gap-4 xsm:gap-0 sm:gap-1 right-0 z-[999999]">
        <HeartIcon className="w-8 h-6 cursor-pointer" />

        <MagnifyingGlassIcon className="w-8 h-6 cursor-pointer" />

        <CartModal
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        />
        
      </div>
    </div>
  );
};

export default Navbar;
