import { fetcher } from "../lib/apiService";
import { HttpMethods } from "../lib/apiService";

const registerCaptain = async (captainData) => {
  try {
    const response = await fetcher(
      "/captains/register",
      HttpMethods.POST,
      captainData
    );
    return response;
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
    return response;
  } catch (error) {
    console.error("Error logging in captain:", error);
    throw error;
  }
};

export { registerCaptain, loginCaptain };
