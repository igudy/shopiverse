import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  selectUser,
  updateUser,
} from "../redux/slices/auth/authSlice";
import useRedirectLoggedOutUser from "../customHooks/useRedirectLoggedOutUser";
import toast from "react-hot-toast";

const upload_preset = import.meta.env.VITE_REACT_APP_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_REACT_APP_CLOUD_NAME;

const ProfileComponent = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: any) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
    balance: user?.balance || "",
  };

  const [profile, setProfile] = useState<any>(initialState);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setProfileImage(e.target.files[0]);

    if (selectedFile) {
      const fileSizeInBytes = selectedFile.size;
      const maxSizeInBytes = 3 * 1024 * 1024; //3MB

      if (fileSizeInBytes > maxSizeInBytes) {
        toast.error(
          "Image size exceeds the limit of 3MB. Please choose a smaller image."
        );
        e.target.value = null;
        setProfileImage(null);
        setImagePreview(null);
        return;
      }

      setProfileImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e: any) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/igudy/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url ? imgData.url.toString() : null;
      }

      const userData: any = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      dispatch(updateUser({ userData }));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  return (
    <div>
      <form onSubmit={saveProfile}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Profile Image Section */}
          <div className="bg-slate-100 rounded-lg shadow-md p-4 w-full md:w-[300px]">
            <div className="flex justify-center">
              <img
                src={imagePreview === null ? user?.photo : imagePreview}
                alt="profile_picture"
                className="rounded-full h-[200px] w-[200px] md:h-[300px] md:w-[300px] object-cover"
              />
            </div>

            <div className="text-center mt-4">
              <p className="text-lg font-bold">{user?.name}</p>
              <p className="text-sm text-gray-500">Role: {user?.role}</p>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm mb-2">Change Photo:</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="flex-1 bg-slate-100 rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4">Account Data</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded bg-gray-200"
                  value={profile?.email}
                  disabled
                />
              </div>

              <div>
                <label className="block mb-1">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full p-2 border rounded"
                  value={profile?.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block mb-1">Bio:</label>
                <textarea
                  name="bio"
                  className="w-full p-2 border rounded"
                  value={profile?.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <button 
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponent;