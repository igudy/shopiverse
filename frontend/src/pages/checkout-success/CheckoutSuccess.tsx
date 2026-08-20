import React from "react";
import Confetti from "react-confetti";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  //   const { innerWidth: width, innerHeight: height } = window;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen relative px-4">
        <Confetti className="w-full h-screen scale-100" />
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Thank you for your purchase!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Your order was successful. We appreciate your business!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-10 w-full sm:w-auto">
            <Link
              className="bg-purple-800 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl cursor-pointer hover:bg-purple-600 transition text-sm sm:text-base text-center"
              to="/profile?wallet"
            >
              Profile
            </Link>
            <Link
              className="bg-purple-800 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl cursor-pointer hover:bg-purple-600 transition text-sm sm:text-base text-center"
              to="/"
            >
              Go Back Home
            </Link>
            <Link
              className="bg-purple-800 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl cursor-pointer hover:bg-purple-600 transition text-sm sm:text-base text-center"
              to="/order-history"
            >
              Order History
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
