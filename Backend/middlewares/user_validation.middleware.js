const { body } = require("express-validator");

const registerValidation = [
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = { registerValidation, loginValidation };
