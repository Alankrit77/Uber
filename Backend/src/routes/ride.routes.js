const express = require("express");
const authmiddlewareInstance = require("../middlewares/auth.middleware");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");

router.post(
  "/confirm_ride",
  authmiddlewareInstance.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  rideController.confirmRide
);
router.post(
  "/create",
  authmiddlewareInstance.authUser,
  body("pickup").isString().withMessage("Pickup location must be required"),
  body("destination")
    .isString()
    .withMessage("Destination location must be required"),
  body("vehicleType")
    .isIn(["bike", "auto", "car"])
    .withMessage("Invalid vehicle type"),
  rideController.createRide
);
router.get(
  "/get_fare",
  authmiddlewareInstance.authUser,
  query("pickup").isString().withMessage("Pickup location must be required"),
  query("destination")
    .isString()
    .withMessage("Destination location must be required"),
  rideController.getFare
);

module.exports = router;
