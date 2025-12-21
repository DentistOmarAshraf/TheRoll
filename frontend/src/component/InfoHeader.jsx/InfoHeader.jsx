import { useUI } from "../../context/UIContext";
import styles from "./InfoHeader.module.css";
import Button from "../Button";
import { Menu } from "lucide-react";

export default function InfoHeader() {
  const { isSideOpen, setSideOpen } = useUI();

  const handleSideBar = () => {
    setSideOpen((prev) => !prev);
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
    </div>
  );
}
