const express = require("express");
const router = express.Router();
const captainControllerInstance = require("../controllers/captain.controller");
const {
  validateCaptainRegistration,
  validateCaptainLogin,
} = require("../middlewares/capatin_validation.middleware");
const authmiddlewareInstance = require("../middlewares/auth.middleware");

router.post(
  "/register",
  validateCaptainRegistration,
  captainControllerInstance.registerCaptain
);
router.post(
  "/login",
  validateCaptainLogin,
  captainControllerInstance.loginCapation
);
router.get(
  "/profile",
  authmiddlewareInstance.authCaptain,
  captainControllerInstance.getCaptainProfile
);
router.get("/logout", captainControllerInstance.logoutCaptain);
module.exports = router;
