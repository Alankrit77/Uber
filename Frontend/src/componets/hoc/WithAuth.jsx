import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext.jsx";

const WithAuth = ({ children }) => {
  const { user } = useUserContext();
  const token = localStorage.getItem("UserToken");
  const isAuthenticated = (user && user.email) || token;
  console.log("WithAuth isAuthenticated:", isAuthenticated);
  return isAuthenticated ? <div>{children}</div> : <Navigate to="/login" />;
};

export default WithAuth;
