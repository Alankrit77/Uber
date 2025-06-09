const {
  getCoordinatesFromAddress,
  getDistanceFromGoogleMaps,
  getSuggestions,
} = require("../services/map.service");
const { errorResponse, successResponse } = require("../utils/response");
const { validationResult } = require("express-validator");
const getCoordinates = async (req, res) => {
  const { address } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, { errors: errors.array() });
  }
  if (!address) {
    return errorResponse(res, 400, "Address is required");
  }
  try {
    const coordinates = await getCoordinatesFromAddress(address);
    return successResponse(
      res,
      200,
      "Coordinates fetched successfully",
      coordinates
    );
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return errorResponse(res, 500, "Failed to fetch coordinates");
  }
};

const getDistance = async (req, res) => {
  const { origin, destination } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, { errors: errors.array() });
  }
  if (!origin || !destination) {
    return errorResponse(res, 400, "Origin and destination are required");
  }

  try {
    const distance = await getDistanceFromGoogleMaps(origin, destination);
    return successResponse(res, 200, "Distance fetched successfully", distance);
  } catch (error) {
    console.error("Error fetching distance:", error);
    return errorResponse(res, 500, "Failed to fetch distance");
  }
};
const getAutoSuggestions = async (req, res) => {
  const { query, limit, language, country, location, radius, combineSources } =
    req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, { errors: errors.array() });
  }
  if (!query) {
    return errorResponse(res, 400, "Query is required for suggestions");
  }
  try {
    // Build options object from query parameters
    const options = {};

    if (limit) options.limit = parseInt(limit);
    if (language) options.language = language;
    if (country) options.country = country;
    if (location) options.location = location;
    if (radius) options.radius = parseInt(radius);
    if (combineSources === "true") options.combineSources = true;

    // Generate a session token if needed (could be stored in user session)
    const sessionToken = req.session?.mapSessionToken || null;

    const suggestions = await getSuggestions(query, sessionToken, options);
    return successResponse(
      res,
      200,
      "Suggestions fetched successfully",
      suggestions
    );
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return errorResponse(res, 500, "Failed to fetch suggestions");
  }
};

module.exports = {
  getCoordinates,
  getDistance,
  getAutoSuggestions,
};
