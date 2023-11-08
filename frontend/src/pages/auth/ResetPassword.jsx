import LoginImage from "../../../src/assets/product6.png";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { AiFillCloseCircle, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login_validation_schema, reset_password_validation_schema, validatePassword } from "../../components/validation-schema/authentication-schema";
import toast from "react-hot-toast";
import { useState } from "react";

const ResetPassword = () => {
      const [isPasswordValid, setIsPasswordValid] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasAtLeast8Char: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword =() => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(reset_password_validation_schema),
  });

  // Data coming from the refine section
  const onSubmit = (data) => {
    toast.success("Data submitted");
    console.log(`Data submitted`, data);
  };

  return (
    <>
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
              <GrPowerReset />
              Reset Password
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <label htmlFor="password" className="flex mb-2 my-1 ">
                  Password
                  {errors.password && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.password.message}
                    </div>
                  )}
                </label>
                <span className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block `}
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                      onChange: () => {
                        validatePassword(watch("password"), setIsPasswordValid);
                      },
                    })}
                  />{" "}
                  <span
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer mx-[-40px]"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="text-gray-800 w-7 h-7" />
                    ) : (
                      <AiFillEye className="text-gray-800 w-7 h-7" />
                    )}
                  </span>
                </span>
              </div>
              <div className="my-3">
                <label htmlFor="confirmPassword" className="flex mb-2">
                  Confirm password
                  {errors.confirmPassword && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.confirmPassword.message && (
                        <div>{errors.confirmPassword.message}</div>
                      )}
                    </div>
                  )}
                </label>
                <div className="flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className={`input-box `}
                    placeholder="Confirm password"
                    {...register("confirmPassword", { required: true })}
                  />
                  <span
                    onClick={toggleConfirmPassword}
                    className="cursor-pointer mx-[-40px]"
                  >
                    {showConfirmPassword ? (
                      <AiFillEyeInvisible className="text-gray-800 w-7 h-7" />
                    ) : (
                      <AiFillEye className="text-gray-800 w-7 h-7" />
                    )}
                  </span>
                </div>
              </div>

              <button type="submit" className="submit">
                Submit
              </button>
            </form>
            <div className="my-1">
              <Link to="/forgot-password">
                <p className="text-blue-600 hover:underline cursor-pointer flex justify-between mx-1 underline my-2 ">
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
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
