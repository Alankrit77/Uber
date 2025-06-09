import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });
  const [selectedVehicle, setSelectedVehicle] = useState();

  const handleConfirmRide = (id) => {
    setSelectedVehicle(id);
  };

  const value = {
    user,
    setUser,
    handleConfirmRide,
    selectedVehicle,
    setSelectedVehicle,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
