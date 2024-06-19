import LoginImage from "../../../src/assets/product6.png";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { access_validation_schema } from "../../components/validation-schema/authentication-schema";
import toast from "react-hot-toast";
import { IoEnterOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  loginWithCode,
  sendLoginCode,
} from "../../components/redux/slices/auth/authSlice";

const EnterAccessCode = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(access_validation_schema),
  });

  // Data coming from the refine section
  const onSubmit = async (data) => {
    const code = {
      loginCode: data?.access,
    };

    await dispatch(loginWithCode({ code, email }));
    // console.log(`Data submitted`, data);
    // toast.success("Data submitted");
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);
  return (
    <div>
      <Navbar />
      {isLoading && <div>Loading....</div>}
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
            <h1 className="text-5xl font-bold font-serif my-3 mb-6 text-purple-00 xsm:text-xl sm:text-xl mt-10 md:text-2xl sm:mt-1 flex">
              <IoEnterOutline />
              Enter Access Code
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <label htmlFor="access" className="flex">
                  Access Code{" "}
                  {errors.access && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.access.message}
                    </div>
                  )}
                </label>
                <input
                  type="access"
                  id="access"
                  className={`input-box `}
                  placeholder="Access code"
                  {...register("access", { required: true })}
                />{" "}
              </div>
              <button type="submit" className="submit">
                Submit
              </button>
            </form>
            <div className="my-1">
              <div className="text-blue-600 hover:underline cursor-pointer mx-1 flex justify-between underline my-2">
                <div>
                  <Link to="/">
                    <div className="items-center mx-1 hover:text-blue-800 flex">
                      Home <IoMdArrowForward />
                    </div>
                  </Link>
                </div>

                <div
                  className="mx-1 items-center font-bold hover:text-blue-800"
                  onClick={sendUserLoginCode}
                >
                  Resend Code
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnterAccessCode;
