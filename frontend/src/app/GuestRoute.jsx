import { Navigate } from "react-router-dom";
import { useApp } from "./providers/AppProvider";

/**
 * Blocks auth pages for logged-in users
 */
const GuestRoute = ({ children }) => {
  const { isLoggedIn } = useApp();

  if (isLoggedIn) {
    return <Navigate to="/patterns" replace />;
  }

  return children;
};

export default GuestRoute;
