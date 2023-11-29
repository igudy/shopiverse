import React, { useState } from "react";
import PasswordInputNormal from "../authentication/password-input-normal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RESET, changePassword, logout } from "../redux/slices/auth/authSlice";
import useRedirectLoggedOutUser from "../customHooks/useRedirectLoggedOutUser";
import { sendAutomatedEmail } from "../redux/slices/email/emailSlice";

const initialState = { oldPassword: "", newPassword: "", newPassword2: "" };

const Password = () => {
  useRedirectLoggedOutUser("/login");
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const { isLoading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const updatePassword = async (e) => {
  //   e.preventDefault();

  //   if (!oldPassword || !password || !password2) {
  //     return toast.error("All fields are required");
  //   }

  //   if (password !== password2) {
  //     return toast.error("Passwords do not match");
  //   }

  //   if (password !== password2) {
  //     return toast.error("Passwords do not match");
  //   }

  //   const userData = {
  //     oldPassword,
  //     password,
  //   };

  //   const emailData = {
  //     subject: "Password Changed - Shopiverse",
  //     send_to: user.email,
  //     reply_to: "noreply@igudy",
  //     template: "changePassword",
  //     url: "/forgot-password",
  //   };

  //   await dispatch(changePassword(userData));
  //   await dispatch(sendAutomatedEmail(emailData));
  //   await dispatch(logout());
  //   await dispatch(RESET(userData));
  //   navigate("/login");
  // };
  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are required");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - Shopiverse",
      send_to: user.email,
      reply_to: "noreply@igudy",
      template: "changePassword",
      url: "/forgot-password",
    };

    try {
      // Dispatch the changePassword action
      await dispatch(changePassword(userData));

      // Dispatch the sendAutomatedEmail action
      const emailResponse = await dispatch(sendAutomatedEmail(emailData));

      // Check the response from sendAutomatedEmail
      if (sendAutomatedEmail.fulfilled.match(emailResponse)) {
        // Dispatch the logout and RESET actions only if the email is sent successfully
        await dispatch(logout());
        await dispatch(RESET(userData));
        navigate("/login");
      } else {
        toast.error("Failed to send email");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center text-center ">
      <div className="border-2 rounded-xl w-[70%] sm:w-[100%] xsm:w-[100%] mx-3 p-6 shadow-lg">
        <h1 className="text-4xl sm:text-xl font-bold">Confirm Password</h1>
        <div>
          <form onSubmit={updatePassword}>
            <p className="my-3">
              <label>Current Password</label>
              <PasswordInputNormal
                placeholder="Old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={handleInputChange}
              />
            </p>
            <p className="my-3">
              <label>New Password:</label>
              <PasswordInputNormal
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </p>
            <p className="my-3">
              <label>Confirm New Password:</label>
              <PasswordInputNormal
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
            </p>
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
