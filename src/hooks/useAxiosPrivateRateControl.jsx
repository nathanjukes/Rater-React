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
        config.headers["Authorization"] = "Bearer " + auth.accessToken;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const respInterceptor = axiosPrivateRateControl.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Token Expired
        const prev = error.config;
        if (error.response && error.response.status === 401 && !prev._retry) {
          prev._retry = true;

          try {
            const accessToken = await refresh();
            const newConfig = { ...prev };
            newConfig.headers["Authorization"] = "Bearer " + accessToken;
            auth.accessToken = accessToken;
            return axiosPrivateRateControl(newConfig);
          } catch (refreshError) {
            // Handle refresh token expiry --> redirect to the login page.
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
  }, [auth, refresh, setAuth]);

  return axiosPrivateRateControl;
};

export default useAxiosPrivateRateControl;
