import React, { useState } from "react";
import LoginImage from "../../../src/assets/product6.png";
import Logo from "../../../src/assets/logo.png";
import Google from "../../../src/assets/icons/googleicon.svg";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sign_up_user_validation_schema,
  validatePassword,
} from "../../components/validation-schema/authentication-schema";
import PasswordValidationChecker from "../../components/authentication/password-validation-checker";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const Register = () => {
  const [isPasswordValid, setIsPasswordValid] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasAtLeast8Char: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sign_up_user_validation_schema),
  });

  // data coming from the refine section
  const onSubmit = (data) => {
     if (data.password !== data.confirmPassword) {
    // Handle password mismatch, display error, etc.
    console.log("Invalid, password does not match")
  } else {
    // Passwords match, continue with submission.
    console.log(`Data submitted`, data);
  }
  };

  return (
    <>
      <Navbar />
      <div className="flex sm:block gap-5 justify-between mx-16 xsm:mx-2 sm:mx-2">
        {/* <div className='bg-gradient-to-t from-purple-500 to-purple-300 h-10 sm:w-full'></div> */}
        <div className="basis-1/2 md:justify-center xsm:justify-center justify-center flex flex-col xsm:hidden sm:hidden md:hidden lg:hidden sm:justify-center left-0">
          <img
            src={LoginImage}
            alt="loginImage"
            className="object-fill
            w-auto h-[50vh] lg:h-[35vh] justify-center md:h-[20vh] sm:my-3 md:my-3 sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[-15deg] hover:rotate-0 cursor-pointer z-20"
          />
        </div>

        <div className="flex flex-col mx-10 sm:mx-2 xsm:mx-2 p-5 my-7 shadow-2xl right-0">
          <div className="">
            {/* <img src={Logo} alt='logo' className='mt-10 h-10 xsm:h-7 sm:h-7' /> */}
            {/* SHOPIVERSE */}
          </div>
          <div>
            <h1 className="text-5xl font-bold font-serif my-3 mb-6 text-purple-00 xsm:text-xl sm:text-xl mt-10 md:text-2xl sm:mt-1">
              Create your account.
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col text-sm">
                <div className="flex md:gap-2 lg:gap-10 xl:gap-10 items-center justify-between sm:block">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="flex my-1">
                      First name  {errors.firstName && (
                      <div className=" text-red-800 text-[12px] flex items-center mx-2">
                        <AiFillCloseCircle />
                        {errors.firstName.message && (<div>Required</div>)}
                      </div>
                    )}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className={`bg-gray-50 border border-gray-500 rounded-lg md:w-full w-60 sm:w-full p-2.5 
                      
                      `}
                      // ${
                      //   errors.firstName ? "border-red-500" : "border-green-500"
                      // }
                      placeholder="John"
                      {...register("firstName", { required: true })}
                    />{" "}
                     <span>
                       
                        </span>

                  </div>{" "}
                  <div className="flex flex-col">
                    <label htmlFor="last_name" className="flex my-1 ml-1">
                      Last name{errors.lastName && (
                      <div className=" text-red-800 text-[12px] flex items-center mx-2">
                        <AiFillCloseCircle />
                        {errors.lastName.message && (<div>Required</div>)}
                      </div>
                    )}
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className={`bg-gray-50 border border-gray-500 rounded-lg p-2.5 md:w-full w-60 sm:w-full`}
                      placeholder="Doe"
                      {...register("lastName", { required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className="my-3">
                <label htmlFor="email" className="flex">
                  Email address {errors.email && (
                      <div className=" text-red-800 text-[12px] flex items-center mx-2">
                        <AiFillCloseCircle />
                        {errors.email.message && (<div>Required</div>)}
                      </div>
                    )}
                </label>
                <input
                  type="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-500 rounded-lg w-full p-2.5 sm:w-full sm:block `}
                  placeholder="john.doe@company.com"
                  {...register("email", { required: true })}
                />{" "}
              </div>
              <div className="my-3">
                <label htmlFor="password" className="flex mb-2 my-1 ">
                  Password
                {errors.password && (
                      <div className=" text-red-800 text-[12px] flex items-center mx-2">
                        <AiFillCloseCircle />
                        {errors.password.message && (<div>Required</div>)}
                      </div>
                    )}
                </label>
                <input
                  type="password"
                  id="password"
                  className={`bg-gray-50 border border-gray-500 rounded-lg w-full p-2.5 sm:w-full sm:block `}
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    onChange: () => {
                      validatePassword(watch("password"), setIsPasswordValid);
                    },
                  })}
                />{" "}
              </div>
          <div className="my-3">
  <label htmlFor="confirmPassword" className="flex mb-2">
    Confirm password
    {errors.confirmPassword && (
      <div className=" text-red-800 text-[12px] flex items-center mx-2">
        <AiFillCloseCircle />
        {errors.confirmPassword.message && <div>{errors.confirmPassword.message}</div>}
      </div>
    )}
  </label>
  <input
    type="password"
    id="confirmPassword"
    className={`bg-gray-50 border border-gray-500 rounded-lg w-full p-2.5 sm:w-full sm:block `}
    placeholder="Confirm password"
    {...register("confirmPassword", { required: true })}
  />
</div>


              {/* All error messages */}
              <div className="flex flex-col text-[12px] border-2 p-2 rounded-xl">
                <div className="flex flex-col gap-2">
                  <PasswordValidationChecker
                    title="must contain at least 8 letters"
                    checked={isPasswordValid.hasAtLeast8Char}
                  />
                  <PasswordValidationChecker
                    title="must contain at least 1 uppercase letter"
                    checked={isPasswordValid.hasUppercase}
                  />
                  <PasswordValidationChecker
                    title="must contain at least 1 lowercase letter"
                    checked={isPasswordValid.hasLowercase}
                  />
                  <PasswordValidationChecker
                    title="must contain at least 1 number"
                    checked={isPasswordValid.hasNumber}
                  />
                  <PasswordValidationChecker
                    title="must contain at least 1 special character"
                    checked={isPasswordValid.hasSpecialChar}
                  />
                </div>

                {/* {errors.confirmPassword ? (
                  <div className=" text-red-800 text-[12px] flex items-center">
                    <AiFillCloseCircle />
                    {errors.confirmPassword.message}
                  </div>
                ) : (
                  <div className="flex items-center text-green-500">
                    <AiFillCheckCircle /> Confirm Password
                  </div>
                )} */}
              </div>
              <button
                type="submit"
                className="mt-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full px-5 py-2.5 text-center sm:w-full"
              >
                Submit
              </button>
            </form>

            <div className="my-3 text-lg text-center justify-center sm:w-full sm:text-sm">
              Have an account?{" "}
              <span className="text-blue-700 hover:text-blue-900 font-medium cursor-pointer underline">
                <Link to="/login">Log In Now</Link>
              </span>
            </div>
          </div>
          <div className="flex-row flex justify-center cursor-pointer sm:w-full">
            <div className="text-lg sm:text-sm flex border-2 rounded-full hover:bg-purple-200 w-72 items-center justify-center text-center">
              <img
                src={Google}
                className="w-6 h-6 mx-2 sm:w-4 sm:h-4 sm:text-sm"
                alt="google_image"
              />
              Login with google
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
