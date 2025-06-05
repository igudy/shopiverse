import { useEffect, useState } from "react";
import LoginImage from "../../../src/assets/product6.png";
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

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
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

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await dispatch(registerUser({ userData }));
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white">Loading...</div>
        </div>
      )}

      <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12 lg:gap-8 max-w-6xl">
          {/* Image Section - Hidden on mobile */}
          <div className="lg:basis-1/2 xl:basis-1/2 hidden md:flex items-center justify-center">
            <img
              src={LoginImage}
              alt="Registration"
              className="object-contain w-full max-h-[60vh] xl:max-h-[70vh] lg:max-h-[60vh] transition-transform duration-300 hover:rotate-0 -rotate-12"
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:basis-1/2 xl:basis-1/2 bg-white rounded-xl shadow-lg p-6 sm:p-4 xsm:p-3 max-w-md">
            <h1 className="text-4xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xsm:text-xl font-bold font-serif mb-6 text-gray-800">
              Create your account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Igudy"
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="absolute right-3 top-3 text-red-500">
                      <AiFillCloseCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john.doe@company.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="absolute right-3 top-3 text-red-500">
                      <AiFillCloseCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <PasswordInputRHF
                  placeholder="Password"
                  name="password"
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
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <PasswordInputRHF
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
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
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message as string}</p>
                )}
              </div>

              {/* Password Validation */}
              <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                <PasswordValidationChecker
                  title="At least 8 characters"
                  checked={isPasswordValid.hasAtLeast8Char}
                />
                <PasswordValidationChecker
                  title="At least 1 uppercase letter"
                  checked={isPasswordValid.hasUppercase}
                />
                <PasswordValidationChecker
                  title="At least 1 lowercase letter"
                  checked={isPasswordValid.hasLowercase}
                />
                <PasswordValidationChecker
                  title="At least 1 number"
                  checked={isPasswordValid.hasNumber}
                />
                <PasswordValidationChecker
                  title="At least 1 special character"
                  checked={isPasswordValid.hasSpecialChar}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-800 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium underline">
                Log In
              </Link>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={googleLogin}
                onError={() => toast.error("Registration Failed")}
                size="large"
                text="signup_with"
                width="300"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;