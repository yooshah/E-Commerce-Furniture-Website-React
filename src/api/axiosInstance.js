import axios from "axios";

const axiosInstane = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? user.token : null;
};
axiosInstane.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Axios error in response interceptor:", error);
    return Promise.reject(error);
  }
);

export default axiosInstane;
