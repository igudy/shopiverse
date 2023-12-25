import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Admin = () => {
  return (
    <>
      <div className="flex flex-auto h-screen">
        <Sidebar />
        <div className="grow bg-[#F4F7FE]">
          <div className="mt-5 ml-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
