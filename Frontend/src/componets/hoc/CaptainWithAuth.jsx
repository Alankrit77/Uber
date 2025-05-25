import { useQuery } from "@tanstack/react-query";
import { getCaptainProfile } from "../../services/captainService";
import { Navigate } from "react-router-dom";

const CaptainWithAuth = ({ children }) => {
  const token = localStorage.getItem("CaptainToken");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["captainProfile"],
    queryFn: getCaptainProfile,
    enabled: !!token,
    retry: 1,
  });

  if (!token) {
    return <Navigate to="/captain/login" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.captain) {
    localStorage.removeItem("CaptainToken");
    return <Navigate to="/captain/login" replace />;
  }

  return <>{children}</>;
};

export default CaptainWithAuth;
