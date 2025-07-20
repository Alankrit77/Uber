import { useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import { rideTypes } from "../../constants/data";
import { Users, MapPin, Clock } from "lucide-react";

const ConfirmRide = ({
  confirmRide,
  isLookingForDriver,
  createRide,
  pickupLocation,
  destinationLocation,
  actualRideFare,
}) => {
  const { selectedVehicle } = useUserContext();
  const selectedRide = rideTypes.find((ride) => ride.id === selectedVehicle);
  useEffect(() => {
    if (selectedVehicle) {
      console.log(`Ride with ID ${selectedVehicle} confirmed.`);
    }
  }, [selectedVehicle]);

  const handleCreateRide = async () => {
    await createRide(selectedRide.name);
  };
  return (
    <div>
      <div
        className={`fixed bottom-0 bg-white w-full px-3 py-8 z-30 transition-transform duration-300 ease-in-out ${
          confirmRide && !isLookingForDriver
            ? "translate-y-0"
            : "translate-y-full"
        }`}>
        {selectedRide && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Confirm Your Ride
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <img
                  src={selectedRide.icon}
                  alt={selectedRide.name}
                  className="h-16 w-16 object-contain"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedRide.name.toLocaleUpperCase()}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Users size={16} />
                    <span>{selectedRide.capacity} seats</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    {actualRideFare}
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

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Pickup</span>
                <span className="font-medium">{pickupLocation}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Destination</span>
                <span className="font-medium">{destinationLocation}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">Cash</span>
              </div>
            </div>

            <button
              onClick={handleCreateRide}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors duration-200">
              Confirm Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmRide;
