import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import TravelImg from "../../assets/user_register.png";
import { registerUser } from "../../services/userService";
import { showToast } from "../../utils/toast";
import { useUserContext } from "../../context/userContext";
import {
  handleUserError,
  handleUserSuccess,
} from "../../utils/reactQueryHandlers";

const UserSignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["registerUser"],
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    if (data.password !== data.confirmPassword) {
      showToast.error("Passwords do not match.");
      return;
    }

    const payload = {
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    console.log("Registering user with payload:", payload);

    const loadingToast = showToast.loading("Creating your account...");
    registerMutation.mutate(payload, {
      onSettled: () => {
        showToast.dismiss(loadingToast);
      },
      onSuccess: (data) => handleUserSuccess(data, navigate, setUser),
      onError: (error) => handleUserError(error),
    });
  };
  return (
    <div className="p-7 space-y-4">
      <div
        className="bg-cover bg-center bg-no-repeat flex-1 flex flex-col justify-start w-full h-[calc(100vh-40rem)] pt-8"
        style={{ backgroundImage: `url(${TravelImg})` }}>
        <img
          className="w-16"
          src="https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/afaqs/media/post_attachments/5d06d6c64c9a6847a59485146fc4f7a60eebd6a17e1f4b286bb3fb3e6cf5c710.jpg"
          alt="Uber Logo"
        />
      </div>
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
            <h3 className="text-lg font-medium mb-2">How can we reach you?</h3>
            <div className="flex gap-2">
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              <input
                {...register("phone", { required: true })}
                type="text"
                placeholder="1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                maxLength={10}
                pattern="[0-9]{10}" // Ensures only 10 digits are allowed
              />
            </div>
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
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-[#111111] text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50">
            {registerMutation.isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-500 py-1">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
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

export default UserSignUp;
