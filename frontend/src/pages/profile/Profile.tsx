import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ProfileComponent from "../../components/profile/ProfileComponent";
import Password from "../../components/profile/Password";
import Users from "../../components/profile/Users";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import Footer from "../../components/footer/Footer";
import useRedirectLoggedOutUser from "../../components/customHooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { AdminLink } from "../../components/protect/hiddenLink";
import { getUser, selectUser, sendVerificationEmail } from "../../components/redux/slices/auth/authSlice";
import { CiViewList } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import Wishlist from "../../components/profile/Wishlist";
import Wallet from "../../components/profile/MyWallet";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const allTabs = [
  { tabName: "Profile", icon: <BiUser /> },
  { tabName: "My Wallet", icon: <CiWallet /> },
  { tabName: "Wishlist", icon: <CiViewList /> },
  { tabName: "Users", icon: <HiOutlineUserCircle /> },
  { tabName: "Password", icon: <RiLockPasswordLine /> },
];

const Profile = () => {
  const { isLoading, isError } = useSelector((state: any) => state.auth);
  useRedirectLoggedOutUser("/login");
  const [tab, setTab] = useState("Profile");
  const dispatch = useDispatch<any>();
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (urlParams.has("wallet")) {
      setTab("My Wallet");
    } else if (urlParams.has("wishlist")) {
      setTab("Wishlist");
    } else if (urlParams.has("users")) {
      setTab("Users");
    } else if (urlParams.has("password")) {
      setTab("Password");
    } else {
      setTab("Profile");
    }
  }, [urlParams]);

  const sendVerifyMail = () => {
    dispatch(sendVerificationEmail());
  };

  const handleTabClick = (tabName: string) => {
    setTab(tabName);
    setMobileMenuOpen(false);
    let param = "";
    switch (tabName) {
      case "My Wallet":
        param = "wallet";
        break;
      case "Wishlist":
        param = "wishlist";
        break;
      case "Users":
        param = "users";
        break;
      case "Password":
        param = "password";
        break;
      default:
        param = "profile";
        break;
    }
    navigate(`/profile?${param}`);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const user = useSelector(selectUser);

  return (
    <div>
      <Navbar />
      {user && (
        <div>
          {/* Mobile Menu Button */}
          <div className="md:hidden bg-gray-200 p-2 flex justify-between items-center">
            <button 
              onClick={toggleMobileMenu}
              className="flex items-center gap-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
              <span>Menu</span>
            </button>
            <div className="text-lg font-bold">{tab}</div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:block bg-gray-200 border-2 border-gray-300">
            <div className="flex justify-around mx-10 py-2">
              {allTabs.map((item, i) => (
                <div key={i} className="cursor-pointer">
                  <div
                    onClick={() => handleTabClick(item.tabName)}
                    className={`flex items-center px-3 ${
                      item.tabName === tab ? "font-bold" : "text-gray-700"
                    }`}
                  >
                    {item.icon} {item.tabName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-50`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Menu</h2>
                <button onClick={toggleMobileMenu}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {allTabs.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleTabClick(item.tabName)}
                    className={`p-3 rounded-lg ${
                      item.tabName === tab ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon} {item.tabName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overlay */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleMobileMenu}
            />
          )}

          {user.isVerified === true ? null : (
            <div className="p-3 bg-red-400 grid place-items-center gap-2 lg:flex lg:text-center lg:justify-center md:w-full">
              <div>
                Message: To verify your account check your email for a
                verification link.{"  "}
              </div>
              <div
                className="text-blue-800 font-bold lg:flex px-2 cursor-pointer"
                onClick={sendVerifyMail}
              >
                Resend Link
              </div>
            </div>
          )}
          
          <div className="my-5 mx-4 md:mx-10">
            <div>{tab === "Profile" && <ProfileComponent />}</div>
            <div>{tab === "My Wallet" && <Wallet />}</div>
            <div>{tab === "Wishlist" && <Wishlist />}</div>
            <div>{tab === "Password" && <Password />}</div>
            <AdminLink>
              <div>{tab === "Users" && <Users />}</div>
            </AdminLink>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;