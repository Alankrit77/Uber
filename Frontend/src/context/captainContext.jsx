import React, { createContext, useContext, useState } from "react";

const CaptainContext = createContext();

export const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
    phone: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: 0,
      vehicleType: "",
    },
  });

  const value = { captain, setCaptain };

  return (
    <CaptainContext.Provider value={value}>{children}</CaptainContext.Provider>
  );
};

export const useCaptainContext = () => {
  const context = useContext(CaptainContext);
  if (!context) {
    throw new Error("useCaptainContext must be used within a CaptainProvider");
  }
  return context;
};
