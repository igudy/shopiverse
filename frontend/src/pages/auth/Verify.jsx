import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  RESET,
  verifyUser,
} from "../../components/redux/slices/auth/authSlice";

const Verify = () => {
  const { verificationToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verfiyUserFunction = () => {
    dispatch(verifyUser(verificationToken));
    navigate("/");
    // dispatch(RESET());
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center text-center sm:my-10 xsm:my-10 my-40">
        <p className="text-4xl xsm:text-lg sm:text-lg font-bold">
          Account Verification
        </p>
        <p>To verify your account Click the button below.</p>
        <div className="flex justify-center text-center">
          <button
            className="mt-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-72 mx-2 px-5 py-2.5 text-center sm:w-full"
            onClick={verfiyUserFunction}
          >
            Verify Account
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Verify;
