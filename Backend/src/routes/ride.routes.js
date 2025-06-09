const express = require("express");
const authmiddlewareInstance = require("../middlewares/auth.middleware");
const router = express.Router();
const { body } = require("express-validator");
const rideController = require("../controllers/ride.controller");

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

module.exports = router;
