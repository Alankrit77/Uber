import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "../../services/userService";

const UserWithAuth = ({ children }) => {
  const token = localStorage.getItem("UserToken");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!token,
    retry: 1,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.user) {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default UserWithAuth;
