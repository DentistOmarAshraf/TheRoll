import styles from "./ContentMiddle.module.css";
import { useResizeContext } from "../context/ResizeContext";

export default function ContentMiddle({ middle }) {
  const { midParaRef, midContRef } = useResizeContext();
  return (
    <div
      className={`${styles.content_middle} ${!middle ? styles.hidden : ""}`}
      ref={midContRef}
    >
      <p ref={midParaRef} dangerouslySetInnerHTML={{ __html: middle }}></p>
    </div>
  );
}
