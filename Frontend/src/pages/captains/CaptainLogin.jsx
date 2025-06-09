import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import TravelImg from "../../assets/captain_login.png";
import { useCaptainContext } from "../../context/captainContext";
import { showToast } from "../../utils/toast";
import { useMutation } from "@tanstack/react-query";
import { loginCaptain } from "../../services/captainService";
import {
  handleCapatainError,
  handleCaptainSucess,
} from "../../utils/reactQueryHandlers";

const CaptainLogin = () => {
  const { register, handleSubmit } = useForm();
  const { setCaptain } = useCaptainContext();
  const navigate = useNavigate();

  const captainLoginMutation = useMutation({
    mutationFn: loginCaptain,
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    if (!email || !password) {
      showToast.error("Email and password are required");
      return;
    }
    const payload = {
      email,
      password,
    };
    const loadingToast = showToast.loading("Logging in...");
    captainLoginMutation.mutate(payload, {
      onSettled: () => {
        showToast.dismiss(loadingToast);
      },
      onSuccess: (data) => handleCaptainSucess(data, navigate, setCaptain),
      onError: (error) => handleCapatainError(error, navigate, setCaptain),
    });
  };

  return (
    <div className="p-7 space-y-4">
      <div
        className="bg-cover bg-center bg-no-repeat flex-1 flex flex-col justify-start w-full h-[calc(100vh-25rem)] pt-8"
        style={{ backgroundImage: `url(${TravelImg})` }}>
        <img
          className="w-16"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Logo"
        />
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <h3 className="text-lg font-medium mb-2">What's your email?</h3>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="email@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">What's your password?</h3>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#111111] text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 pt-1">
          Join a fleet{" "}
          <Link to="/captain/signup" className="text-blue-500 hover:underline">
            Register as a captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="w-full flex item-center justify-center bg-[#111111] text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Sign in as user
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
