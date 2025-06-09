const rideModel = require("../models/ride.model");
const mapService = require("./map.service");
class RideService {
  getFareEstimate = async (pickup, destination) => {
    console.log("Calculating fare estimate for:", pickup, destination);
    if (!pickup || !destination) {
      throw new Error("Pickup and destination locations are required");
    }
    try {
      const distance = await mapService.getDistanceFromGoogleMaps(
        pickup,
        destination
      );
      if (!distance || !distance.value) {
        throw new Error("Failed to fetch distance");
      }

      const rates = {
        bike: { base: 20, perKm: 8 },
        auto: { base: 30, perKm: 12 },
        car: { base: 50, perKm: 18 },
      };

      const distanceKm = distance.value / 1000;

      const fares = {};
      for (const [type, rate] of Object.entries(rates)) {
        fares[type] = Math.round(rate.base + rate.perKm * distanceKm);
      }

      return fares;
    } catch (error) {
      console.error("Error fetching fare estimate:", error);
      throw new Error("Failed to fetch fare estimate");
    }
  };
  createRide = async ({ userId, pickup, destination, vehicleType }) => {
    if (!userId && !pickup && !destination && !vehicleType) {
      throw new Error("Pickup, destination and vehicle type are required");
    }
    const getFair = await this.getFareEstimate(pickup, destination);
    console.log("Fare estimate:", getFair);
    if (!getFair) {
      throw new Error("Failed to fetch fare estimate");
    }
    const ride = new rideModel({
      user: userId,
      pickup,
      destination,
      vehicleType,
      fare: getFair[vehicleType],
    });

    return ride;
  };
}

const rideService = new RideService();
module.exports = rideService;
