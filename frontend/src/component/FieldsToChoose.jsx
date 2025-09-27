import { useEffect, useState } from "react";
import { useTemp } from "../context/TemplateContext";

export default function FieldsToChoose() {
  const { templateData, setTemplateData } = useTemp();

  const handleDelete = (val) => {
    const fieldIds = [...templateData.fields];
    console.log(fieldIds);
    const fieldsChoises = [...templateData.fieldsButtons];
    const newids = fieldIds.filter((x) => x !== val._id);
    const newChoises = fieldsChoises.filter((x) => x !== val)
    setTemplateData((prev) => ({...prev, fields: newids, fieldsButtons: newChoises}))
  }

  return (
    <>
      {templateData.fieldsButtons.map((item) => (
        <div id={item._id}>
          <button>
            {item.legend}
            {item.repet && " مكرر"}
          </button>
          {item.sub.map((sub, i) => (
            <button id={i}>{sub.label}</button>
          ))}
          <button onClick={() => handleDelete(item)}>X</button>
        </div>
      ))}
    </>
  );
}
