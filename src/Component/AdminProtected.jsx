import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const encryptedUser = Cookies.get("encryptedAdminUser");

  // Check if encrypted user data exists
  if (!encryptedUser) {
    return <Navigate to="/adminlogin" replace={true} />;
  }

  return children;
};

export default AdminProtected;
