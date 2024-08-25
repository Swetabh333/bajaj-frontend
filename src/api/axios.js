import axios from "axios";

const backendURL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

export default axiosInstance;
