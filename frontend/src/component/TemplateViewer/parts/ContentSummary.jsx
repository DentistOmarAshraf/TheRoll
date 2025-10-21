import styles from "./ContentSummary.module.css";
import { useResizeContext } from "../context/ResizeContext";

export default function ContactSummury({ summary }) {
  const {sumRef, sumParRef} = useResizeContext();
  return (
    <div ref={sumRef} className={`${styles.summary} ${!summary ? styles.hidden : ""}`}>
      <p
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: summary }}
        ref={sumParRef}
      ></p>
    </div>
  );
}
