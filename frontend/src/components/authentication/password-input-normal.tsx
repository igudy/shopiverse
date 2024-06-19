import React, { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const PasswordInputNormal = ({
  placeholder,
  value,
  onChange,
  name,
  onPaste,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        className={`bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block`}
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
      />
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
    </div>
  );
};

export default PasswordInputNormal;
