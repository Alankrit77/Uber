import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import TravelImg from "../../assets/travel.png";
import { showToast } from "../../utils/toast";
import { loginUser } from "../../services/userService";
import { useUserContext } from "../../context/userContext";
import {
  handleUserError,
  handleUserSuccess,
} from "../../utils/reactQueryHandlers";

const UserLogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ["loginUser"],
  });

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      showToast.error("Email and password are required.");
      return;
    }
    const loadingToast = showToast.loading("Signing you in...");

    loginMutation.mutate(data, {
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
        className="bg-cover bg-center bg-no-repeat flex-1 flex flex-col justify-start w-full h-[calc(100vh-30rem)] pt-8"
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
            disabled={loginMutation.isPending}
            className="w-full bg-[#111111] text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50">
            {loginMutation.isPending ? "Logging in..." : "Login"}
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
