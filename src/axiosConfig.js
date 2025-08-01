import axios from "axios";
import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Request interceptor remains the same
instance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Remove the response interceptor completely
// instance.interceptors.response.use(...) // DELETE THIS BLOCK

export default instance;