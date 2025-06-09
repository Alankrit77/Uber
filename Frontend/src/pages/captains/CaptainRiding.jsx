import React from "react";
import Uber from "../../assets/uber_trans.png";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import FinishRide from "./FinishRide";

const CaptainRiding = () => {
  const [finishRide, setFinishRide] = React.useState(false);
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 items-center justify-between w-screen">
        <img
          src={Uber}
          alt="Uber"
          className="w-16 absolute left-5 top-5 bg-white rounded-full p-2 shadow-md"
        />
        <button className="absolute top-10 right-5 bg-white p-3 rounded-full shadow-md">
          <LogOut size={20} className="text-gray-700" />
        </button>
      </div>
      <div className="h-4/5">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map view"
        />
      </div>
      <div className="h-1/5 bg-white p-6 flex flex-col items-center justify-center bg-yellow-400">
        <div className="flex items-center justify-between w-full max-w-xs mb-4">
          <span className="text-lg font-medium text-gray-700">4 km away</span>
          <button
            onClick={() => setFinishRide(true)}
            className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-900 transition">
            Complete Ride
          </button>
        </div>
      </div>
      <FinishRide finishRide={finishRide} />
    </div>
  );
};

export default CaptainRiding;
