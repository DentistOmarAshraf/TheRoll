import TemplateContextProvider from "./context/TemplateContext";
import FieldContainer from "./components/FieldContainer";
import TextAndPlaceHolder from "./components/TextAndPlaceHolder";
import FieldInsertionContainer from "./components/FieldInsertionContainer";
import SectionSelection from "./components/SectionSelection"

export default function TemplateCreationPage() {
  return (
    <TemplateContextProvider>
      <FieldContainer />
      <SectionSelection />
      <TextAndPlaceHolder />
      <FieldInsertionContainer />
    </TemplateContextProvider>
  );
}
