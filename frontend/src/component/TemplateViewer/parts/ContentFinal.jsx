import styles from "./ContentFinal.module.css";
import { useResizeContext } from "../context/ResizeContext";

export default function ContentFinal({
  final,
  fontSize = "2.5",
  textAlign = "unset",
}) {
  const { finParaRef, finContRef } = useResizeContext();
  return (
    <div
      className={`${styles.content_final} ${!final ? styles.hidden : ""}`}
      ref={finContRef}
    >
      <p
        ref={finParaRef}
        dangerouslySetInnerHTML={{ __html: final }}
        style={{ "--font-size": `${fontSize}cqw`, "--text-align": textAlign }}
      ></p>
    </div>
  );
}
