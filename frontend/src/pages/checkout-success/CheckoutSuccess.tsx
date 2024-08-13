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
      <div className="h-screen relative">
        {/* <Confetti width={width} height={height} /> */}
        <Confetti className="w-full h-screen scale-100" />
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
                  <p>Your order was successful. We appreciate your business!</p>
                  <div className="flex gap-10">
                                <Link
            className="my-5 bg-purple-700 text-white p-5 
                  rounded-2xl shadow-xl cursor-pointer
                   hover:bg-purple-600"
                      to="/"
          >
            Go Back Home
          </Link>
                  
          <Link
            className="my-5 bg-purple-700 text-white p-5 
                  rounded-2xl shadow-xl cursor-pointer
                   hover:bg-purple-600"
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
