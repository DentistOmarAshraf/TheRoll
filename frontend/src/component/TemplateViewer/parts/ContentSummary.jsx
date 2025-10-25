import styles from "./ContentSummary.module.css";
import { useResizeContext } from "../context/ResizeContext";

export default function ContactSummury({ summary, fontSize = "2.5" }) {
  const { sumRef, sumParRef } = useResizeContext();
  return (
    <div
      ref={sumRef}
      className={`${styles.summary} ${!summary ? styles.hidden : ""}`}
    >
      <p
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: summary }}
        ref={sumParRef}
        style={{ "--font-size": `${fontSize}cqw` }}
      ></p>
    </div>
  );
}
