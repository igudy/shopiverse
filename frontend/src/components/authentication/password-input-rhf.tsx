import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ placeholder, id, name, register, onPaste, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        className={`bg-gray-50 border border-gray-500 w-full rounded-lg p-2.5 sm:w-full sm:block`}
        placeholder={placeholder}
        {...register}
        onPaste={onPaste}
        value={value}
      />
      <spanp
        onClick={togglePasswordVisibility}
        className="cursor-pointer mx-[-40px]"
      >
        {showPassword ? (
          <AiFillEyeInvisible className="text-gray-800 w-7 h-7" />
        ) : (
          <AiFillEye className="text-gray-800 w-7 h-7" />
        )}
      </spanp>
    </div>
  );
};

export default PasswordInput;
