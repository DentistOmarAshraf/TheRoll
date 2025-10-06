import { useState } from "react";
import TemplateViewer from "./TemplateViewer";

export default function TemplateTestingCompTemp() {
  const [sum, setSum] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSum(value);
  };

  return (
    <>
      <textarea onChange={handleChange}></textarea>
      <TemplateViewer summury={sum} />
    </>
  );
}
