import styles from "./TemplateCreationPage.module.css"
import TemplateContextProvider from "./context/TemplateContext";
import FieldContainer from "./components/FieldContainer";
import TextAndPlaceHolder from "./components/TextAndPlaceHolder";
import FieldInsertionContainer from "./components/FieldInsertionContainer";
import SectionSelection from "./components/SectionSelection"
import TemplateWrapper from "./components/TemplateWrapper";
import Verbs from "./components/Verbs";

export default function TemplateCreationPage() {
  return (
    <TemplateContextProvider>
      <div className={styles.creation_container}>
        <div className={styles.right_side}>
          <SectionSelection />
          <TextAndPlaceHolder />
          <FieldInsertionContainer />
          <Verbs />
        </div>
        <div className={styles.left_side}>
          <FieldContainer />
          <TemplateWrapper />
        </div>
      </div>
    </TemplateContextProvider>
  );
}
