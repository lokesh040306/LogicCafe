import api from "./api";

/**
 * Auth Service
 * ------------
 * Single source of truth for auth API calls
 * Stores { user, token } together
 */

const AUTH_KEY = "auth";

/**
 * Save auth data
 */
const saveAuth = (authData) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
};

/**
 * Read auth data
 */
const readAuth = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
};

/**
 * Register user
 */
export const register = async (payload) => {
  // Backend: POST /auth/register -> ApiResponse -> data: { user, token }
  const res = await api.post("/auth/register", payload);

  // Backend: ApiResponse -> data: { user, token }
  const authData = res.data?.data;
  if (!authData?.token || !authData?.user) {
    throw new Error("Invalid register response");
  }

  saveAuth(authData);
  return authData;
};

/**
 * Login user
 */
export const login = async (payload) => {
  // API call to login endpoint
  const res = await api.post("/auth/login", payload);

  // Backend: ApiResponse -> data: { user, token }
  const authData = res.data?.data;
  if (!authData?.token || !authData?.user) {
    throw new Error("Invalid login response");
  }

  saveAuth(authData);
  return authData;
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

/**
 * Get stored token
 */
export const getToken = () => {
  return readAuth()?.token || null;
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return readAuth()?.user || null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return Boolean(getToken());
};
