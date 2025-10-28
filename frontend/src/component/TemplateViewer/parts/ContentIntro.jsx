import styles from "./ContentIntro.module.css";
import { useResizeContext } from "../context/ResizeContext";
import { useTextOption } from "../context/TextOptionTooltipContext";

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
      ></p>
    </div>
  );
}
