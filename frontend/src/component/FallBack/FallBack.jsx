import styles from "./FallBack.module.css";
import { Scale } from "lucide-react";

export default function FallBack() {
  return (
    <>
      <div className={styles.fadeInFallback}>
        <Scale strokeWidth={1} className={styles.fadeInIcon} color="white" />
      </div>
    </>
  );
}
