import styles from "./ContentMiddle.module.css";
import { useResizeContext } from "../context/ResizeContext";

export default function ContentMiddle({
  middle,
  fontSize = "2.5",
  textAlign = "unset",
}) {
  const { midParaRef, midContRef } = useResizeContext();
  return (
    <div
      className={`${styles.content_middle} ${!middle ? styles.hidden : ""}`}
      ref={midContRef}
    >
      <p
        ref={midParaRef}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: middle }}
        style={{ "--font-size": `${fontSize}cqw`, "--text-align": textAlign }}
      ></p>
    </div>
  );
}
