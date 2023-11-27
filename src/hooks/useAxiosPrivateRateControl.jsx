import { axiosPrivateRateControl } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosPrivateRateControl = () => {
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosPrivateRateControl.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const respInterceptor = axiosPrivateRateControl.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prev = error.config;
        if (error.response && error.response.status === 401 && !prev._retry) {
          prev._retry = true;

          try {
            const accessToken = await refresh();
            const newConfig = { ...prev };
            newConfig.headers["Authorization"] = "Bearer " + accessToken;
            localStorage.setItem("token", accessToken);
            setAuth({ ...auth, accessToken });
            return axiosPrivateRateControl(newConfig);
          } catch (refreshError) {
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateRateControl.interceptors.request.eject(reqInterceptor);
      axiosPrivateRateControl.interceptors.response.eject(respInterceptor);
    };
  }, [auth, refresh, setAuth, navigate]);

  return axiosPrivateRateControl;
};

export default useAxiosPrivateRateControl;
