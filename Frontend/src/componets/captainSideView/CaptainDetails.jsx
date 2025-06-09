import React from "react";
import {
  LogOut,
  Clock,
  User,
  ToggleLeft,
  DollarSign,
  Activity,
  Calendar,
} from "lucide-react";
const CaptainDetails = ({ isOnline, setIsOnline, captainStates }) => {
  const handleToggleStatus = () => {
    setIsOnline((prevStatus) => !prevStatus);
  };
  return (
    <div>
      {" "}
      <div className="h-1/2 bg-white p-4">
        <div className="flex justify-between items-center mb-5 pb-4 border-b">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center mr-3">
              <User size={24} className="text-gray-700" />
            </div>
            <div>
              <h3 className="font-medium">{captainStates.name}</h3>
              <div className="flex items-center">
                <p className="text-sm text-gray-500">
                  Rating: {captainStates.rating}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleStatus}
            className={`p-2 rounded-full flex items-center ${
              isOnline
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}>
            <ToggleLeft size={28} />
            <span className="ml-1 text-sm font-medium">
              {isOnline ? "Online" : "Offline"}
            </span>
          </button>
        </div>

        <div className="mb-5 pb-4 border-b">
          <h3 className="font-semibold text-lg mb-2">Today's Earnings</h3>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="font-bold text-2xl">
                {captainStates.todayEarnings}
              </p>
              <p className="text-sm text-gray-500">Available for cashout</p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-3">Your Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Calendar size={16} className="text-gray-700 mr-2" />
              <p className="text-sm text-gray-500">Total Trips</p>
            </div>
            <p className="font-semibold text-xl">{captainStates.totalTrips}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Activity size={16} className="text-gray-700 mr-2" />
              <p className="text-sm text-gray-500">Completion Rate</p>
            </div>
            <p className="font-semibold text-xl">
              {captainStates.completionRate}
            </p>
          </div>
        </div>

        {isOnline ? (
          <p className="text-center mt-6 text-gray-500">
            Waiting for ride requests...
          </p>
        ) : (
          <button
            onClick={handleToggleStatus}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg font-medium">
            Go Online
          </button>
        )}
      </div>
    </div>
  );
};

export default CaptainDetails;
