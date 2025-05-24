const { body } = require("express-validator");

const validateCaptainRegistration = [
  body("fullname.firstname")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("fullname.lastname")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("vehicle.color")
    .isString()
    .withMessage("Color must be a string")
    .isLength({ min: 3 })
    .withMessage("Color must be at least 3 characters long"),
  body("vehicle.plate")
    .isString()
    .withMessage("Plate must be a string")
    .isLength({ min: 3 })
    .withMessage("Plate must be at least 3 characters long"),
  body("vehicle.capacity")
    .isNumeric()
    .withMessage("Capacity must be a number")
    .custom((value) => {
      if (value < 1) {
        throw new Error("Capacity must be at least 1");
      }
      return true;
    }),
  body("vehicle.vehicleType")
    .isString()
    .withMessage("Vehicle type must be a string")
    .isLength({ min: 3 })
    .withMessage("Vehicle type must be at least 3 characters long")
    .custom((value) => {
      const allowedTypes = ["car", "motorcycle", "auto"];
      if (!allowedTypes.includes(value)) {
        throw new Error(
          "Invalid vehicle type, must be one of 'car', 'motorcycle', or 'auto'"
        );
      }
      return true;
    }),
];
const validateCaptainLogin = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  validateCaptainRegistration,
  validateCaptainLogin,
};
