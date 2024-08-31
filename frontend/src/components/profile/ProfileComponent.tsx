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
  // useEffect(() => {
  //   dispatch(getUser());
  // }, [dispatch]);

  const dispatch = useDispatch<any>();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state: any) => state.auth
  );
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
    balance: user?.balance || ""
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setProfileImage(e.target.files[0]);

    if (selectedFile) {
      // Check the file size (in bytes)
      const fileSizeInBytes = selectedFile.size;
      const maxSizeInBytes = 3 * 1024 * 1024; //3MB

      if (fileSizeInBytes > maxSizeInBytes) {
        toast.error(
          "Image size exceeds the limit of 3MB. Please choose a smaller image."
        );

        // Clear the input field
        e.target.value = null;
        setProfileImage(null);
        setImagePreview(null);
        return;
      }

      // If the file size is within the limit, update state
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

        // Save image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/igudy/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url ? imgData.url.toString() : null;
      }

      // Save profile to MongoDB
      const userData: any = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      dispatch(updateUser({userData}));
    } catch (error: any) {
      toast.error(error.messageny);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
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
        <div className="flex sm:flex-col gap-10">
          <div className="basis-[20%] max-w-md bg-slate-100 rounded-lg shadow-md">
            <img
              src={imagePreview === null ? user?.photo : imagePreview}
              alt="profile_picture"
              className="rounded-full px-5 py-5"
            />
            <div className="justify-center text-center">
              <p className="mx-2 text-lg font-bold">{user?.name}</p>
              <p className="mx-2 text-sm text-gray-500">Role: {user.role}</p>
            </div>
            <div className="px-3 py-2">
              <p className="my-3">
                <label className="text-sm">Change Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                />
              </p>
            </div>
          </div>
          <div className="basis-[75%] bg-slate-100 rounded-lg shadow-md p-3">
            <p className="text-2xl font-bold">Account data</p>
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                className="input-box my-1"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>

            <p>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="input-box my-1 bg-gray-500"
                value={profile?.email}
                // readOnly
                disabled
              />
            </p>

            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                className="input-box my-1"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>

            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                className="input-box my-1"
                value={profile?.bio}
                onChange={handleInputChange}
                cols={30}
                rows={10}
              />
            </p>
            <button className="submit">Update Profile</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponent;
