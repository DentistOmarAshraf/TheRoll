import styles from "./ContentIntro.module.css";
import { useResizeContext } from "../context/ResizeContext";

export default function ContentIntro({
  intro,
  fontSize = "2.5",
  textAlign = "unset",
}) {
  const { introContRef, introParaRef } = useResizeContext();
  return (
    <div
      className={`${styles.intro} ${!intro ? styles.hidden : ""}`}
      ref={introContRef}
    >
      <p
        ref={introParaRef}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: intro }}
        style={{ "--font-size": `${fontSize}cqw`, "--text-align": textAlign }}


        onMouseUp={() => {
          const selection = window.getSelection();
          console.log(selection.rangeCount)
          if (selection && !selection.isCollapsed) {
            console.log(selection.getRangeAt(0).startOffset)
            console.log("Selected text:", selection.toString());
          }
        }}
        onKeyUp={() => {
          const selection = window.getSelection();
          if (selection && !selection.isCollapsed) {
            console.log("Selected text:", selection.toString());
          }
        }}
      ></p>
    </div>
  );
}
