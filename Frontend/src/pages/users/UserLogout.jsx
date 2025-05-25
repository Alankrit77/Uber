import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import { useEffect } from "react";
import { showToast } from "../../utils/toast";

const UserLogout = () => {
  console.log("UserLogout component rendered");
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      console.log("User logged out successfully");
      localStorage.removeItem("user");
      localStorage.removeItem("UserToken");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);

      navigate("/login");
    },
  });

  useEffect(() => {
    console.log("UserLogout useEffect called");
    logoutMutation.mutate(() => {
      showToast.success("User logged out successfully");
    });
  }, []);

  return <div>UserLogout</div>;
};

export default UserLogout;
