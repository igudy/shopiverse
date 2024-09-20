import { useEffect, useState } from "react";
import LoginImage from "../../../src/assets/login/shoe-login.png";
import Navbar from "../../components/navbar/Navbar";
// import Google from "../../../src/assets/icons/googleicon.svg";
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
// import { LoaderSkeleton } from "../../components/ui/loader";
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    // if (isSuccess && isLoggedIn) {
    //   navigate("/profile");
    // }
    
    if (isError && twoFactor) {
      // dispatch(sendLoginCode(email));
      // navigate(`/loginWithCode/${email}`);
      const encodedEmail: any = encodeURIComponent(email);
      dispatch((sendLoginCode(encodedEmail)));
      navigate(`/enter-access-code/${encodedEmail}`);
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email]);

  const googleLogin = async (credentialResponse: any) => {
    console.log("🚀 ~ googleLogin ~ credentialResponse:", credentialResponse)
    await dispatch(
      loginWithGoogle({userToken: credentialResponse.credential})
    );
  };

  const [urlParams] = useSearchParams();
  
  const redirect = urlParams.get("redirect");
  

  const {
    data: getCartData,
    isLoading: isLoadingCartData,
    error: isErrorCartData,
  } = useGetCartQuery({});

  const [saveCartDB, { isLoading: isLoadingCartDB }] =
      useSaveCartToDBMutation();

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      if (redirect === "cart")
      {
      navigate("/cart");
      } else{
        navigate("/");
      }
    }
  }, [isSuccess, isLoggedIn, navigate, getCartData]);

  return (
    <div>
      <Navbar />
      {isLoading && <div>Loading...</div>}
      <div className="flex sm:block gap-5 justify-between 
      mx-16 xsm:mx-2 sm:mx-2">
        <div className="basis-1/2 md:justify-center 
        xsm:justify-center justify-center flex flex-col
        xsm:hidden sm:hidden md:hidden lg:hidden
        sm:justify-center left-0">
          <img
            src={LoginImage}
            alt="loginImage"
            className="object-fill
            w-auto h-[50vh] lg:h-[35vh] justify-center 
            md:h-[20vh] sm:my-3 md:my-3 sm:h-[21vh] 
            xsm:h-[19vh] transitions-theme -rotate-[-15deg]
             hover:rotate-0 cursor-pointer z-20"
          />
        </div>

        <div className="flex flex-col mx-10 sm:mx-2 xsm:mx-2 
        p-5 my-7 shadow-2xl right-0 min-w-2xl">
          <div>
            <h1 className="text-5xl font-bold font-serif my-3 mb-6 text-purple-00 xsm:text-xl sm:text-xl mt-10 md:text-2xl sm:mt-1">
              Login to your account.
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
                      {(errors.email.message) as string}
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
              <div className="my-3">
                <label htmlFor="password" className="flex mb-2 my-1 ">
                  Password
                  {errors.password && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {(errors.password.message) as string}
                    </div>
                  )}
                </label>
                <span className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block `}
                    placeholder="Password"
                    {...register("password")}
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

              <button type="submit" className="submit">
                Submit
              </button>
            </form>
            <div className="my-1">
              <Link to="/forgot-password">
                <p className="text-blue-600 hover:underline cursor-pointer">
                  Forgot Password
                </p>
              </Link>
            </div>
            <div className="my-3 text-lg text-center justify-center sm:w-full sm:text-sm">
              Don&rsquo;t have an account?{" "}
              <span className="text-blue-700 hover:text-blue-900 font-medium cursor-pointer underline">
                {" "}
                <Link to="/register">Register Now</Link>
              </span>
            </div>
          </div>
          <div className="flex-row flex justify-center cursor-pointer sm:w-full">
            <div className="my-3">
              <GoogleLogin
                onSuccess={googleLogin}
                onError={() => {
                  toast.error("Login Failed");
                }}
                size="large"
                text="signin_with"
                width={500}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
