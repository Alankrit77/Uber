import React, { useState } from "react";
import { Star, Clock, MapPin, User, DollarSign } from "lucide-react";

const FinishRide = ({ finishRide, onCompleteRide }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const tripData = {
    passengerName: "John Doe",
    distance: "5.2 km",
    duration: "18 min",
    fare: "$12.50",
  };

  const handleCompleteRide = () => {
    if (onCompleteRide) {
      onCompleteRide(rating);
    }
  };

  return (
    <div
      className={`fixed bottom-0 bg-white h-screen w-full px-5 py-6 z-30 rounded-t-3xl shadow-lg transition-transform duration-300 ease-in-out ${
        finishRide ? "translate-y-0" : "translate-y-full"
      }`}>
      <div className="flex flex-col h-full">
        <div className="text-center mb-6">
          <div className="w-12 h-1 bg-gray-300 mx-auto mb-4 rounded-full"></div>
          <h1 className="text-2xl font-bold">Finish Ride</h1>
        </div>

        <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-xl">
          <div className="bg-gray-200 p-3 rounded-full mr-4">
            <User className="text-gray-500" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{tripData.passengerName}</h3>
            <p className="text-gray-500">Passenger</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Trip Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <MapPin className="text-blue-500 mr-2" size={18} />
              <div>
                <p className="text-sm text-gray-500">Distance</p>
                <p className="font-medium">{tripData.distance}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg flex items-center">
              <Clock className="text-blue-500 mr-2" size={18} />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{tripData.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Rate the passenger</h2>
          <div className="flex justify-center">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <Star
                    fill={ratingValue <= (hover || rating) ? "#ffc107" : "none"}
                    stroke={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    className="cursor-pointer mx-1"
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Payment</h2>
          <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="text-green-500 mr-3" size={20} />
              <div>
                <p className="text-gray-500">Cash payment</p>
                <p className="font-bold text-lg">{tripData.fare}</p>
              </div>
            </div>
            <div className="bg-green-100 py-1 px-3 rounded-full">
              <p className="text-green-800 text-sm font-medium">Collected</p>
            </div>
          </div>
        </div>

        <div className="mt-auto mb-6">
          <button
            onClick={handleCompleteRide}
            className="bg-black text-white w-full py-4 rounded-xl font-semibold text-lg">
            Complete Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
