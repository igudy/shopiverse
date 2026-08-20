import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center min-h-[70vh] flex-col items-center px-4 text-center">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-3">Page Not Found</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          This page can only be viewed by an admin user.
        </p>
        <Link to="/">
          <button className="p-3 px-6 bg-purple-800 text-white font-bold rounded-md hover:bg-purple-600 transition text-sm sm:text-base">
            Back to Home
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
