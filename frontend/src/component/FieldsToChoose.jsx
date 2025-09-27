import { useEffect, useState } from "react";
import { useTemp } from "../context/TemplateContext";

export default function FieldsToChoose() {
  const { templateData, setTemplateData } = useTemp();

  const handleDelete = (val) => {
    const fieldIds = [...templateData.fields];
    const fieldsChoises = [...templateData.fieldsButtons];
    const newids = fieldIds.filter((x) => x !== val._id);
    const newChoises = fieldsChoises.filter((x) => x !== val);
    setTemplateData((prev) => ({
      ...prev,
      fields: newids,
      fieldsButtons: newChoises,
    }));
  };

  const handleClickMajor = (val) => {
    const { focus, cursorPostion } = templateData;
    if (focus) {
      const text = templateData[focus];
      setTemplateData((prev) => ({
        ...prev,
        [focus]: `${text.slice(0, cursorPostion)}{{#${val.name}}}{{/${val.name}}}${text.slice(cursorPostion)}`
      }));
    }
  };

  const handleClickMinor = (val) => {
    const { focus, cursorPostion } = templateData;
    if (focus) {
      const text = templateData[focus];
      setTemplateData((prev) => ({
        ...prev,
        [focus]: `${text.slice(0, cursorPostion)}{{${val.name}}}${text.slice(cursorPostion)}`
      }));
    }
  };

  return (
    <>
      {templateData.fieldsButtons.map((item) => (
        <div id={item._id}>
          <button onClick={() => handleClickMajor(item)}>
            {item.legend}
            {item.repet && " مكرر"}
          </button>
          {item.sub.map((sub, i) => (
            <button id={i} onClick={() => handleClickMinor(sub)}>
              {sub.label}
            </button>
          ))}
          <button onClick={() => handleDelete(item)}>X</button>
        </div>
      ))}
      <button onClick={() => {console.log(templateData)}}>CHECK OUT DATA</button>
    </>
  );
}
