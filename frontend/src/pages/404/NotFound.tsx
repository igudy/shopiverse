import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const NotFound = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center h-screen flex-col items-center">
        <h2 className="font bold text-5xl">Page Not Found</h2>
        <p>This page can only be viewed by an admin user.</p>

        <br />
        <Link to="/">
          <button className="p-3 bg-purple-700 text-white font-bold rounded-md">
            Back to Home{" "}
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
