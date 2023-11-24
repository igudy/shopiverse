import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../redux/slices/auth/authService";
import toast from "react-hot-toast";

const useRedirectLoggedOutUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn;
    const redirectLoggedOutUser = async (path) => {
      try {
        isLoggedIn = await authService.loginStatus();
      } catch (error) {
        console.log(error.message);
      }
      if (!isLoggedIn) {
        toast.info("Sesssion expired, please login to continue");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [path, navigate]);
};

export default useRedirectLoggedOutUser;
