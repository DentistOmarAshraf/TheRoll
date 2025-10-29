import DOMPurify from "dompurify";
import styles from "./TemplateViewer.module.css";
import ContentHeader from "./parts/ContentHeader";
import ContentIntro from "./parts/ContentIntro";
import ContentSummary from "./parts/ContentSummary";
import ContentMiddle from "./parts/ContentMiddle";
import ContentFinal from "./parts/ContentFinal";
import ContentFooter from "./parts/ContentFooter";
import TextOption from "./parts/TextOption";
import ResizeContextProvider from "./context/ResizeContext";
import { useTextOption } from "./context/TextOptionTooltipContext";

export default function TemplateViewer({
  intro,
  summary,
  middle,
  final,
  footer,
  fontSize,
  textAlign,
}) {
  const sanitizedIntro = DOMPurify.sanitize(intro);
  const sanitizedSummary = DOMPurify.sanitize(summary);
  const sanitizedMiddle = DOMPurify.sanitize(middle);
  const sanitizedFinal = DOMPurify.sanitize(final);
  const sanitizedFooter = DOMPurify.sanitize(footer);
  
  const {showTextOpt, hideTextOpt} = useTextOption()

  const handleContainerMouseUp = (e) =>{
    const selection = window.getSelection();
    
    if (selection && !selection.isCollapsed && selection.toString() !== "") {
      const rect = selection.getRangeAt(0).getBoundingClientRect();
      // console.log(selection.getRangeAt(0).commonAncestorContainer.parentNode.nodeName)
      showTextOpt(selection, rect);
    } else {
      hideTextOpt();
    }
  }

  return (
    <ResizeContextProvider>
        <TextOption />
        <div className={styles.paper_container}>
          <div onMouseUp={handleContainerMouseUp} className={styles.content_container}>
            <ContentHeader />
            <ContentIntro
              intro={sanitizedIntro}
              fontSize={fontSize}
              textAlign={textAlign}
            />
            <ContentSummary summary={sanitizedSummary} fontSize={fontSize} />
            <ContentMiddle
              middle={sanitizedMiddle}
              fontSize={fontSize}
              textAlign={textAlign}
            />
            <ContentFinal
              final={sanitizedFinal}
              fontSize={fontSize}
              textAlign={textAlign}
            />
            <ContentFooter footer={sanitizedFooter} />
          </div>
        </div>
    </ResizeContextProvider>
  );
}
