import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../redux/slices/auth/authService";
import toast from "react-hot-toast";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn;
    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.loginStatus();
      } catch (error) {
        console.log(error.message);
      }

      if (!isLoggedIn) {
        toast.error("Session expired, please login to continue");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [path, navigate]);
};

export default useRedirectLoggedOutUser;
