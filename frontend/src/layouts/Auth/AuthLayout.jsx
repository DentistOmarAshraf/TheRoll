import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className={styles.main_container}>
      <Outlet />
    </div>
  );
}
