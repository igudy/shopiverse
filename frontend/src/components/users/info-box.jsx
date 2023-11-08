import React from "react";

const InfoBox = ({ className, icon, text, number }) => {
  return (
    <div className="sm:flex sm:text-center  sm:justify-center">
      <div
        className={`${className} w-[340px] sm:w-[320px] lg:w-[300px] h-20 text-md drop-shadow-xl rounded-xl px-2`}
      >
        <div className="flex text-white justify-between p-3">
          <div className="text-5xl">{icon}</div>
          <div className="flex flex-col mx-2">
            <div>{text}</div>
            <div>{number}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
