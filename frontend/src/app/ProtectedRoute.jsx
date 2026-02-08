import { Navigate } from "react-router-dom";
import { useApp } from "./providers/AppProvider";

/**
 * Protects routes that require login
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
