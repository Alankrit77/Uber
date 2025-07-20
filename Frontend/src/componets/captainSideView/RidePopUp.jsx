import { MapPin, Clock, DollarSign, Star, User } from "lucide-react";
import { useUserContext } from "../../context/userContext";

const RidePopUp = ({
  isRidePopUpVisible,
  setIsRidePopUpVisible,
  currentRide,
  confirmRide,
}) => {
  const { setIsWaitingForDriver } = useUserContext();
  const onReject = () => {
    setIsRidePopUpVisible(false);
  };
  const HandleAccept = () => {
    confirmRide();
    setIsWaitingForDriver(true);
  };

  return (
    <div
      className={`fixed bottom-0 bg-white w-full px-5 py-6 z-30 rounded-t-3xl shadow-lg transition-transform duration-300 ease-in-out ${
        isRidePopUpVisible ? "translate-y-0" : "translate-y-full"
      }`}>
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>

      <h2 className="font-bold text-xl mb-4">New Ride Request</h2>

      <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
        <div className="p-2 bg-gray-100 rounded-full">
          <User size={20} className="text-gray-700" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium">
            {currentRide?.passengerName?.firstname}{" "}
            {currentRide?.passengerName?.lastname}
          </h3>
        </div>
        <div className="ml-auto flex items-center text-green-600">
          <Clock size={16} className="mr-1" />
          <span className="text-sm font-medium">0.5 miles away</span>
        </div>
      </div>

      <div className="space-y-4 mb-5">
        <div className="flex items-center">
          <div className="p-2 bg-gray-100 rounded-full mr-3">
            <MapPin size={18} className="text-gray-700" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Pickup location</p>
            <p className="font-medium">{currentRide?.pickup}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-2 bg-black rounded-full mr-3">
            <MapPin size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Destination</p>
            <p className="font-medium">{currentRide?.destination}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-full mr-2">
            <DollarSign size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Estimated fare</p>
            <p className="font-bold text-xl">₹{currentRide?.fare}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500">Estimated time</p>
          <div className="flex items-center">
            <Clock size={16} className="text-gray-700 mr-1" />
            <p className="font-medium">{currentRide?.estimatedTime?.text}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReject}
          className="flex-1 py-3 bg-gray-100 rounded-lg font-medium">
          Ignore
        </button>
        <button
          onClick={HandleAccept}
          className="flex-1 py-3 bg-black text-white rounded-lg font-medium">
          Accept Ride
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
