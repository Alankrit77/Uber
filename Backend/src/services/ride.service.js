const rideModel = require("../models/ride.model");
const { getOtp } = require("../utils/helper");
const mapService = require("./map.service");

class RideService {
  getFareEstimate = async (pickup, destination) => {
    if (!pickup || !destination) {
      throw new Error("Pickup and destination locations are required");
    }
    try {
      const distance = await mapService.getDistanceFromGoogleMaps(
        pickup,
        destination
      );
      if (
        !distance ||
        !distance.distance.value ||
        distance.duration.value <= 0
      ) {
        throw new Error("Invalid distance data received from map service");
      }

      const rates = {
        bike: { base: 20, perKm: 8 },
        auto: { base: 30, perKm: 12 },
        car: { base: 50, perKm: 18 },
      };

      const distanceKm = distance.distance.value / 1000;
      const estimatedTimeSeconds = distance.duration.value;

      const fares = {};
      for (const [type, rate] of Object.entries(rates)) {
        fares[type] = Math.round(rate.base + rate.perKm * distanceKm);
      }

      return {
        fares,
        estimatedTime: {
          seconds: estimatedTimeSeconds,
          text: distance.duration.text,
          minutes: Math.round(estimatedTimeSeconds / 60),
        },
        distance: {
          meters: distance.distance.value,
          text: distance.distance.text,
          kilometers: Math.round(distanceKm * 100) / 100,
        },
      };
    } catch (error) {
      console.error("Error fetching fare estimate:", error);
      throw new Error("Failed to fetch fare estimate");
    }
  };

  createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
      throw new Error(
        "User, pickup, destination and vehicle type are required"
      );
    }
    const fareEstimate = await this.getFareEstimate(pickup, destination);
    if (!fareEstimate || !fareEstimate.fares) {
      throw new Error("Failed to fetch fare estimate");
    }

    const otp = getOtp(6);
    const ride = new rideModel({
      user: user,
      pickup,
      destination,
      vehicleType,
      fare: fareEstimate.fares[vehicleType],
      otp,
    });

    await ride.save();
    return { ride, fareEstimate };
  };
}

const rideService = new RideService();
module.exports = rideService;
