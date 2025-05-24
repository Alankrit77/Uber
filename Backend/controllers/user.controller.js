const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/response");
const blacklistTokenModel = require("../models/backlistToken.model");

class UserController {
  async registerUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { fullname } = req.body;
      const { email, password } = req.body;
      const userIsAlreadyExists = await userModel.findOne({ email });
      if (userIsAlreadyExists) {
        return errorResponse(res, 400, "User already exists");
      }
      const hashedPassword = await userModel.hashPassword(password);
      const user = await userService.createUser(
        fullname.firstname,
        fullname.lastname,
        email,
        hashedPassword
      );
      const token = await user.generateAuthToken();
      const userToSend = user.toObject();
      delete userToSend.password;
      successResponse(res, 201, "User registered successfully", {
        user: userToSend,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  loginUser = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return errorResponse(res, 401, "Invalid email or password");
      }
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return errorResponse(res, 401, "Invalid email or password");
      }
      const token = await user.generateAuthToken();

      const userToSend = user.toObject();
      delete userToSend.password;
      res.cookie("token", token);
      successResponse(res, 200, "User logged in successfully", {
        user: userToSend,
        token,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserProfile = async (req, res, next) => {
    try {
      successResponse(res, 200, "User profile fetched successfully", {
        user: req.user,
      });
    } catch (error) {
      errorResponse(res, 500, "Internal server error");
      next(error);
    }
  };
  logoutUser = async (req, res, next) => {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    await blacklistTokenModel.create({ token: token });
    res.clearCookie("token");

    successResponse(res, 200, "User logged out successfully");
  };
}

const userController = new UserController();
module.exports = userController;
