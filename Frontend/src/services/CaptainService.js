import { fetcher, setAuthToken } from "../lib/apiService";
import { HttpMethods } from "../lib/apiService";

const registerCaptain = async (captainData) => {
  try {
    const response = await fetcher(
      "/captains/register",
      HttpMethods.POST,
      captainData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering captain:", error);
    throw error;
  }
};

const loginCaptain = async (captainData) => {
  try {
    const response = await fetcher(
      "/captains/login",
      HttpMethods.POST,
      captainData
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in captain:", error);
    throw error;
  }
};

const logoutCaptain = async () => {
  try {
    const token = localStorage.getItem("CaptainToken");
    if (token) {
      setAuthToken(token);
    }
    const response = await fetcher("/captains/logout", HttpMethods.GET);
    localStorage.removeItem("CaptainToken");
    localStorage.removeItem("captain");
    return response;
  } catch (error) {
    console.error("Error logging out captain:", error);
    throw error;
  }
};
const getCaptainProfile = async () => {
  try {
    const token = localStorage.getItem("CaptainToken");
    if (token) {
      setAuthToken(token);
    }
    const response = await fetcher("/captains/profile", HttpMethods.GET);
    return response.data;
  } catch (error) {
    console.error("Error fetching captain profile:", error);
    throw error;
  }
};
const confirmPassengerRide = async (rideId) => {
  try {
    const token = localStorage.getItem("CaptainToken");
    console.log("Confirming ride with ID:", token);
    if (token) {
      setAuthToken(token);
    }
    const response = await fetcher("/rides/confirm_ride", HttpMethods.POST, {
      rideId,
    });
    return response.data;
  } catch (error) {
    console.error("Error confirming passenger ride:", error);
    throw error;
  }
};

export {
  registerCaptain,
  loginCaptain,
  logoutCaptain,
  getCaptainProfile,
  confirmPassengerRide,
};
