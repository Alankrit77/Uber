import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [currentRide, setCurrentRide] = useState(null);

  const captainData = JSON.parse(localStorage.getItem("captain"));
  console.log("Captain Data from localStorage:", captainData);
  useEffect(() => {
    const stored = localStorage.getItem("captain");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.captain) {
          setCaptain(parsed?.captain);
        }
      } catch (err) {
        console.error("Error parsing captain from localStorage", err);
      }
    }
  }, []);

  const value = { captain, setCaptain, currentRide, setCurrentRide };

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
