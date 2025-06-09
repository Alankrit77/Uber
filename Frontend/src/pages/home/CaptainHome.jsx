import { useState } from "react";
import { LogOut, Clock } from "lucide-react";
import { logoutCaptain } from "../../services/captainService";
import { useMutation } from "@tanstack/react-query";
import CaptainDetails from "../../componets/captainSideView/CaptainDetails";
import RidePopUp from "../../componets/captainSideView/RidePopUp";
import ConfirmRidePopUp from "../../componets/captainSideView/ConfirmRidePopUp";

const CaptainHome = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isRidePopUpVisible, setIsRidePopUpVisible] = useState(true);
  const [isConfirmRidePopUpVisible, setIsConfirmRidePopUpVisible] =
    useState(false);

  const logoutMutation = useMutation({
    mutationFn: logoutCaptain,
    onSuccess: () => {
      localStorage.removeItem("captain");
      localStorage.removeItem("CaptainToken");
      window.location.href = "/captain/login";
    },
  });
  const driverStats = {
    name: "Michael Davis",
    todayEarnings: "$85.50",
    totalTrips: 142,
    rating: 4.8,
    completionRate: "98%",
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-1/2 relative">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map view"
        />
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white py-2 px-4 rounded-full shadow-md flex items-center">
          <Clock size={16} className="mr-2 text-gray-700" />
          <span className="text-sm font-medium">
            Online: {isOnline ? "Active" : "Offline"}
          </span>
        </div>
        <button className="absolute top-10 right-5 bg-white p-3 rounded-full shadow-md">
          <LogOut size={20} className="text-gray-700" onClick={handleLogout} />
        </button>
      </div>

      <CaptainDetails
        isOnline={isOnline}
        setIsOnline={setIsOnline}
        captainStates={driverStats}
      />
      <RidePopUp
        setIsRidePopUpVisible={setIsRidePopUpVisible}
        isRidePopUpVisible={isRidePopUpVisible}
        setIsConfirmRidePopUpVisible={setIsConfirmRidePopUpVisible}
      />
      <ConfirmRidePopUp
        isConfirmRidePopUpVisible={isConfirmRidePopUpVisible}
        setIsRidePopUpVisible={setIsRidePopUpVisible}
        setIsConfirmRidePopUpVisible={setIsConfirmRidePopUpVisible}
      />
    </div>
  );
};

export default CaptainHome;
