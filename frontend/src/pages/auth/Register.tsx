import { useEffect, useState } from "react";
import LoginImage from "../../../src/assets/product6.png";
import Google from "../../../src/assets/icons/googleicon.svg";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sign_up_user_validation_schema,
  validatePassword,
} from "../../components/validation-schema/authentication-schema";
import PasswordValidationChecker from "../../components/authentication/password-validation-checker";
import { AiFillCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import PasswordInputRHF from "../../components/authentication/password-input-rhf";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  loginWithGoogle,
  registerUser,
} from "../../components/redux/slices/auth/authSlice";

import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [isPasswordValid, setIsPasswordValid] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasAtLeast8Char: false,
  });

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sign_up_user_validation_schema),
  });

  // Data coming from the refine section
  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Invalid, password does not match");
    } else {
      // Passwords match, continue with submission.
      const userData: any = {
        name: data?.name,
        password: data?.password,
        email: data?.email
      };
      await dispatch(registerUser(userData));
    }
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  const googleLogin = async (credentialResponse: any) => {
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex sm:block gap-5 justify-between mx-16 xsm:mx-2 sm:mx-2">
        {isLoading}
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
                <div className="my-3">
                  <label htmlFor="name" className="flex">
                    Username{" "}
                    {errors.name && (
                      <div className=" text-red-800 text-[12px] flex items-center mx-2">
                        <AiFillCloseCircle />
                        {errors.name.message as string}
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    className={`input-box `}
                    placeholder="Igudy"
                    {...register("name", { required: true })}
                  />
                </div>
              </div>
              <div className="my-3">
                <label htmlFor="email" className="flex">
                  Email address{" "}
                  {errors.email && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.email.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="email"
                  className={`input-box `}
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
                      {errors.password.message as string}
                    </div>
                  )}
                </label>
                <span className="">
              
                {/* 
                  placeholder: any,
                  id: any;
                  name: any,
                  register: any,
                  onPaste: any,
                  value: any  
                */}
                  
                  <PasswordInputRHF
                    placeholder={"Password"}
                    name={"Password"}
                    register={{
                      ...register("password", {
                        required: true,
                        onChange: () => {
                          validatePassword(
                            watch("password"),
                            setIsPasswordValid
                          );
                        },
                      }),
                    }}
                  />
                </span>
              </div>
              <div className="my-3">
                <label htmlFor="confirmPassword" className="flex mb-2">
                  Confirm password
                  {errors.confirmPassword && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.confirmPassword.message && (
                        <div>{errors.confirmPassword.message as string}</div>
                      )}
                    </div>
                  )}
                </label>

                <div className="">
                  <PasswordInputRHF
                    placeholder={"Confirm Password"}
                    name={"ConfirmPassword"}
                    id={"confirmPassword"}
                    register={{
                      ...register("confirmPassword", {
                        required: true,
                        onChange: () => {
                          validatePassword(
                            watch("confirmPassword"),
                            setIsPasswordValid
                          );
                        },
                      }),
                    }}
                    onPaste={(e: any) => {
                      e.preventDefault();
                      toast.error("Cannot paste to input field");
                      return false;
                    }}
                    // value={}
                  />
                </div>
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
              </div>
              <button type="submit" className="submit">
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
          <div className="flex-row flex justify-center cursor-pointer sm:w-full my-6">
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                toast.error("Login Failed");
              }}
              size="large"
              text="signup_with"
              width={500}
              // height={100}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
