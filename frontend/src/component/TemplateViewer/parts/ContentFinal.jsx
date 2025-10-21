import styles from "./ContentFinal.module.css"
import { useResizeContext } from "../context/ResizeContext";

export default function ContentFinal({ final }) {
  const {finRef} = useResizeContext();
  return (
    <div className={styles.content_final} ref={finRef}>
      <p dangerouslySetInnerHTML={{ __html: final }}></p>
    </div>
  );
}
