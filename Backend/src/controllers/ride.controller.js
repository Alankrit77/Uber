const rideService = require("../services/ride.service");
const { errorResponse, successResponse } = require("../utils/response");
const { validationResult } = require("express-validator");
class RideController {
  createRide = async (req, res) => {
    const { pickup, destination, vehicleType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, { errors: errors.array() });
    }

    try {
      const ride = await rideService.createRide({
        user: req.user._id,
        pickup,
        destination,
        vehicleType,
      });
      return successResponse(res, 201, "Ride created successfully", ride);
    } catch (error) {
      console.error("Error creating ride:", error);
      return errorResponse(res, 500, "Failed to create ride");
    }
  };
}

const rideController = new RideController();

module.exports = rideController;
