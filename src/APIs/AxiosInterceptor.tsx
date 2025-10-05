import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./API";

export const AxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status;
          switch (status) {
            case 401:
              navigate("/unauthorized");
              break;
            case 403:
              navigate("/forbidden");
              break;
            case 404:
              navigate("/404");
              break;
            case 500:
              navigate("/500");
              break;
            default:
              navigate("/error");
              break;
          }
        } else if (error.request) {
          navigate("/network-error");
        } else {
          navigate("/error");
        }

        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [navigate]);
};
