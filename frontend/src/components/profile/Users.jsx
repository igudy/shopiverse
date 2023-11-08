import React from "react";
import InfoBox from "../users/info-box";
import { FiUserCheck, FiUserMinus, FiUserPlus, FiUsers } from "react-icons/fi";

const userData = [
  {
    className: "bg-red-600",
    icons: <FiUsers />,
    text: "User 1",
    number: "43",
  },
  {
    className: "bg-green-600",
    icons: <FiUserCheck />,
    text: "User 1",
    number: "43",
  },
  {
    className: "bg-purple-600",
    icons: <FiUserMinus />,
    text: "User 1",
    number: "43",
  },
  {
    className: "bg-blue-600",
    icons: <FiUserPlus />,
    text: "User 1",
    number: "43",
  },
];

const Users = () => {
  return (
    <>
      <h1 className="text-4xl sm:text-xl font-bold">User Stats</h1>
      <div className="flex justify-between gap-3 sm:flex-col">
        {userData?.map((item, i) => (
          <div key={i}>
            <InfoBox
              className={item.className}
              icon={item.icons}
              text={item.text}
              number={item.number}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
