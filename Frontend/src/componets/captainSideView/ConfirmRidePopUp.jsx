import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = ({
  isConfirmRidePopUpVisible,
  setIsRidePopUpVisible,
  setIsConfirmRidePopUpVisible,
}) => {
  const [otp, setOtp] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      // Handle OTP submission logic here
    }
  };

  const handleCancle = () => {
    setIsRidePopUpVisible(false);
    setIsConfirmRidePopUpVisible(false);
  };
  return (
    <div
      className={`fixed bottom-0 bg-white h-screen w-full px-5 py-6 z-30 rounded-t-3xl shadow-lg transition-transform duration-300 ease-in-out ${
        isConfirmRidePopUpVisible ? "translate-y-0" : "translate-y-full"
      }`}>
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-6">New Ride Request</h2>

        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="ml-1 text-sm">4.8</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex mb-4">
            <div className="mr-4 flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="h-12 w-0.5 bg-gray-300"></div>
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-xs text-gray-500">PICKUP</p>
                <p className="font-medium">123 Main Street</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">DROPOFF</p>
                <p className="font-medium">456 Park Avenue</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Distance</p>
              <p className="font-medium">5.2 km</p>
            </div>
            <div>
              <p className="text-gray-500">Est. Time</p>
              <p className="font-medium">15 min</p>
            </div>
            <div>
              <p className="text-gray-500">Fare</p>
              <p className="font-medium">$12.50</p>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="bg-blue-50 p-2 rounded-full mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-medium">Cash</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                onChange={(e) => setOtp(e.target.value)}
              />
            ))}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-4">
            <button
              onClick={handleCancle}
              className="py-3 bg-gray-200 rounded-lg font-medium">
              Decline
            </button>
            <Link
              to="/captain/riding"
              className="flex justify-center py-3 bg-black text-white rounded-lg font-medium">
              Accept
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
