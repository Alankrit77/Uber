import { useState, useRef } from "react";

const useHomeData = () => {
  const [isSearchTop, setIsSearchTop] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);
  const [isWaitingForDriver, setIsWaitingForDriver] = useState(false);
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

  return {
    isSearchTop,
    setIsSearchTop,
    vehicle,
    setVehicle,
    confirmRide,
    setConfirmRide,
    isLookingForDriver,
    setIsLookingForDriver,
    isWaitingForDriver,
    setIsWaitingForDriver,
    searchRef,
    debounceTimeout,
    showPickup,
    setShowPickup,
    showDestination,
    setShowDestination,
    activeField,
    setActiveField,
    pickupLocation,
    setPickupLocation,
    destinationLocation,
    setDestinationLocation,
    rideFare,
    setRideFare,
    actualRideFare,
    setActualRideFare,
    pickupInputValue,
    setPickupInputValue,
    destinationInputValue,
    setDestinationInputValue,
  };
};

export default useHomeData;
