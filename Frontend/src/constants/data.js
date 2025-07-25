import Car from "../assets/Car.png";
import Auto from "../assets/Uber_Auto.png";
import Bike from "../assets/Uber_Moto.png";

export const rideTypes = [
  {
    id: 1,
    name: "auto",
    icon: Auto,
    price: "$193.20",
    description: "Affordable, compact ride",
    time: "2 mins away",
    capacity: 4,
  },
  {
    id: 2,
    name: "bike",
    icon: Bike,
    price: "$150.00",
    description: "Quick and economical ride",
    time: "1 min away",
    capacity: 1,
  },
  {
    id: 3,
    name: "car",
    icon: Car,
    price: "$250.00",
    description: "Comfortable and spacious ride",
    time: "3 mins away",
    capacity: 4,
  },
];
