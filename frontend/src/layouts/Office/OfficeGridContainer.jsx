import styles from "./OfficeGridContainer.module.css";
import { useUI } from "./OfficeUIContext";

export default function OfficeGridContainer({ children }) {
  const { isSideOpen } = useUI();
  return (
    <div className={styles.main_container} data-sidebar-pinned={isSideOpen}>
      {children}
    </div>
  );
}
