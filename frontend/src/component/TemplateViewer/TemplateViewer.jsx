import DOMPurify from "dompurify"
import styles from "./TemplateViewer.module.css";
import ContentHeader from "./parts/ContentHeader"
import ContentBeginning from "./parts/ContentBeginning";
import ContentMiddleFinal from "./parts/ContentMiddleFinal";
import ContentFooter from "./parts/ContentFooter";

export default function TemplateViewer({ intro, summary, middle, final, footer }) {
  const sanitizedIntro = DOMPurify.sanitize(intro);
  const sanitizedSummary = DOMPurify.sanitize(summary);
  const sanitizedMiddle = DOMPurify.sanitize(middle);
  const sanitizedFinal = DOMPurify.sanitize(final);
  const sanitizedFooter = DOMPurify.sanitize(footer);
  return (
    <div className={styles.container}>
      <div className={styles.paper_container}>
        <div className={styles.content_container}>
          <ContentHeader />
          <ContentBeginning intro={sanitizedIntro} summary={sanitizedSummary}/>
          <ContentMiddleFinal middle={sanitizedMiddle} final={sanitizedFinal} />
          <ContentFooter footer={sanitizedFooter} />
        </div>
      </div>
    </div>
  );
}
