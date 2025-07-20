const { socket } = require("../../../Frontend/src/context/socketHook");
const captainModel = require("../models/captain.model");

let fetch;
try {
  fetch = global.fetch || require("node-fetch");
} catch (e) {
  fetch = require("node-fetch");
}

/**
 * Gets coordinates from address using Google Maps API
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number}>} - Latitude and longitude
 */
const getCoordinatesFromGoogleMaps = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK") {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  }

  throw new Error(
    `Google Maps API: ${data.status}${
      data.error_message ? " - " + data.error_message : ""
    }`
  );
};

/**
 * Gets coordinates from address using Nominatim (OpenStreetMap) API as fallback
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number}>} - Latitude and longitude
 */
const getCoordinatesFromNominatim = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "UberClone/1.0", // Nominatim requires a User-Agent header
    },
  });
  const data = await response.json();

  if (data && data.length > 0) {
    const { lat, lon } = data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  }

  throw new Error("Nominatim API: No results found");
};

/**
 * Gets coordinates from address with fallback mechanism
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number}>} - Latitude and longitude
 */
const getCoordinatesFromAddress = async (address) => {
  try {
    // Try Google Maps API first
    return await getCoordinatesFromGoogleMaps(address);
  } catch (googleError) {
    try {
      // Fallback to Nominatim if Google fails
      return await getCoordinatesFromNominatim(address);
    } catch (nominatimError) {
      throw new Error(
        `Geocoding failed: ${nominatimError.message} (Google error: ${googleError.message})`
      );
    }
  }
};

/**
 * Gets distance and duration between two locations using Google Maps Distance Matrix API
 * @param {string} origin - The starting address or coordinates
 * @param {string} destination - The ending address or coordinates
 * @returns {Promise<{distance: {text: string, value: number}, duration: {text: string, value: number}, origin: string, destination: string}>}
 */
const getDistanceFromGoogleMaps = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
      const { distance, duration } = data.rows[0].elements[0];
      return {
        distance,
        duration,
        origin: data.origin_addresses[0],
        destination: data.destination_addresses[0],
      };
    }

    throw new Error(
      `Google Maps API: ${data.status}${
        data.error_message ? " - " + data.error_message : ""
      }`
    );
  } catch (error) {
    // If Google API fails, try the fallback
    return getDistanceFromOSRM(origin, destination);
  }
};

/**
 * Gets distance and duration between two locations using Open Source Routing Machine (OSRM)
 * as a fallback when Google Maps API fails
 * @param {string} origin - The starting address or coordinates
 * @param {string} destination - The ending address or coordinates
 * @returns {Promise<{distance: {text: string, value: number}, duration: {text: string, value: number}, origin: string, destination: string}>}
 */
const getDistanceFromOSRM = async (origin, destination) => {
  // First, we need to convert addresses to coordinates if they're not already coordinates
  let originCoords, destinationCoords;

  try {
    if (!isCoordinates(origin)) {
      originCoords = await getCoordinatesFromAddress(origin);
    } else {
      originCoords = parseCoordinates(origin);
    }

    if (!isCoordinates(destination)) {
      destinationCoords = await getCoordinatesFromAddress(destination);
    } else {
      destinationCoords = parseCoordinates(destination);
    }

    // OSRM expects coordinates in format: longitude,latitude (note the reverse order)
    const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.code === "Ok" && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const distanceInMeters = route.distance;
      const durationInSeconds = route.duration;

      // Format distance and duration similar to Google's response
      return {
        distance: {
          text: formatDistance(distanceInMeters),
          value: Math.round(distanceInMeters),
        },
        duration: {
          text: formatDuration(durationInSeconds),
          value: Math.round(durationInSeconds),
        },
        origin: origin,
        destination: destination,
      };
    }

    throw new Error(`OSRM API: ${data.code || "Unknown error"}`);
  } catch (error) {
    throw new Error(`Failed to calculate distance: ${error.message}`);
  }
};

/**
 * Checks if a string is a coordinate pair
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a coordinate pair, false otherwise
 */
const isCoordinates = (str) => {
  // Check if the string matches the pattern of coordinates (lat,lng)
  return /^(-?\d+(\.\d+)?),(-?\d+(\.\d+)?)$/.test(str);
};

/**
 * Parses coordinates from a string
 * @param {string} str - The string to parse
 * @returns {{lat: number, lng: number}} - The parsed coordinates
 */
const parseCoordinates = (str) => {
  const [lat, lng] = str.split(",").map(Number);
  return { lat, lng };
};

/**
 * Formats distance in meters to a human-readable string
 * @param {number} meters - The distance in meters
 * @returns {string} - Formatted distance
 */
const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${meters.toFixed(0)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

/**
 * Formats duration in seconds to a human-readable string
 * @param {number} seconds - The duration in seconds
 * @returns {string} - Formatted duration
 */
const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds.toFixed(0)} secs`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} min${
    remainingMinutes !== 1 ? "s" : ""
  }`;
};

/**
 * Gets location suggestions based on user input using Google Places API
 * @param {string} input - User input for location search
 * @param {string} [sessionToken] - Optional session token for billing optimization
 * @param {Object} [options] - Additional options
 * @param {string} [options.language] - The language for results (e.g., 'en')
 * @param {string} [options.location] - Bias results to this location 'lat,lng'
 * @param {number} [options.radius] - Radius in meters to bias results
 * @param {string} [options.country] - Country code to limit results (e.g., 'us')
 * @param {boolean} [options.combineSources] - If true, combine results from multiple sources
 * @param {number} [options.limit] - Maximum number of results to return (default: 10)
 * @returns {Promise<Array<{id: string, description: string, placeId: string}>>} - List of suggestions
 */
const getSuggestions = async (input, sessionToken = null, options = {}) => {
  if (!input || input.trim().length < 2) {
    return [];
  }

  const limit = options.limit || 10;
  let results = [];
  let errors = [];

  try {
    // First try Google Places API for autocomplete suggestions
    const googleResults = await getSuggestionsFromGooglePlaces(
      input,
      sessionToken,
      options
    );
    results = [...googleResults];

    // If we're combining sources or if Google returned few results, try Nominatim too
    if (options.combineSources === true || googleResults.length < limit / 2) {
      try {
        const nominatimResults = await getSuggestionsFromNominatim(
          input,
          options
        );

        if (options.combineSources === true) {
          // Merge and deduplicate results based on descriptions
          const allResults = [...results, ...nominatimResults];
          const uniqueDescriptions = new Set();

          results = allResults.filter((item) => {
            // Use normalized description for deduplication
            const normalizedDesc = item.description.toLowerCase().trim();
            if (uniqueDescriptions.has(normalizedDesc)) {
              return false;
            }
            uniqueDescriptions.add(normalizedDesc);
            return true;
          });
        } else {
          // Use Nominatim as fallback if Google returned few results
          results =
            results.length < limit / 2
              ? [...results, ...nominatimResults]
              : results;
        }
      } catch (nominatimError) {
        errors.push(nominatimError.message);
      }
    }

    // Sort by relevance (Google results first, then by any relevance score)
    results.sort((a, b) => {
      // Google results come first
      if (a.id.startsWith("nominatim_") && !b.id.startsWith("nominatim_"))
        return 1;
      if (!a.id.startsWith("nominatim_") && b.id.startsWith("nominatim_"))
        return -1;

      // Then sort by importance if available
      if (a.importance && b.importance) return b.importance - a.importance;
      return 0;
    });

    // Limit the number of results
    return results.slice(0, limit);
  } catch (googleError) {
    errors.push(googleError.message);

    try {
      // Fallback to Nominatim if Google fails completely
      const nominatimResults = await getSuggestionsFromNominatim(
        input,
        options
      );
      return nominatimResults.slice(0, limit);
    } catch (nominatimError) {
      errors.push(nominatimError.message);
      throw new Error(
        `Failed to get location suggestions: ${errors.join(", ")}`
      );
    }
  }
};

/**
 * Gets location suggestions from Google Places Autocomplete API
 * @param {string} input - User input for location search
 * @param {string} [sessionToken] - Optional session token for billing optimization
 * @param {Object} [options] - Additional options
 * @returns {Promise<Array<{id: string, description: string, placeId: string}>>} - List of suggestions
 */
const getSuggestionsFromGooglePlaces = async (
  input,
  sessionToken = null,
  options = {}
) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  // Add optional parameters if provided
  if (sessionToken) {
    url += `&sessiontoken=${sessionToken}`;
  }

  if (options.language) {
    url += `&language=${options.language}`;
  }

  if (options.location && options.radius) {
    url += `&location=${options.location}&radius=${options.radius}`;
  }

  // Default to only address type results for Uber-like app but with broader scope for more results
  // Using multiple types to get more varied results
  url += "&types=address|geocode|establishment|(cities)|(regions)";

  // Increase the number of results (though Google may still cap this)
  // Using components parameter to broaden the search scope
  if (options.country) {
    url += `&components=country:${options.country}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK" && data.predictions) {
    return data.predictions.map((prediction) => ({
      id: prediction.place_id,
      description: prediction.description,
      placeId: prediction.place_id,
      types: prediction.types || [], // Include the types of place for better filtering
      structuredFormatting: prediction.structured_formatting
        ? {
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text,
          }
        : null,
    }));
  }

  if (data.status === "ZERO_RESULTS") {
    return [];
  }

  throw new Error(
    `Google Places API: ${data.status}${
      data.error_message ? " - " + data.error_message : ""
    }`
  );
};

/**
 * Gets location suggestions from Nominatim as a fallback
 * @param {string} input - User input for location search
 * @param {Object} [options] - Additional options
 * @returns {Promise<Array<{id: string, description: string, placeId: string}>>} - List of suggestions
 */
const getSuggestionsFromNominatim = async (input, options = {}) => {
  // Increase the limit to get more results (default was 5)
  let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    input
  )}&addressdetails=1&limit=10`;

  if (options.language) {
    url += `&accept-language=${options.language}`;
  }

  // Add country code filtering if provided
  if (options.country) {
    url += `&countrycodes=${options.country}`;
  }

  // Add viewbox for more geographically relevant results if provided
  if (options.viewbox) {
    url += `&viewbox=${options.viewbox}&bounded=1`;
  }

  // Include more categories for better matches
  url +=
    "&featuretype=city,street,address,neighbourhood,suburb,town,village,hamlet,administrative";

  const response = await fetch(url, {
    headers: {
      "User-Agent": "UberClone/1.0", // Nominatim requires a User-Agent header
    },
  });

  const data = await response.json();

  if (Array.isArray(data)) {
    return data.map((item, index) => {
      // Create a description that mimics Google's format
      const mainText = item.name || item.address?.road || "";

      // Enhanced secondary text with more details for better context
      const secondaryComponents = [
        item.address?.suburb,
        item.address?.neighbourhood,
        item.address?.city,
        item.address?.town,
        item.address?.county,
        item.address?.state,
        item.address?.country,
      ];

      // Filter duplicates and empty values
      const uniqueComponents = [
        ...new Set(secondaryComponents.filter(Boolean)),
      ];
      const secondaryText = uniqueComponents.join(", ");

      const description = mainText
        ? secondaryText
          ? `${mainText}, ${secondaryText}`
          : mainText
        : item.display_name;

      // Include more metadata for better filtering and display
      return {
        id: `nominatim_${item.place_id}_${index}`,
        description: description,
        placeId: `nominatim_${item.place_id}`,
        importance: item.importance, // Nominatim importance score
        type: item.type, // Type of location
        class: item.class, // Class of location
        structuredFormatting: {
          mainText: mainText || item.display_name.split(",")[0],
          secondaryText:
            secondaryText ||
            item.display_name.split(",").slice(1).join(",").trim(),
        },
        nominatimData: {
          lat: item.lat,
          lon: item.lon,
          osmId: item.osm_id,
          osmType: item.osm_type,
          category: item.category,
          addressDetails: item.address,
        },
      };
    });
  }

  return [];
};

const getCaptainsInTheRadius = async (lat, lng, radius) => {
  if (!lat || !lng || !radius) {
    throw new Error("Latitude, longitude and radius are required");
  }

  // Validate that lat and lng are valid numbers
  if (isNaN(lat) || isNaN(lng) || isNaN(radius)) {
    throw new Error("Latitude, longitude and radius must be valid numbers");
  }

  const captains = await captainModel.find({
    "location.ltd": { $exists: true, $ne: null },
    "location.lng": { $exists: true, $ne: null },
  });

  const captainsInRadius = captains.filter((captain) => {
    if (!captain.location || !captain.location.ltd || !captain.location.lng) {
      return false;
    }

    const distance = calculateDistance(
      lat,
      lng,
      captain.location.ltd,
      captain.location.lng
    );

    return distance <= radius;
  });
  return captainsInRadius.map((captain) => ({
    id: captain._id,
    name: `${captain.fullname.firstname} ${
      captain.fullname.lastname || ""
    }`.trim(),
    vehicleType: captain.vehicle.vehicleType,
    location: captain.location,
    phone: captain.phone,
    vehicle: captain.vehicle,
    socketId: captain.socketId,
  }));
};

// Helper function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};
module.exports = {
  getCoordinatesFromAddress,
  getDistanceFromGoogleMaps,
  getSuggestions,
  getCaptainsInTheRadius,
};
