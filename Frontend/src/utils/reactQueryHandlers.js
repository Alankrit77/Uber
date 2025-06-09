import {
  CAPTAIN_REGISTERED,
  CAPTAIN_REGISTRATION_FAILED,
  USER_REGISTERED,
} from "../constants/message";
import { showToast } from "./toast";

export const handleCaptainSucess = (data, navigate, setData) => {
  localStorage.setItem("captain", JSON.stringify(data));
  localStorage.setItem("CaptainToken", data.token);
  showToast.success(data.message);
  setData(data);
  navigate("/captain/home");
};

export const handleCapatainError = (error) => {
  showToast.error(error.response?.data?.message);
};

export const handleUserSuccess = (data, navigate, setData) => {
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("UserToken", data.token);
  showToast.success(data.message);
  setData(data);
  navigate("/home");
};

export const handleUserError = (error) => {
  showToast.error(error.response?.data?.message);
};
