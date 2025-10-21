import { useState } from "react";
import Button from "../../../component/Button/Button";
import { useTemp } from "../context/TemplateContext";

export default function Verbs() {
  const [verbs, setVerbs] = useState([]);
  const { templateData, setTemplateData } = useTemp();
  const { templateStructure, setTemplateStructure } = useTemp();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setVerbs((prev) => {
      const cp = [...prev];
      const newObject = { ...cp[index], [name]: value };
      cp[index] = newObject;
      return cp;
    });
  };

  const handleAddField = () => {
    setVerbs((prev) => {
      const cp = [...prev];
      cp.push({ name: "", male: "", female: "" });
      return cp;
    });
  };

  const handleDeleteField = (index) => {
    setVerbs((prev) => {
      const cp = [...prev];
      cp.splice(index, 1);
      return cp;
    });
  };

  return (
    <div>
      {verbs.map((item, index) => (
        <div key={index}>
          <label>
            <input
              type="text"
              name={"female"}
              value={item.female}
              onChange={(e) => handleChange(e, index)}
            />
            مؤنث
          </label>
          <label>
            <input
              type="text"
              name={"male"}
              value={item.male}
              onChange={(e) => handleChange(e, index)}
            />
            مذكر
          </label>
          <label>
            <input
              type="text"
              name={"name"}
              value={item.name}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
            Name
          </label>
          <button
            onClick={() => {
              handleDeleteField(index);
            }}
          >
            -
          </button>
        </div>
      ))}
      <Button onClick={handleAddField}>+</Button>
      <Button
        onClick={() => {
          console.log(verbs);
        }}
      >
        Show ME
      </Button>
    </div>
  );
}
