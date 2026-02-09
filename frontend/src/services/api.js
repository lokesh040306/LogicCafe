import axios from "axios";
import { getToken } from "./auth.service";

/**
 * Central Axios instance
 * Backend base URL
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 10000,
});

/**
 * Attach JWT token + disable cache on every request
 * (IMPORTANT for auth + React StrictMode)
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    // ✅ Attach auth token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Disable browser / proxy cache (fixes 304 + missing headers issue)
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
