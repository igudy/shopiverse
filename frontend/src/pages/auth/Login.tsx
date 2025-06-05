import { useEffect, useState } from "react";
import LoginImage from "../../../src/assets/login/shoe-login.png";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login_validation_schema } from "../../components/validation-schema/authentication-schema";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  RESET,
  loginUser,
  loginWithGoogle,
  selectUser,
  sendLoginCode,
} from "../../components/redux/slices/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useGetCartQuery, useSaveCartToDBMutation } from "../../components/redux/api/cartApi";

const Login = () => {
  const [email, setEmail] = useState<any>(null);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, isError, twoFactor } = useSelector(
    (state: any) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(login_validation_schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: any) => {
    const userData = {
      email: data?.email,
      password: data?.password,
    };
    setEmail(data?.email);

    try {
      const response = await dispatch(loginUser({ userData })).unwrap();
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isError && twoFactor) {
      const encodedEmail: any = encodeURIComponent(email);
      dispatch((sendLoginCode(encodedEmail)));
      navigate(`/enter-access-code/${encodedEmail}`);
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email]);

  const googleLogin = async (credentialResponse: any) => {
    await dispatch(loginWithGoogle({userToken: credentialResponse.credential}));
  };

  const [urlParams] = useSearchParams();
  const redirect = urlParams.get("redirect");
  const { data: getCartData } = useGetCartQuery({});

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate(redirect === "cart" ? "/cart" : "/");
    }
  }, [isSuccess, isLoggedIn, navigate, getCartData]);

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
              alt="loginImage"
              className="object-contain w-full max-h-[60vh] xl:max-h-[70vh] lg:max-h-[60vh] transition-transform duration-300 hover:rotate-0 -rotate-12"
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:basis-1/2 xl:basis-1/2 bg-white rounded-xl shadow-lg p-6 sm:p-4 xsm:p-3 max-w-md">
            <h1 className="text-4xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xsm:text-xl font-bold font-serif mb-6 text-gray-800">
              Login to your account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  <p className="mt-1 text-sm text-red-600">{(errors.email.message) as string}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiFillEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{(errors.password.message) as string}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-800 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-purple-600 hover:text-purple-800 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="my-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 hover:text-purple-800 font-medium underline">
                Register Now
              </Link>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={googleLogin}
                onError={() => toast.error("Login Failed")}
                size="large"
                text="signin_with"
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

export default Login;