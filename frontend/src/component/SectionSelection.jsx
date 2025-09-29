import axios from "axios";
import { useTemp } from "../context/TemplateContext";
import { useEffect, useState } from "react";

export default function SelectionStart() {
  const [sections, setSections] = useState([]);
  const { templateData, setTemplateData } = useTemp();

  useEffect(() => {
    axios
      .get("http://localhost:5000/sections")
      .then((res) => res.data)
      .then((data) => setSections(data.listOfSections));
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setTemplateData((prev) => ({ ...prev, section: value }));
  };
  return (
    <label>
      القسم
      <select
        onChange={handleChange}
        name="section"
        value={templateData.section}
      >
        <option value="" disabled hidden>
          --
        </option>
        {sections.map((item) => (
          <option value={item._id}>{item.name}</option>
        ))}
      </select>
    </label>
  );
}
