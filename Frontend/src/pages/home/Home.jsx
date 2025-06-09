import { lazy, useRef, useState } from "react";

import Uber from "../../assets/uber_trans.png";
import LookingForDriver from "../../componets/userSideView/LookingForDriver";
import WaitingForDriver from "../../componets/userSideView/WaitingForDriver";

const LocationSearch = lazy(() =>
  import("../../componets/userSideView/LocationSearch")
);
const VehicleDetails = lazy(() =>
  import("../../componets/userSideView/VehicleDetails.jsx")
);
const ConfirmRide = lazy(() =>
  import("../../componets/userSideView/ConfirmRide.jsx")
);

const Home = () => {
  const [isSearchTop, setIsSearchTop] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);
  const [isWaitingForDriver, setIsWaitingForDriver] = useState(false);
  const searchRef = useRef(null);

  const handleGoesTop = () => {
    setIsSearchTop(true);
  };

  const handleGoesDown = () => {
    setIsSearchTop(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search submitted");
  };

  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-5 top-5 bg-white rounded-full p-2 shadow-md"
        src={Uber}
        alt="Home"
      />
      <div className="w-screen h-screen object-cover">
        {isSearchTop ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10 hidden"></div>
        ) : (
          <img
            className="w-full h-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
        )}
      </div>

      <div
        ref={searchRef}
        className={`bg-white fixed w-full p-5 shadow-lg transition-all z-20 ${
          isSearchTop ? "top-0 h-full" : "bottom-0"
        }`}>
        {isSearchTop ||
          (vehicle && (
            <div
              className="absolute right-5 top-5 cursor-pointer"
              onClick={handleGoesDown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          ))}

        {!vehicle && (
          <>
            <h4 className="text-2xl font-semibold">Find your ride</h4>
            <form
              className="flex flex-col space-y-4 mt-4"
              onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute h-16 w-1 top-1/3 bg-black mx-4 my-8"></div>
                <div className="absolute w-2 h-2 bg-black rounded-full top-1/3 mx-3.5 my-8"></div>
                <div
                  className="absolute w-2 h-2 bg-black rounded-full top-1/3 mx-3.5 my-8"
                  style={{ top: "calc(33.333333% + 4rem)" }}></div>
              </div>
              <input
                onClick={handleGoesTop}
                type="text"
                placeholder="Enter pickup location"
                className="border p-2 rounded bg-[#eee] px-10"
              />
              <input
                onClick={handleGoesTop}
                type="text"
                placeholder="Enter drop-off location"
                className="border p-2 rounded bg-[#eee] px-10"
              />
              <button
                type="submit"
                className="bg-black text-white p-2 rounded hover:bg-gray-800">
                Search
              </button>
            </form>
          </>
        )}

        {isSearchTop && (
          <div className="mt-4">
            <LocationSearch vehicle={vehicle} setVehicle={setVehicle} />
          </div>
        )}
      </div>

      <VehicleDetails
        vehicle={vehicle}
        setConfirmRide={setConfirmRide}
        confirmRide={confirmRide}
      />
      <ConfirmRide
        vehicle={vehicle}
        confirmRide={confirmRide}
        setConfirmRide={setConfirmRide}
        setIsLookingForDriver={setIsLookingForDriver}
        isLookingForDriver={isLookingForDriver}
      />
      <LookingForDriver
        isLookingForDriver={isLookingForDriver}
        isWaitingForDriver={isWaitingForDriver}
        setIsWaitingForDriver={setIsWaitingForDriver}
      />
      <WaitingForDriver
        setIsWaitingForDriver={setIsWaitingForDriver}
        isWaitingForDriver={isWaitingForDriver}
      />
    </div>
  );
};

export default Home;
