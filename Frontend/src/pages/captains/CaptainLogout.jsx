import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { logoutCaptain } from "../../services/captainService";

const CaptainLogout = () => {
  const captainLogoutMutation = useMutation({
    mutationFn: logoutCaptain,
    onSuccess: () => {
      localStorage.removeItem("CaptainToken");
      localStorage.removeItem("captain");
    },
    onError: (error) => {
      console.error("Error logging out captain:", error);
    },
  });

  useEffect(() => {
    captainLogoutMutation.mutate();
  }, []);

  return <div>captainLogout</div>;
};

export default CaptainLogout;
