import styles from "./ProgressBar.module.css";

export default function ProgressBar({ value, max = 100 }) {
  return (
    <progress className={styles.progressBar} value={value} max={max}>
      {Math.round((value / max) * 100)}% Complete
    </progress>
  );
}
