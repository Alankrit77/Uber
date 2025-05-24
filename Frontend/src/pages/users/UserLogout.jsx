import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import { useEffect } from "react";
import { showToast } from "../../utils/toast";

const UserLogout = () => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    },
  });

  useEffect(() => {
    const loadingToast = showToast.loading("Logging out...");
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        showToast.dismiss(loadingToast);
      },
    });
  }, [logoutMutation]);

  return <div>UserLogout</div>;
};

export default UserLogout;
