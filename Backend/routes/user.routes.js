const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/user_validation.middleware");
const authmiddlewareInstance = require("../middlewares/auth.middleware");

router.post("/register", registerValidation, userController.registerUser);
router.post("/login", loginValidation, userController.loginUser);
router.get(
  "/profile",
  authmiddlewareInstance.authUser,
  userController.getUserProfile
);
router.get("/logout", userController.logoutUser);

module.exports = router;
