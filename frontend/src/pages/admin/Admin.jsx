import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Admin = () => {
  return (
 <>
    <div className="flex flex-auto h-screen">
      <Sidebar />
    <div className="grow">
      <div className="m-5">
        <Outlet />
      </div>
    </div>
  </div>
  </>
  );
};

export default Admin;
