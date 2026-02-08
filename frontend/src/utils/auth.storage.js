const AUTH_KEY = "auth";

/**
 * Save auth data
 */
export const saveAuth = (data) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

/**
 * Read auth data
 */
export const readAuth = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
};

/**
 * Remove auth data (logout)
 */
export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};

/**
 * Get token only
 */
export const getToken = () => {
  const auth = readAuth();
  return auth?.token || null;
};
