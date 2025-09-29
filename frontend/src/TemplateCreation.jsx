import TemplateContextProvider from "./context/TemplateContext";
import Fields from "./component/Fields";
import FieldsToChoose from "./component/FieldsToChoose";
import TextAndPlaceHolder from "./component/TextAndPlaceHolder";
import SelectionStart from "./component/SectionSelection";

export default function TemplateCreation() {
  return (
    <TemplateContextProvider>
      <SelectionStart />
      <Fields />
      <TextAndPlaceHolder />
      <FieldsToChoose />
    </TemplateContextProvider>
  );
}
