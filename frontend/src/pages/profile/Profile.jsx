import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ProfileComponent from "../../components/profile/ProfileComponent";
import Password from "../../components/profile/Password";
import Users from "../../components/profile/Users";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import Footer from "../../components/footer/Footer";
import useRedirectLoggedOutUser from "../../components/customHooks/useRedirectLoggedOutUser";
import { useSelector } from "react-redux";
import { LoaderSkeleton } from "../../components/ui/loader";
import { AdminLink } from "../../components/protect/hiddenLink";

const allTabs = [
  {
    tabName: "Profile",
    icon: <BiUser />,
  },
  {
    tabName: "Password",
    icon: <RiLockPasswordLine />,
  },
  { tabName: "Users", icon: <HiOutlineUserCircle /> },
];

const Profile = () => {
  const { isLoading, isError } = useSelector((state) => state.auth);
  useRedirectLoggedOutUser("/login");
  const [tab, setTab] = useState("Profile");

  return (
    <div>
      {isLoading && (
        <div>
          <LoaderSkeleton />
        </div>
      )}
      <Navbar />
      <div className="bg-gray-200 border-2 border-gray-300">
        <div className="flex justify-around mx-10 sm:mx-2 xsm:mx-2 py-2">
          {allTabs.map((item, i) => (
            <div key={i} className="cursor-pointer">
              <div
                onClick={() => setTab(item.tabName)}
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
      <div className="my-5 mx-10 sm:mx-2 xsm:mx-2 lg:mx-3">
        <div>{tab === "Profile" && <ProfileComponent />}</div>
        <div>{tab === "Password" && <Password />}</div>
        <AdminLink>
          <div>{tab === "Users" && <Users />}</div>
        </AdminLink>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
