import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });
  const storedUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (storedUser) {
      setUser(storedUser.user);
    }
  }, []);

  const [selectedVehicle, setSelectedVehicle] = useState();
  const [isWaitingForDriver, setIsWaitingForDriver] = useState(false);
  const handleConfirmRide = (id) => {
    setSelectedVehicle(id);
  };

  const value = {
    user,
    setUser,
    handleConfirmRide,
    selectedVehicle,
    setSelectedVehicle,
    isWaitingForDriver,
    setIsWaitingForDriver,
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
