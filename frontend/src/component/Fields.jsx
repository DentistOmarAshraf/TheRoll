import "./Fields.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTemp } from "../context/TemplateContext";

function Fields() {
  const [fields, setFileds] = useState([]);
  const { templateData, setTemplateData } = useTemp();

  useEffect(() => {
    axios
      .get("http://localhost:5000/fields")
      .then((response) => setFileds(response.data.listOfFields));
  }, []);

  const handleClick = (e) => {
    const { id } = e.target;
    setTemplateData((prev) => {
      const arrayOfFields = [...prev.fields];
      if (!arrayOfFields.includes(id)) {
        const fulldata = fields.filter((x) => x._id === id)[0];
        return {
          ...prev,
          fields: [...prev.fields, id],
          fieldsButtons: [...prev.fieldsButtons, fulldata],
        };
      }
      return prev;
    });
  };

  return (
    <>
      <div className="fields_container">
        {fields.length == 0 && <h1>looding...</h1>}
        {fields.length > 0 &&
          fields.map((item) => (
            <button id={item._id} key={item._id} onClick={handleClick}>
              {item.legend}
              {item.repet && " (مكرر)"}
            </button>
          ))}
      </div>
    </>
  );
}

export default Fields;
