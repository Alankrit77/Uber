import { MapPin } from "lucide-react";

const LocationSearch = ({
  vehicle,
  suggestions,
  activeField,
  setPickupLocation,
  setDestinationLocation,
  setPickupInputValue,
  setDestinationInputValue,
}) => {
  const handleClickLocation = (location) => {
    if (activeField === "pickup") {
      console.log("Selected pickup location:", location);
      setPickupLocation(location);
      setPickupInputValue(location.description || "");
    } else {
      setDestinationLocation(location);
      setDestinationInputValue(location.description || "");
    }
  };

  if (vehicle) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5  w-full max-w-md mx-auto">
      <div className=" overflow-y-auto space-y-2 max-h-80 rounded-lg shadow-lg bg-white px-2 w-[350px]">
        {suggestions &&
          suggestions?.data?.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 w-full cursor-pointer hover:bg-gray-100 rounded-lg "
              onClick={() => handleClickLocation(location)}>
              <MapPin className="text-gray-600" />
              <span className="text-gray-800">{location.description}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LocationSearch;
