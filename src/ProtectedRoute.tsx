import { Navigate } from "react-router-dom";
import { useAuth } from "./components/generic/authContext";

const ProtectedRoute = ({
  children,
  requireAuth,
}: {
  children: JSX.Element;
  requireAuth: boolean;
}) => {
  const { isAuthenticated, user } = useAuth();

  if (requireAuth && !isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not logged in
    return <Navigate to="/login" />;
  }

  if (!requireAuth && isAuthenticated) {
    // Redirect to a protected page if the route is public and the user is logged in
    if (user?.is_admin) return <Navigate to="/hospitals" />;
    else if (user?.is_hospital_admin) return <Navigate to="/users" />;
    else return <Navigate to="/patients" />;
  }

  return children; // Render the children if the condition matches
};

export default ProtectedRoute;
