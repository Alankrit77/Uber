import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

const CaptainLogin = () => {
  const { register, handleSubmit } = useForm();
  const [_, setCaptainData] = useState({});
  const onSubmit = (data) => {
    setCaptainData({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <div className="p-7 space-y-4">
      <img
        className="w-16"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt="Uber Logo"
      />
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
