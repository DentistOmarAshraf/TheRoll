import axios from "axios";
import toast from "react-hot-toast";

let userToken = null;

export const setUserToken = (token) => {
  userToken = token;
};

const API_BASE_URL = "http://localhost:5000"; // should saved in ENV

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/user/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${API_BASE_URL}/user/refresh`,
          {},
          { withCredentials: true }
        );
        if (response.data.status == "success") {
          setUserToken(response.data?.data?.accToken);
          return apiClient(originalRequest);
        }
      } catch (refError) {
        setUserToken(null);
        if (!window.location.pathname.includes("/auth")) {
          toast.error("انتهت الجلسة");
          window.location.replace("/auth");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
