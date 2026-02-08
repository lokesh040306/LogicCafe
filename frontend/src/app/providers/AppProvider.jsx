import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getToken,
  getCurrentUser,
  logout as clearAuth,
} from "../../services/auth.service";

/**
 * Global App Context
 * - auth state
 * - user state
 * - global loading
 * - safe progress hydration
 */

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  /* ------------------
     Global loading
  ------------------- */
  const [loading, setLoading] = useState(false);

  /* ------------------
     Auth + User state
  ------------------- */
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  /* ------------------
     Progress hydration flag
  ------------------- */
  const progressHydratedRef = useRef(false);

  /* ------------------
     Restore auth on app load
  ------------------- */
  useEffect(() => {
    const storedToken = getToken();

    if (storedToken) {
      setToken(storedToken);
      setUser(getCurrentUser());
    }

    setAuthReady(true);
  }, []);

  /* ------------------
     Hydrate progress (SAFE)
  ------------------- */
  useEffect(() => {
    // 🚫 Do nothing until auth is fully ready
    if (!authReady || !token) return;

    // 🚫 Prevent duplicate hydration (StrictMode safe)
    if (progressHydratedRef.current) return;

    progressHydratedRef.current = true;

    import("../../services/progress.service")
      .then(({ hydrateProgressFromBackend }) => {
        hydrateProgressFromBackend().catch(() => {});
      })
      .catch(() => {});
  }, [authReady, token]);

  /* ------------------
     Auth actions
  ------------------- */
  const login = (authData) => {
    setToken(authData.token);
    setUser(authData.user);

    // Allow hydration after login
    progressHydratedRef.current = false;
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);

    progressHydratedRef.current = false;
  };

  const value = {
    loading,
    setLoading,

    token,
    user,
    setUser,
    isLoggedIn: Boolean(user),
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {authReady && children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
};
