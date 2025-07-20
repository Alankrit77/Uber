const rideService = require("../services/ride.service");
const mapService = require("../services/map.service");
const { errorResponse, successResponse } = require("../utils/response");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../../socket");
const rideModel = require("../models/ride.model");

class RideController {
  createRide = async (req, res) => {
    const { pickup, destination, vehicleType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, { errors: errors.array() });
    }
    if (!req.user || !req.user._id) {
      return errorResponse(res, 401, "Unauthorized: User not found");
    }
    try {
      const { ride, fareEstimate } = await rideService.createRide({
        user: req.user._id,
        pickup,
        destination,
        vehicleType,
      });
      const pickupLocationCords = await mapService.getCoordinatesFromAddress(
        pickup
      );

      if (
        !pickupLocationCords ||
        !pickupLocationCords.lat ||
        !pickupLocationCords.lng
      ) {
        return errorResponse(res, 400, "Invalid pickup location coordinates");
      }

      const lng = parseFloat(pickupLocationCords.lng);
      const lat = parseFloat(pickupLocationCords.lat);

      // Validate parsed coordinates
      if (isNaN(lat) || isNaN(lng)) {
        return errorResponse(res, 400, "Invalid latitude or longitude values");
      }
      // radius in 5km
      const radius = 500;
      const getCaptainsInTheRadius = await mapService.getCaptainsInTheRadius(
        lat,
        lng,
        radius
      );
      ride.otp = "";
      const rideObj = ride.toObject();
      rideObj.passengerName = req.user.fullname;
      rideObj.phone = req.user.phone;
      rideObj.phone = req.user.phone;
      rideObj.estimatedTime = fareEstimate.estimatedTime;
      getCaptainsInTheRadius.map((captain) => {
        sendMessageToSocketId(captain.socketId, {
          event: "new_ride",
          data: rideObj,
        });
      });

      return successResponse(res, 201, "Ride created successfully", {
        rideId: ride._id,
        userId: req.user._id,
        vehicleType: vehicleType,
        fare: ride,
        captains: getCaptainsInTheRadius,
      });
    } catch (error) {
      console.error("Error creating ride:", error);
      return errorResponse(res, 500, "Failed to create ride");
    }
  };
  getFare = async (req, res) => {
    const { pickup, destination } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, { errors: errors.array() });
    }
    if (!req.user || !req.user._id) {
      return errorResponse(res, 401, "Unauthorized: User not found");
    }
    try {
      const fare = await rideService.getFareEstimate(pickup, destination);
      return successResponse(res, 200, "Fare fetched successfully", fare);
    } catch (error) {
      console.error("Error fetching fare:", error);
      return errorResponse(res, 500, "Failed to fetch fare");
    }
  };
  confirmRide = async (req, res) => {
    console.log("Confirming ride request received");
    const { rideId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, { errors: errors.array() });
    }
    try {
      await rideModel.findOneAndUpdate(
        { _id: rideId, status: "pending" },
        { status: "confirmed", captain: req.captain._id },
        { new: true }
      );
      const ride = await rideModel
        .findOne({ _id: rideId, status: "confirmed" })
        .populate("user");
      if (!ride) {
        return errorResponse(res, 404, "Ride not found or already confirmed");
      }
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride_confirmed",
        data: ride,
      });
      return successResponse(res, 200, "Ride confirmed successfully", ride);
    } catch (error) {
      console.error("Error confirming ride:", error);
      return errorResponse(res, 500, "Failed to confirm ride");
    }
  };
}

const rideController = new RideController();

module.exports = rideController;
