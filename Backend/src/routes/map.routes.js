const router = require("express").Router();
const mapController = require("../controllers/map.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");
router.get(
  "/coordinates",
  authMiddleware.authUser,
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address is required"),
  mapController.getCoordinates
);

router.get(
  "/distance",
  authMiddleware.authUser,
  query("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Origin address is required"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination address is required"),
  mapController.getDistance
);

router.get(
  "/suggestions",
  authMiddleware.authUser,
  query("query")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Search query is required"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Limit must be between 1 and 20"),
  query("language")
    .optional()
    .isLength({ min: 2, max: 5 })
    .withMessage("Language code must be valid"),
  query("country")
    .optional()
    .isLength({ min: 2, max: 2 })
    .withMessage("Country must be a valid 2-letter code"),
  query("location")
    .optional()
    .matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)
    .withMessage("Location must be in format lat,lng"),
  query("radius")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Radius must be a positive integer"),
  query("combineSources")
    .optional()
    .isBoolean()
    .withMessage("combineSources must be true or false"),
  mapController.getAutoSuggestions
);

module.exports = router;
