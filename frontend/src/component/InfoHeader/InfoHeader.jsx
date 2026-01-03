import { useUI } from "../../layouts/Office/OfficeUIContext";
import styles from "./InfoHeader.module.css";
import Button from "../Button";
import { Menu } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { setUserToken } from "../../api/apiClient";
import { logout } from "../../api/userClient";

export default function InfoHeader() {
  const { isSideOpen, setSideOpen } = useUI();
  const { user, setUser } = useAuth();

  const handleSideBar = () => {
    setSideOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.status == "success") {
        setUserToken(null);
        setUser(null);
        toast.success("تم تسجيل الخروج");
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div className={styles.info_header}>
      <div className={styles.logo_container}>
        <Button
          onClick={handleSideBar}
          className={`Info_header__button ${isSideOpen ? "active" : ""}`}
        >
          <Menu />
        </Button>
        <p>Roll01</p>
      </div>
      <div>
        <Button onClick={handleLogout}>logout</Button>
      </div>
    </div>
  );
}
