import { useTemp } from "../context/TemplateContext";
import { TemplateContainer } from "../../../component/TemplateViewer";
import TemplateViewer from "../../../component/TemplateViewer";

export default function TemplateWrapper() {
  const { templateData } = useTemp();
  return (
    <TemplateContainer width={524}>
      <TemplateViewer
        intro={templateData.intro}
        summary={templateData.summary}
        middle={templateData.middle}
        final={templateData.final}
      />
    </TemplateContainer>
  );
}
