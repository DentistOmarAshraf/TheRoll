import Button from "../../../component/Button";
import { useTemp } from "../context/TemplateContext";
import styles from "./Verbs.module.css";

export default function Verbs() {
  const { templateData, setTemplateData } = useTemp();
  const { templateStructure } = useTemp();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setTemplateData((prev) => {
      const cpArr = [...prev.verbs];
      const newObject = { ...cpArr[index], [name]: value };
      cpArr[index] = newObject;
      return { ...prev, verbs: cpArr };
    });
  };

  const handleAddField = () => {
    setTemplateData((prev) => {
      const cpArr = [...prev.verbs];
      cpArr.push({ name: "", male: "", female: "" });
      return { ...prev, verbs: cpArr };
    });
  };

  const handleDeleteField = (index) => {
    setTemplateData((prev) => {
      const cpArr = [...prev.verbs];
      cpArr.splice(index, 1);
      return { ...prev, verbs: cpArr };
    });
  };

  const handleAddToText = (item) => {
    const { focus, cursorPostion } = templateStructure;
    if (focus && item.name) {
      const text = templateData[focus];
      setTemplateData((prev) => ({
        ...prev,
        [focus]: `${text.slice(0, cursorPostion)}{{verbs.${
          item.name
        }}}${text.slice(cursorPostion)}`,
      }));
    }
  };

  return (
    <div className={styles.verbs_container}>
      {templateData.verbs.length > 0 && (
        <div className={styles.label_name}>
          <p>مؤنث</p>
          <p>مذكر</p>
          <p>Name</p>
        </div>
      )}
      {templateData.verbs.map((item, index) => (
        <div key={index} className={styles.input_container}>
          <input
            type="text"
            name={"female"}
            value={item.female}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name={"male"}
            value={item.male}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name={"name"}
            value={item.name}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => {
              if (e.key === " ") e.preventDefault();
            }}
          />
          <Button
            className={"verbs_container__button--delete"}
            onClick={() => {
              handleDeleteField(index);
            }}
          >
            X
          </Button>
          <Button
            className={"verbs_container__button--add"}
            onClick={() => {
              handleAddToText(item);
            }}
          >
            Add
          </Button>
        </div>
      ))}
      <div className={styles.adding_button_container}>
        <Button onClick={handleAddField}>اضافه ضمائر</Button>
      </div>
    </div>
  );
}
