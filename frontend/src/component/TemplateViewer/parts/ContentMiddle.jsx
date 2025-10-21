import styles from "./ContentMiddle.module.css"
import { useResizeContext } from "../context/ResizeContext";

export default function ContentMiddle({ middle }) {
  const {midRef} = useResizeContext()
  return (
    <div className={styles.content_middle} ref={midRef}>
      <p dangerouslySetInnerHTML={{ __html: middle }}></p>
    </div>
  );
}
