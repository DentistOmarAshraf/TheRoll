import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
