import styles from "./ContentIntro.module.css";
import { useResizeContext } from "../context/ResizeContext";

export default function ContentIntro({ intro }) {
  const { introRef } = useResizeContext();
  return (
    <div className={styles.intro} ref={introRef}>
      <p contentEditable="true" dangerouslySetInnerHTML={{ __html: intro }}></p>
    </div>
  );
}
