import { fetcher } from "../lib/apiService";
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
  const token = localStorage.getItem("token");

  try {
    const response = await fetcher({
      url: "users/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    return response;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

export { registerUser, loginUser, logoutUser };
