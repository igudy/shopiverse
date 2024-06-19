import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsCircleFill, BsCircle } from "react-icons/bs";


function PasswordValidationChecker({ title, checked }) {
  return (
    <div className="flex gap-3 items-center">
      {checked ? (
        <AiOutlineCheckCircle size={10} className="text-lime-600" />
      ) : (
        <BsCircle size={10} className="text-gray-500" />
      )}
      <small className="font-semibold text-gray-500">{title}</small>
    </div>
  );
}

export default PasswordValidationChecker;
