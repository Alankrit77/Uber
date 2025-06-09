import React from "react";
import { useUserContext } from "../../context/userContext";
import { rideTypes } from "../../constants/data";
import { Users, MapPin, Clock, Loader } from "lucide-react";

const LookingForDriver = ({
  isLookingForDriver,
  isWaitingForDriver,
  setIsWaitingForDriver,
}) => {
  const { selectedVehicle } = useUserContext();

  const selectedRide = rideTypes.find((ride) => ride.id === selectedVehicle);

  return (
    <div>
      <div
        className={`fixed bottom-0 bg-white w-full px-3 py-8 z-30 transition-transform duration-300 ease-in-out ${
          isLookingForDriver && !isWaitingForDriver
            ? "translate-y-0"
            : "translate-y-full"
        }`}>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Loader className="animate-spin h-12 w-12 text-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-black rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Looking for a Driver
            </h2>
            <p className="text-gray-600">
              Finding the perfect driver for your ride...
            </p>
          </div>

          {selectedRide && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <img
                  src={selectedRide.icon}
                  alt={selectedRide.name}
                  className="h-16 w-16 object-contain"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedRide.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Users size={16} />
                    <span>{selectedRide.capacity} seats</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {selectedRide.price}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span>{selectedRide.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{selectedRide.description}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-lg">
              <span className="text-gray-700 font-medium">Status</span>
              <span className="text-blue-600 font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                Searching for driver
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Pickup</span>
              <span className="font-medium">Your Location</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Destination</span>
              <span className="font-medium">Selected Destination</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-700">Ride Confirmed</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-700 font-medium">Finding Driver</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-500">Driver En Route</span>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p
              onClick={() => setIsWaitingForDriver(true)}
              className="text-yellow-800 text-sm">
              This may take a few moments. We'll notify you once a driver
              accepts your ride!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
