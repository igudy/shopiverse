import React, { useState } from "react";
import ProfileImage from "../../assets/profile.jpg";

const initialState = {
  name: "Igudy",
  email: "igudy@gmail.com",
  phone: "",
  bio: "",
  role: "",
  isVerified: false,
};

const ProfileComponent = () => {
  const [profile, setProfile] = useState(initialState);

  // Normal Form handling
  const handleImageChange = () => {
    console.log("Handle Image Change");
  };
  const handleInputChange = () => {
    console.log("Handle Input Change");
  };

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
          <form>
            <p className="my-3">
              <label className="text-sm">Change Photo:</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                className="input-box my-1"
                onChange={handleImageChange}
              />
            </p>
          </form>
        </div>
      </div>
      <div className="basis-[75%] bg-slate-100 rounded-lg shadow-md p-3">
        <p className="text-2xl font-bold">Account data</p>
        <form>
          <p>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="input-box my-1"
              value={profile.name}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              className="input-box my-1"
              value={profile.email}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              className="input-box my-1"
              value={profile.phone}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label>Bio:</label>
            <textarea
              type="text"
              name="bio"
              className="input-box my-1"
              value={profile.bio}
              onChange={handleInputChange}
              cols="30"
              rows="10"
            />
          </p>
          <button className="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;
