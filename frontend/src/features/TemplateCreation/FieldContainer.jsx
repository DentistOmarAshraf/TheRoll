import { useEffect, useState } from "react";
import Button from "../../component/Button/Button";
import getAllFields from "../../api/fieldsApi";
import { useTemp } from "./context/TemplateContext";
import styles from "./FieldContainer.module.css";
import Looding from "../../assets/looding.gif";

export default function FieldContainer() {
  const [fields, setFileds] = useState([]);
  const [page, setPage] = useState(1);
  const {
    templateData,
    setTemplateData,
    setTemplateStructure,
  } = useTemp();

  useEffect(() => {
    getAllFields(page)
      .then((res) => setFileds(res.listOfFields))
      .catch((err) => console.error(err));
  }, [page]);

  const handleClick = (e) => {
    const { id } = e.target;
    if (!templateData.fields.includes(id)) {
      setTemplateData((prev) => ({ ...prev, fields: [...prev.fields, id] }));
      setTemplateStructure((prev) => ({
        ...prev,
        fieldsButtons: fields.filter((f) => f._id === id),
      }));
    }
  };

  return (
    <div className={styles["fields_container"]}>
      {fields.length == 0 && <img src={Looding} />}
      {fields.length > 0 &&
        fields.map((item) => (
          <Button
            className={"fields_container__button"}
            id={item._id}
            key={item._id}
            onClick={handleClick}
          >
            {item.legend}
            {item.repet && " (مكرر)"}
          </Button>
        ))}
    </div>
  );
}
