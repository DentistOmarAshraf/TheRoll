import TemplateContextProvider from "./context/TemplateContext";
import Fields from "./component/Fields";
import FieldsToChoose from "./component/FieldsToChoose"
import TextAndPlaceHolder from "./component/TextAndPlaceHolder";

export default function TemplateCreation() {
    return (
        <TemplateContextProvider>
            <Fields />
            <TextAndPlaceHolder />
            <FieldsToChoose />
        </TemplateContextProvider>
    )
}