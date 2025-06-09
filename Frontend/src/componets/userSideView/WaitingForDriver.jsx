import React, { useState, useEffect } from "react";
import { rideTypes } from "../../constants/data";
import { useUserContext } from "../../context/userContext";
import {
  Users,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  X,
  ChevronDown,
} from "lucide-react";

const WaitingForDriver = ({ isWaitingForDriver }) => {
  const { selectedVehicle } = useUserContext();
  const selectedRide = rideTypes.find((ride) => ride.id === selectedVehicle);
  const [arrivalTime, setArrivalTime] = useState(3);
  const [expandedCard, setExpandedCard] = useState(true);

  // Simulate countdown timer
  useEffect(() => {
    if (arrivalTime <= 0) return;

    const timer = setTimeout(() => {
      setArrivalTime((prev) => Math.max(prev - 0.1, 0).toFixed(1));
    }, 6000);

    return () => clearTimeout(timer);
  }, [arrivalTime]);

  const driverInfo = {
    name: "Michael Chen",
    rating: 4.8,
    photo:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    car: "Toyota Camry",
    licensePlate: "XYZ 123",
    carColor: "White",
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white z-40 transition-transform duration-300 ease-in-out shadow-2xl rounded-t-2xl ${
        isWaitingForDriver ? "translate-y-0" : "translate-y-full"
      } ${expandedCard ? "max-h-[90vh]" : "max-h-[40vh]"}`}>
      <div className="h-6 bg-white flex justify-center items-center relative">
        <button
          onClick={() => setExpandedCard(!expandedCard)}
          className="absolute -top-3 bg-white w-12 h-6 rounded-full shadow-md flex justify-center items-center">
          <ChevronDown
            size={20}
            className={`transition-transform ${
              expandedCard ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full mr-2"></div>
            <p className="text-lg font-semibold">Driver is on the way</p>
          </div>
          <p className="text-2xl font-bold">{arrivalTime} min</p>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl mb-5">
          <div className="flex items-center">
            <img
              src={driverInfo.photo}
              alt={driverInfo.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{driverInfo.name}</h3>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${
                        i < Math.floor(driverInfo.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-500">
                  {driverInfo.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="p-3 bg-gray-100 rounded-full">
              <MessageSquare size={20} className="text-gray-600" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full">
              <Phone size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl mb-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-gray-500">Vehicle</h4>
              <p className="font-medium">
                {driverInfo.car} • {driverInfo.carColor}
              </p>
            </div>
            <div className="bg-black text-white py-1 px-3 rounded-lg text-sm font-bold">
              {driverInfo.licensePlate}
            </div>
          </div>
        </div>

        {expandedCard && (
          <>
            <div className="mb-5 border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold mb-3">Your trip</h3>

              <div className="flex items-start mb-3">
                <div className="mt-1 mr-3 relative">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="absolute left-1.5 top-3 w-0.5 h-12 bg-gray-300"></div>
                </div>
                <div>
                  <p className="font-medium">Current Location</p>
                  <p className="text-sm text-gray-500">123 Main Street</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium">Destination</p>
                  <p className="text-sm text-gray-500">456 Park Avenue</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedRide?.icon}
                    alt={selectedRide?.name}
                    className="h-10 mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{selectedRide?.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{selectedRide?.time}</span>
                    </div>
                  </div>
                </div>
                <p className="font-bold text-lg">{selectedRide?.price}</p>
              </div>
            </div>
          </>
        )}

        <button className="w-full py-3 bg-gray-100 text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
          Cancel Trip
        </button>
      </div>
    </div>
  );
};

export default WaitingForDriver;
