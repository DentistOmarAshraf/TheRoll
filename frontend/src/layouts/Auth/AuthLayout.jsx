import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>loading ...</div>;
  }
  if (user) {
    return <Navigate to="/office" state={{ from: location }} replace />;
  }
  return (
    <div className={styles.main_container}>
      <Outlet />
    </div>
  );
}
