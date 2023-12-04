import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/slices/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

export const AdminAuthorLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  if (isLoggedIn && (user.role === "admin" || user.role == "author")) {
    return <div>{children}</div>;
  } else {
    return null;
  }
};

export const AdminLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  if (isLoggedIn && user.role === "admin") {
    return <div>{children}</div>;
  } else {
    return null;
  }
};
