import axios from "axios";

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const fetcher = async (url, method, data) => {
  // Handle both calling conventions:
  // 1. fetcher({ url, method, data }) - single options object
  // 2. fetcher(url, method, data) - separate parameters
  let config = {};

  if (typeof url === "object") {
    // First parameter is an options object
    config = url;
  } else {
    // Parameters passed separately
    config = {
      url: url,
      method: method,
    };

    // Only add data if it exists
    if (data) {
      config.data = data;
    }
  }

  return apiService(config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("API call failed:", error);
      throw error;
    });
};

const setAuthToken = (token) => {
  if (token) {
    apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiService.defaults.headers.common["Authorization"];
  }
};

const removeAuthToken = () => {
  delete apiService.defaults.headers.common["Authorization"];
};
export { apiService, fetcher, setAuthToken, removeAuthToken, HttpMethods };
