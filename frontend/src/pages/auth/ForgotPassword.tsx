import LoginImage from "../../../src/assets/product6.png";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdExit, IoMdArrowForward } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgot_password_validation_schema } from "../../components/validation-schema/authentication-schema";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  RESET,
  forgotPassword,
} from "../../components/redux/slices/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgot_password_validation_schema),
  });

  // Data coming from the refine section
  const onSubmit = (data) => {
    const userData = {
      email: data?.email,
    };

    dispatch(forgotPassword(userData));
    dispatch(RESET(userData));
  };

  return (
    <div>
      <Navbar />
      <div className="flex sm:block gap-5 justify-between mx-16 xsm:mx-2 sm:mx-2 my-8">
        <div className="basis-1/2 md:justify-center xsm:justify-center justify-center flex flex-col xsm:hidden sm:hidden md:hidden lg:hidden sm:justify-center left-0">
          <img
            src={LoginImage}
            alt="loginImage"
            className="object-fill
            w-auto h-[50vh] lg:h-[35vh] justify-center md:h-[20vh] sm:my-3 md:my-3 sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[-15deg] hover:rotate-0 cursor-pointer z-20"
          />
        </div>

        <div className="flex flex-col mx-10 sm:mx-2 xsm:mx-2 p-5 my-7 shadow-2xl right-0  min-w-xl">
          <div className="">
            {/* <img src={Logo} alt='logo' className='mt-10 h-10 xsm:h-7 sm:h-7' /> */}
            {/* SHOPIVERSE */}
          </div>
          <div>
            <h1 className="text-5xl font-bold font-serif my-3 mb-6 text-purple-00 xsm:text-xl sm:text-xl mt-10 md:text-2xl sm:mt-1 flex ">
              <IoMdExit />
              Forgot Password
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <label htmlFor="email" className="flex">
                  Email address{" "}
                  {errors.email && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.email.message}
                    </div>
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  className={`input-box `}
                  placeholder="john.doe@company.com"
                  {...register("email", { required: true })}
                />{" "}
              </div>
              <button type="submit" className="submit">
                Submit
              </button>
            </form>
            <div className="my-1">
              <Link to="/forgot-password">
                <div className="text-blue-600 hover:underline cursor-pointer flex justify-between mx-1 underline my-2 ">
                  <Link to="/login">
                    <div className="left-0 flex mx-1 items-center hover:text-blue-800">
                      <BiArrowBack />
                      Login
                    </div>
                  </Link>
                  <Link to="/">
                    <div className="flex items-center mx-1 hover:text-blue-800">
                      Home <IoMdArrowForward />
                    </div>
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
