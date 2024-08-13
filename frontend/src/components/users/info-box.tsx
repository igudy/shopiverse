import React from "react";

const InfoBox = ({ className, icon, text, number }: any) => {
  return (
    <div
      className={`${className} flex justify-between text-white p-4
        h-20 md:text-md drop-shadow-xl rounded-xl items-center text:text-sm`}
    >
      <div className="text-5xl">{icon}</div>
      <div className="text-right">
        <div>{text}</div>
        <div>{number}</div>
      </div>
    </div>
  );
};

export default InfoBox;
