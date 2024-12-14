import { Navigate } from "react-router-dom";
import { useAuth } from "./components/generic/authContext";

const ProtectedRoute = ({
  children,
  requireAuth,
  allowAdmin = false,
  allowHospitalAdmin = false,
  allowNormalUser = false, // New prop for normal users
}: {
  children: JSX.Element;
  requireAuth: boolean;
  allowAdmin?: boolean;
  allowHospitalAdmin?: boolean;
  allowNormalUser?: boolean;
}) => {
  const { isAuthenticated, user } = useAuth();

  if (requireAuth && !isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not logged in
    return <Navigate to="/login" />;
  }

  if (
    requireAuth &&
    !(
      (
        (allowAdmin && user?.is_admin) || // Admin check
        (allowHospitalAdmin && user?.is_hospital_admin) || // Hospital admin check
        (allowNormalUser && !user?.is_admin && !user?.is_hospital_admin)
      ) // Normal user check
    )
  ) {
    // Redirect to "Not Authorized" page if the user does not have required access
    return <Navigate to="/not-authorized" />;
  }

  if (!requireAuth && isAuthenticated) {
    // Redirect to a protected page if the route is public and the user is logged in
    if (user?.is_admin) return <Navigate to="/hospitals" />;
    if (user?.is_hospital_admin) return <Navigate to="/users" />;
    return <Navigate to="/patients" />;
  }

  return children; // Render the children if no redirects are needed
};

export default ProtectedRoute;
