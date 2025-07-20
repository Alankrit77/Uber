import { fetcher, HttpMethods } from "../lib/apiService";

const showPickUpSuggestion = async (query) => {
  try {
    const response = await fetcher({
      url: `/maps/suggestions?query=${query}`,
      method: HttpMethods.GET,
    });

    return response;
  } catch (error) {
    console.error("Error fetching pickup suggestions:", error);
    throw error;
  }
};
const getFareEstimateForRide = async (payload) => {
  try {
    const { pickup, destination } = payload;

    const response = await fetcher({
      url: `/rides/get_fare?pickup=${pickup}&destination=${destination}`,
      method: HttpMethods.GET,
    });

    return response;
  } catch (error) {
    console.error("Error fetching fare estimate:", error);
    throw error;
  }
};

const createRideForPassenger = async (payload) => {
  try {
    const { pickup, destination, vehicleType } = payload;

    const response = await fetcher({
      url: `/rides/create`,
      method: HttpMethods.POST,
      data: {
        pickup,
        destination,
        vehicleType,
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating ride:", error);
    throw error;
  }
};
export { showPickUpSuggestion, getFareEstimateForRide, createRideForPassenger };
