import { Users } from "lucide-react";
import { rideTypes } from "../../constants/data";
import { useUserContext } from "../../context/userContext";

const VehicleDetails = ({ vehicle, setConfirmRide, confirmRide }) => {
  const { handleConfirmRide, selectedVehicle } = useUserContext();
  console.log("Selected Vehicle ID:", selectedVehicle);
  console.log({ vehicle, confirmRide });
  return (
    <div
      className={`fixed bottom-0 bg-white w-full px-3 py-8 z-30 transition-transform duration-300 ease-in-out ${
        vehicle && !confirmRide ? "translate-y-0" : "translate-y-full"
      }`}>
      <h2 className="text-2xl font-semibold mb-4">Available Rides</h2>
      {rideTypes.map((ride) => (
        <div
          key={ride.id}
          className="flex items-center justify-between p-3 w-full border-2 border-black-900 rounded-lg shadow-md mb-3"
          onClick={() => {
            handleConfirmRide(ride.id);
            setConfirmRide(true);
          }}>
          <img src={ride.icon} alt={ride.name} className="h-10" />
          <div className="w-1/2 ">
            <h4 className="text-base font-semibold flex items-center gap-2">
              {ride.name}
              <span className="flex items-center">
                <Users size={16} />
                {ride.capacity}
              </span>
            </h4>
            <h5 className="">{ride.time}</h5>
            <p className="">{ride.description}</p>
          </div>
          <h2 className="text-xl font-semibold">{ride.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default VehicleDetails;
