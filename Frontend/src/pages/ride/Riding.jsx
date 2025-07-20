import { useUserContext } from "../../context/userContext";
import { rideTypes } from "../../constants/data";
import {
  MapPin,
  Phone,
  MessageSquare,
  Shield,
  Star,
  Clock,
} from "lucide-react";

const Riding = () => {
  const { selectedVehicle } = useUserContext();
  const selectedRide = rideTypes.find((ride) => ride.id === selectedVehicle);

  const driverInfo = {
    name: "Michael Chen",
    rating: 4.8,
    photo:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-1/2 relative">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map with route"
        />
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white py-2 px-4 rounded-full shadow-md flex items-center">
          <Clock size={16} className="mr-2 text-gray-700" />
        </div>
        <button className="absolute top-10 right-5 bg-white p-3 rounded-full shadow-md">
          <Shield size={20} className="text-gray-700" />
        </button>
      </div>

      <div className="h-1/2 bg-white">
        <div className="px-4 pt-4">
          <div className="flex justify-between mt-1.5 text-sm text-gray-500">
            <span>Pickup</span>
            <span>Destination</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-5 border-b">
          <div className="flex items-center">
            <img
              src={driverInfo.photo}
              alt={driverInfo.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />
            <div className="ml-3">
              <h3 className="font-medium">{driverInfo.name}</h3>
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500" />
                <span className="ml-1 text-sm">{driverInfo.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-3 bg-gray-100 rounded-full">
              <MessageSquare size={18} className="text-gray-700" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full">
              <Phone size={18} className="text-gray-700" />
            </button>
          </div>
        </div>

        <div className="px-4 py-5">
          <h3 className="font-semibold text-lg mb-4">Trip details</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <MapPin size={20} className="text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pickup location</p>
                <p className="font-medium">123 Main Street</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-black rounded-full">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-medium">456 Park Avenue</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Fare</p>
              <p className="font-bold text-xl">
                {selectedRide?.price || "$15.50"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ride type</p>
              <div className="flex items-center">
                <img
                  src={selectedRide?.icon}
                  alt={selectedRide?.name}
                  className="h-6 mr-2"
                />
                <p className="font-medium">{selectedRide?.name || "UberX"}</p>
              </div>
            </div>
          </div>

          <button className="mt-5 w-full bg-gray-100 py-3 rounded-lg font-medium">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
