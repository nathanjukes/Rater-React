import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const respInterceptor = axiosPrivate.interceptors.response.use(
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
            localStorage.setItem("token", accessToken);
            setAuth({ ...auth, accessToken });
            return axiosPrivate(newConfig);
          } catch (refreshError) {
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(respInterceptor);
    };
  }, [auth, refresh, setAuth, navigate]);

  return axiosPrivate;
};

export default useAxiosPrivate;
