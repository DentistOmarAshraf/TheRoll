import { useEffect, useState } from "react";
import Button from "../../component/Button/Button";
import getAllFields from "../../api/fieldsApi";
import { useTemp } from "./context/TemplateContext";
import styles from "./FieldContainer.module.css";
import Looding from "../../assets/looding.gif";

export default function FieldContainer() {
  const [fields, setFileds] = useState({ page: 1, pages: 1, listOfFields: [] });
  const [page, setPage] = useState(1);
  const { templateData, setTemplateData, setTemplateStructure } = useTemp();

  useEffect(() => {
    getAllFields(page)
      .then((res) => setFileds(res))
      .catch((err) => console.error(err));
  }, [page]);

  const handleClick = (e) => {
    const { id } = e.target;
    if (!templateData.fields.includes(id)) {
      setTemplateData((prev) => ({ ...prev, fields: [...prev.fields, id] }));
      setTemplateStructure((prev) => ({
        ...prev,
        fieldsButtons: fields.listOfFields.filter((f) => f._id === id),
      }));
    }
  };

  const handleNextclick = (e) => {
    setPage((prev) => prev + 1);
  };

  const handlePrevClick = (e) => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className={styles.fields}>
      <div className={styles.fields_list}>
        {fields.listOfFields.length == 0 && <img src={Looding} />}
        {fields.listOfFields.length > 0 &&
          fields.listOfFields.map((item) => (
            <Button
              className={"fields_list__button"}
              id={item._id}
              key={item._id}
              onClick={handleClick}
            >
              {item.legend}
              {item.repet && " (مكرر)"}
            </Button>
          ))}
      </div>
      <div className={styles.fields_pagnation}>
        <Button
          className={`fields_pagnation__button ${
            page === 1 ? "fields_pagnation__button--disabeld" : ""
          }`}
          onClick={handlePrevClick}
          disabled={page === 1}
        >
          قبل
        </Button>
        <p>{page}</p>
        <Button
          className={`fields_pagnation__button ${
            page === fields.pages ? "fields_pagnation__button--disabeld" : ""
          }`}
          onClick={handleNextclick}
          disabled={page === fields.pages}
        >
          بعد
        </Button>
      </div>
    </div>
  );
}
