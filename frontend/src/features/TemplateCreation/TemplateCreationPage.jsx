import TemplateContextProvider from "./context/TemplateContext";
import FieldContainer from "./FieldContainer";

export default function TemplateCreationPage() {
  return (
    <TemplateContextProvider>
      <FieldContainer />
    </TemplateContextProvider>
  );
}
