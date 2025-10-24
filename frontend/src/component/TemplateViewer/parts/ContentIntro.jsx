import styles from "./ContentIntro.module.css";
import { useResizeContext } from "../context/ResizeContext";

export default function ContentIntro({ intro }) {
  const { introContRef, introParaRef } = useResizeContext();
  return (
    <div
      className={`${styles.intro} ${!intro ? styles.hidden : ""}`}
      ref={introContRef}
    >
      <p ref={introParaRef} contentEditable="true" dangerouslySetInnerHTML={{ __html: intro }}></p>
    </div>
  );
}
