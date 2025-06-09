import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { registerCaptain } from "../../services/captainService";
import { showToast } from "../../utils/toast";
import { useCaptainContext } from "../../context/captainContext";
import {
  CAPTAIN_REGISTERED,
  CAPTAIN_REGISTRATION_FAILED,
  CREATING_CAPTAIN_ACCOUNT,
  PASSWORD_MISMATCH,
} from "../../constants/message";
import { handleCapatainError, handleCaptainSucess } from "../../utils/reactQueryHandlers";

const CaptainSignup = () => {
  const { setCaptain } = useCaptainContext();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerCaptain,
    mutationKey: ["registerCaptain"],
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (data.password !== data.confirmPassword) {
      showToast.error(PASSWORD_MISMATCH);
      return;
    }

    const payload = {
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
      phone: data.phone,
      vehicle: {
        color: data.vehicleColor,
        plate: data.vehiclePlate,
        capacity: parseInt(data.vehicleCapacity),
        vehicleType: data.vehicleType,
      },
    };

    const loadingToast = showToast.loading(CREATING_CAPTAIN_ACCOUNT);
    registerMutation.mutate(payload, {
      onSettled: () => {
        showToast.dismiss(loadingToast);
      },
      onSuccess: (data) => handleCaptainSucess(data, navigate, setCaptain),
      onError: (error) => handleCapatainError(error, navigate, setCaptain),
    });
  };

  return (
    <div className="px-8 py-3">
      <img
        className="w-16"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt="Uber Logo"
      />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-7">
          <div>
            <h3 className="text-lg font-medium mb-2">What's your name?</h3>
            <div className="flex gap-2">
              <input
                {...register("firstname", { required: true })}
                type="text"
                placeholder="firstname"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                {...register("lastname", { required: true })}
                type="text"
                placeholder="lastname"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
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
          <div>
            <h3 className="text-lg font-medium mb-2">Enter confirm password</h3>
            <input
              {...register("confirmPassword", { required: true })}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Phone Number</h3>
            <input
              {...register("phone", { required: true })}
              type="tel"
              placeholder="Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("vehicleColor", { required: true })}
                type="text"
                placeholder="Vehicle Color"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                {...register("vehiclePlate", { required: true })}
                type="text"
                placeholder="Vehicle Plate Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                {...register("vehicleCapacity", { required: true })}
                type="number"
                placeholder="Vehicle Capacity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <select
                {...register("vehicleType", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-[#111111] text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50">
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-500 py-1">
          Already have an account?{" "}
          <Link to="/captain/login" className="text-blue-500 hover:underline">
            Login in
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

export default CaptainSignup;
