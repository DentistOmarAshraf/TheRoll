import { useTemp } from "./context/TemplateContext";
import styles from "./FieldInsertionContainer.module.css";
import Button from "../../component/Button/Button";

export default function FieldInsertionContainer() {
  const {
    templateStructure,
    setTemplateStructure,
    templateData,
    setTemplateData,
  } = useTemp();
  const handleDelete = (e) => {
    const { id } = e.target;
    setTemplateStructure((prev) => {
      const fieldsArray = prev.fieldsButtons.filter((f) => f._id !== id);
      return { ...prev, fieldsButtons: fieldsArray };
    });
    setTemplateData((prev) => {
      const fieldsArray = prev.fields.filter((f) => f !== id);
      return { ...prev, fields: fieldsArray };
    });
  };
  return (
    <div className={styles.fields_insertion}>
      {templateStructure.fieldsButtons.map((item) => (
        <div className={styles.fields_button_container} key={item._id} id={item._id}>
          <Button
            className={"fields_insertion__button--major"}
            id={item._id}
            onClick={() => handleClickMajor(item)}
          >
            {item.legend} {item.repet && " (مكرر)"}
          </Button>
          {item.sub.map((sub, i) => (
            <Button
              className={"fields_insertion__button--minor"}
              key={i}
              id={i}
              onClick={() => handleClickMinor(sub)}
            >
              {sub.label}
            </Button>
          ))}
          <Button
            className={"fields_insertion__button--close"}
            id={item._id}
            onClick={handleDelete}
          >
            X
          </Button>
        </div>
      ))}
      <Button
        onClick={() => {
          console.log(templateStructure, templateData);
        }}
      >
        SHOWDATA
      </Button>
    </div>
  );
}
