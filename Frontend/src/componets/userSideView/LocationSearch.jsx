import { MapPin } from "lucide-react";

const locationData = [
  {
    id: 1,
    address: "24B, 2nd Floor, Block B, Sector 2, Noida, Uttar Pradesh 201301",
  },
  {
    id: 2,
    address: "Sector 62, Noida, Uttar Pradesh 201309",
  },
  {
    id: 3,
    address: "Sector 18, Noida, Uttar Pradesh 201301",
  },
  {
    id: 4,
    address: "Sector 15, Noida, Uttar Pradesh 201301",
  },
];
const LocationSearch = ({ setVehicle, vehicle }) => {
  const handleClickLocation = () => {
    setVehicle(true);
  };
  console.log("Location clicked", vehicle);

  if (vehicle) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto ">
      {locationData.map((location) => (
        <div
          key={location.id}
          className="flex items-center gap-2 w-full"
          onClick={handleClickLocation}>
          <div className="bg-gray-200 p-2 rounded-full flex-shrink-0">
            <MapPin size={20} />
          </div>
          <p className="text-sm text-gray-700">{location.address}</p>
        </div>
      ))}
    </div>
  );
};

export default LocationSearch;
