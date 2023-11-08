import React from "react";
import ProfileImage from "../../assets/profile.jpg";
import { useForm, Controller } from "react-hook-form";

// Normal Form handling

const ProfileComponent = () => {

  return (
    <div className="flex sm:flex-col gap-10">
      <div className="basis-[20%] max-w-md bg-slate-100 rounded-lg shadow-md">
        <img
          src={ProfileImage}
          alt="profile_picture"
          className="rounded-full px-5 py-5"
        />
        <div className="justify-center text-center">
          <p className="mx-2 text-lg font-bold">@Igudy</p>
          <p className="mx-2 text-sm text-gray-500">Role: Admin</p>
        </div>
        <div className="px-3 py-2">
        Change Photo:

        </div>

      </div>
      <div className="basis-[75%] bg-slate-100 rounded-lg shadow-md p-3">
        <p className="text-2xl font-bold">Account data</p>
      </div>
    </div>
  );
};

export default ProfileComponent;
