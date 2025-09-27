import TemplateContextProvider from "./context/TemplateContext";
import Fields from "./component/Fields";
import FieldsToChoose from "./component/FieldsToChoose"

export default function TemplateCreation() {
    return (
        <TemplateContextProvider>
            <Fields />
            <FieldsToChoose />
        </TemplateContextProvider>
    )
}