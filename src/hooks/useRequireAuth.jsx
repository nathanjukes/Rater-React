import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRequireAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default useRequireAuth;
