import { lazy, useEffect, useRef, useState } from "react";

import Uber from "../../assets/uber_trans.png";
import LookingForDriver from "../../componets/userSideView/LookingForDriver";
import WaitingForDriver from "../../componets/userSideView/WaitingForDriver";
import { useMutation } from "@tanstack/react-query";
import {
  createRideForPassenger,
  getFareEstimateForRide,
  showPickUpSuggestion,
} from "../../services/ride.service.js";

const LocationSearch = lazy(() =>
  import("../../componets/userSideView/LocationSearch")
);
const VehicleDetails = lazy(() =>
  import("../../componets/userSideView/VehicleDetails.jsx")
);
const ConfirmRide = lazy(() =>
  import("../../componets/userSideView/ConfirmRide.jsx")
);
import { socket, useSocket } from "../../context/socketHook.js";
import { useUserContext } from "../../context/userContext.jsx";

const Home = () => {
  const [isSearchTop, setIsSearchTop] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);

  const searchRef = useRef(null);
  const debounceTimeout = useRef(5000);
  const [showPickup, setShowPickup] = useState([]);
  const [showDestination, setShowDestination] = useState([]);
  const [activeField, setActiveField] = useState("pickup");
  const [pickupLocation, setPickupLocation] = useState({});
  const [destinationLocation, setDestinationLocation] = useState({});
  const [rideFare, setRideFare] = useState({});
  const [actualRideFare, setActualRideFare] = useState();
  const [pickupInputValue, setPickupInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");
  const { sendMessage, receiveMessage } = useSocket();
  const { user, isWaitingForDriver, setIsWaitingForDriver } = useUserContext();

  const showPickSuggestion = useMutation({
    mutationFn: showPickUpSuggestion,
  });
  const showDestinationSuggestion = useMutation({
    mutationFn: showPickUpSuggestion,
  });
  const getFareEstimate = useMutation({
    mutationFn: getFareEstimateForRide,
  });

  const createRideMutation = useMutation({
    mutationFn: createRideForPassenger,
  });

  const handleSearchForPickup = (event) => {
    const query = event.target.value;
    setPickupInputValue(query);
    if (!query) {
      setShowPickup([]);
    }
    setActiveField("pickup");
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (query.length > 2) {
        showPickSuggestion.mutate(query, {
          onSuccess: (data) => {
            setShowPickup(data);
          },
          onError: (error) => {
            console.error("Error fetching suggestions:", error);
          },
        });
      }
    }, 300);
  };
  const handleSearchForDestination = (event) => {
    const query = event.target.value;
    setDestinationInputValue(query);
    if (!query) {
      setShowDestination([]);
    }
    setActiveField("destination");
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (query.length > 2) {
        showDestinationSuggestion.mutate(query, {
          onSuccess: (data) => {
            setShowDestination(data);
          },
          onError: (error) => {
            console.error("Error fetching destination suggestions:", error);
          },
        });
      }
    }, 300);
  };
  const handleSearchGoesUp = () => {
    setIsSearchTop(true);
  };

  const handleGoesDown = () => {
    setIsSearchTop(false);
  };

  const handlefindVehicle = async (event) => {
    event.preventDefault();
    if (!pickupInputValue || !destinationInputValue) {
      alert("Please select both pickup and destination locations.");
      return;
    }
    setPickupLocation(pickupInputValue);
    setDestinationLocation(destinationInputValue);
    const payload = {
      pickup: pickupInputValue,
      destination: destinationInputValue,
    };
    getFareEstimate.mutate(payload, {
      onSuccess: (data) => {
        setRideFare(data.data);
        setVehicle(true);
      },
      onError: (error) => {
        console.error("Error fetching fare estimate:", error);
      },
    });
  };
  const createRide = async (vehicleType) => {
    const payload = {
      pickup: pickupLocation,
      destination: destinationLocation,
      vehicleType: vehicleType,
    };
    console.log("Creating ride with payload:", payload);

    createRideMutation.mutate(payload, {
      onSuccess: (data) => {
        console.log("Ride created successfully:", data);
        setIsLookingForDriver(true);
      },
      onError: (error) => {
        console.error("Error creating ride:", error);
      },
    });
  };

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id });
  }, []);

  socket.on("ride_confirmed", (data) => {
    console.log("Ride confirmed:", data);
    setIsLookingForDriver(false);
    setIsWaitingForDriver(true);
  });
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
              onSubmit={handlefindVehicle}>
              <div className="relative">
                <div className="absolute h-16 w-1 top-1/3 bg-black mx-4 my-8"></div>
                <div className="absolute w-2 h-2 bg-black rounded-full top-1/3 mx-3.5 my-8"></div>
                <div
                  className="absolute w-2 h-2 bg-black rounded-full top-1/3 mx-3.5 my-8"
                  style={{ top: "calc(33.333333% + 4rem)" }}></div>
              </div>{" "}
              <input
                onClick={() => {
                  handleSearchGoesUp();
                  setActiveField("pickup");
                }}
                onChange={(e) => {
                  handleSearchForPickup(e);
                }}
                type="text"
                value={pickupInputValue}
                name="pickup"
                placeholder="Enter pickup location"
                className="border p-2 rounded bg-[#eee] px-10"
              />{" "}
              <input
                onClick={() => {
                  handleSearchGoesUp();
                  setActiveField("destination");
                }}
                onChange={(e) => {
                  handleSearchForDestination(e);
                }}
                type="text"
                value={destinationInputValue}
                name="destination"
                placeholder="Enter drop-off location"
                className="border p-2 rounded bg-[#eee] px-10"
              />{" "}
              <button
                type="submit"
                disabled={
                  !pickupInputValue ||
                  !destinationInputValue ||
                  getFareEstimate.isPending
                }
                className={`p-2 rounded ${
                  !pickupInputValue || !destinationInputValue
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}>
                {getFareEstimate.isPending
                  ? "Finding vehicle..."
                  : "Find vehicle"}
              </button>
            </form>
          </>
        )}{" "}
        {isSearchTop && (
          <div className="mt-4">
            <LocationSearch
              vehicle={vehicle}
              suggestions={
                activeField === "pickup" ? showPickup : showDestination
              }
              activeField={activeField}
              setPickupLocation={setPickupLocation}
              setDestinationLocation={setDestinationLocation}
              setPickupInputValue={setPickupInputValue}
              setDestinationInputValue={setDestinationInputValue}
            />
          </div>
        )}
      </div>

      <VehicleDetails
        vehicle={vehicle}
        setConfirmRide={setConfirmRide}
        confirmRide={confirmRide}
        rideFare={rideFare}
        setActualRideFare={setActualRideFare}
      />
      <ConfirmRide
        vehicle={vehicle}
        confirmRide={confirmRide}
        setConfirmRide={setConfirmRide}
        isLookingForDriver={isLookingForDriver}
        pickupLocation={pickupLocation}
        destinationLocation={destinationLocation}
        rideFare={rideFare}
        actualRideFare={actualRideFare}
        createRide={createRide}
      />
      <LookingForDriver
        isLookingForDriver={isLookingForDriver}
        isWaitingForDriver={isWaitingForDriver}
        setIsWaitingForDriver={setIsWaitingForDriver}
        actualRideFare={actualRideFare}
        pickupLocation={pickupLocation}
        destinationLocation={destinationLocation}
      />
      <WaitingForDriver
        setIsWaitingForDriver={setIsWaitingForDriver}
        isWaitingForDriver={isWaitingForDriver}
      />
    </div>
  );
};

export default Home;
