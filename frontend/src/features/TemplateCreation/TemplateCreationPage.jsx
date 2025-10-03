import TemplateContextProvider from "./context/TemplateContext";
import FieldContainer from "./FieldContainer";
import TextAndPlaceHolder from "./TextAndPlaceHolder";
import FieldInsertionContainer from "./FieldInsertionContainer";

export default function TemplateCreationPage() {
  return (
    <TemplateContextProvider>
      <FieldContainer />
      <TextAndPlaceHolder />
      <FieldInsertionContainer />
    </TemplateContextProvider>
  );
}
