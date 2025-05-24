const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model.js");
const CaptainService = require("../services/captain.service");
const { errorResponse, successResponse } = require("../utils/response");
const blacklistTokenModel = require("../models/backlistToken.model");

class captainController {
  registerCaptain = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          400,
          { errors: errors.array() },
          errors.array()
        );
      }
      const { fullname, email, password, location, vehicle, phone } = req.body;
      const captainIsAlreadyExists = await captainModel.findOne({ email });
      if (captainIsAlreadyExists) {
        return errorResponse(res, 400, "Captain already exists");
      }
      const hashedPassword = await captainModel.hashPassword(password);
      const captain = await CaptainService.createCaptain(
        fullname.firstname,
        fullname.lastname,
        email,
        hashedPassword,
        location,
        vehicle.color,
        vehicle.plate,
        vehicle.capacity,
        vehicle.vehicleType,
        phone
      );
      successResponse(res, 201, "Captain registered successfully", captain);
    } catch (error) {
      errorResponse(res, 400, error.message);
    }
  };

  loginCapation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        400,
        { errors: errors.array() },
        errors.array()
      );
    }
    const { email, password } = req.body;
    try {
      const captain = await captainModel.findOne({ email }).select("+password");
      if (!captain) {
        return errorResponse(res, 401, "Invalid email or password");
      }

      const issMatch = await captain.comparePassword(password);
      if (!issMatch) {
        return errorResponse(res, 401, "Invalid email or password");
      }
      const token = await captain.generateAuthToken();
      const captainToSend = captain.toObject();
      delete captainToSend.password;
      res.cookie("token", token);
      successResponse(res, 200, "Captain logged in successfully", {
        captain: captainToSend,
        token,
      });
    } catch (error) {
      errorResponse(res, 400, error.message);
    }
  };
  getCaptainProfile = async (req, res, next) => {
    try {
      successResponse(res, 200, "Captain profile fetched successfully", {
        captain: req.captain,
      });
    } catch (error) {
      errorResponse(res, 400, error.message);
    }
  };
  logoutCaptain = async (req, res) => {
    try {
      const token = req?.cookies?.token;
      await blacklistTokenModel.create({ token: token });
      res.clearCookie("token");
      successResponse(res, 200, "Captain logged out successfully");
    } catch (error) {
      errorResponse(res, 400, error.message);
    }
  };
}

const captainControllerInstance = new captainController();
module.exports = captainControllerInstance;
