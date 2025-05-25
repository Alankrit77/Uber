import { useQuery } from "@tanstack/react-query";
import { getCaptainProfile } from "../../services/captainService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CaptainWithAuth = ({ children }) => {
  const token = localStorage.getItem("CaptainToken");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["captainProfile"],
    queryFn: getCaptainProfile,
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) {
      navigate("/captain/login");
      return;
    }

    if (!isLoading && (isError || !data?.captain)) {
      localStorage.removeItem("CaptainToken");
      navigate("/captain/login");
    }
  }, [token, isLoading, isError, data, navigate]);

  if (isLoading) return <div>Loading...</div>;

  if (data?.captain) {
    return <>{children}</>;
  }

  return null;
};

export default CaptainWithAuth;
