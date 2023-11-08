import React, { useState } from "react";
import PasswordInputNormal from "../authentication/password-input-normal";

const initialState = { oldPassword: "", newPassword: "", newPassword2: "" };

const Password = () => {
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = () => {};

  return (
    <div className="flex justify-center text-center ">
      <div className="border-2 rounded-xl w-[70%] sm:w-[100%] xsm:w-[100%] mx-3 p-6 shadow-lg">
        <h1 className="text-4xl sm:text-xl font-bold">Confirm Password</h1>
        <div>
          <form>
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
