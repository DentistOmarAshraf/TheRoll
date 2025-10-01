import TemplateContextProvider from "./context/TemplateContext";
import FieldContainer from "./FieldContainer";
import FieldInsertionContainer from "./FieldInsertionContainer";

export default function TemplateCreationPage() {
  return (
    <TemplateContextProvider>
      <FieldContainer />
      <FieldInsertionContainer />
    </TemplateContextProvider>
  );
}
