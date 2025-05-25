import { fetcher, setAuthToken } from "../lib/apiService";
import { HttpMethods } from "../lib/apiService";

const registerUser = async (userData) => {
  try {
    const response = await fetcher(
      "users/register",
      HttpMethods.POST,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
const loginUser = async (userData) => {
  try {
    const response = await fetcher("users/login", HttpMethods.POST, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
const logoutUser = async () => {
  try {
    const token = localStorage.getItem("UserToken");
    if (token) {
      setAuthToken(token);
    }

    const response = await fetcher("users/logout", HttpMethods.GET);

    localStorage.removeItem("UserToken");
    localStorage.removeItem("user");
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("UserToken");
    if (token) {
      setAuthToken(token);
    }

    const response = await fetcher("users/profile", HttpMethods.GET);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
``;

export { registerUser, loginUser, logoutUser, getUserProfile };
