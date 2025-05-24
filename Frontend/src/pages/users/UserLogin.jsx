import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const { register, handleSubmit } = useForm();
  const [_, setUserData] = useState({});
  const onSubmit = (data) => {
    setUserData({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="p-7 space-y-4">
      <img
        className="w-16"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber Logo"
      />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-7">
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
        <p className="text-center text-gray-500 py-1">
          New here{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create new account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain/login"
          className="w-full flex item-center justify-center bg-[#111111] text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Sign in to drive with Uber
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
