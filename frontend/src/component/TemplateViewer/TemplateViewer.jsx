import DOMPurify from "dompurify";
import styles from "./TemplateViewer.module.css";
import ContentHeader from "./parts/ContentHeader";
import ContentIntro from "./parts/ContentIntro";
import ContentSummary from "./parts/ContentSummary";
import ContentMiddle from "./parts/ContentMiddle";
import ContentFinal from "./parts/ContentFinal"
import ContentFooter from "./parts/ContentFooter";
import ResizeContextProvider from "./context/ResizeContext";

export default function TemplateViewer({
  intro,
  summary,
  middle,
  final,
  footer,
}) {
  const sanitizedIntro = DOMPurify.sanitize(intro);
  const sanitizedSummary = DOMPurify.sanitize(summary);
  const sanitizedMiddle = DOMPurify.sanitize(middle);
  const sanitizedFinal = DOMPurify.sanitize(final);
  const sanitizedFooter = DOMPurify.sanitize(footer);
  return (
    <ResizeContextProvider>
      <div className={styles.paper_container}>
        <div className={styles.content_container}>
          <ContentHeader />
          <ContentIntro intro={sanitizedIntro} />
          <ContentSummary summary={sanitizedSummary} />
          <ContentMiddle middle={sanitizedMiddle} />
          <ContentFinal final={sanitizedFinal} />
          <ContentFooter footer={sanitizedFooter} />
        </div>
      </div>
    </ResizeContextProvider>
  );
}
