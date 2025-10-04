import { useTemp } from "../context/TemplateContext";
import { useEffect, useState } from "react";
import { getAllSection } from "../../../api/sectionApi";
import styles from "./SectionSelection.module.css"

export default function SectionSelection() {
  const [sections, setSections] = useState([]);
  const { templateData, setTemplateData } = useTemp();

  useEffect(() => {
    getAllSection()
      .then((res) => setSections(res.listOfSections))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setTemplateData((prev) => ({ ...prev, section: value }));
  };
  return (
    <label className={styles.selection}>
      القسم
      <select
        onChange={handleChange}
        name="section"
        value={templateData.section}
        required
      >
        <option value="" disabled hidden>
          --
        </option>
        {sections.map((item) => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>
    </label>
  );
}
