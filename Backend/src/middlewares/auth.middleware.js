const userModel = require("../models/user.model");
const capatinModel = require("../models/captain.model");
const blacklistModel = require("../models/backlistToken.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

class authMiddleware {
  authUser = async (req, res, next) => {
    const token = req?.cookie || req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return errorResponse(res, 401, "Unauthorized");
    }
    const isBlacklisted = await blacklistModel.findOne({
      token: token,
    });
    if (isBlacklisted) {
      return errorResponse(res, 401, "Unauthorized");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      req.user = user;
      return next();
    } catch (error) {
      return errorResponse(res, 401, "Unauthorized");
    }
  };
  authCaptain = async (req, res, next) => {
    console.log("Auth Captain Middleware called", req.cookies, req.headers);
    const token =
      req?.cookies.token || req?.headers?.authorization?.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
      return errorResponse(res, 401, "Unauthorized");
    }
    const isBlacklisted = await blacklistModel.findOne({
      token: token,
    });
    if (isBlacklisted) {
      return errorResponse(res, 401, "Unauthorized");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await capatinModel.findById(decoded._id);
      req.captain = {
        captain: captain,
        token: token,
      };
      return next();
    } catch (error) {
      return errorResponse(res, 401, "Unauthorized");
    }
  };
}

const authmiddlewareInstance = new authMiddleware();
module.exports = authmiddlewareInstance;
