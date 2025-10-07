import { useState } from "react";
import TemplateViewer from "./TemplateViewer";

export default function TemplateTestingCompTemp() {
  const [intro, setIntro] = useState("")
  const [sum, setSum] = useState("");
  const [middle, setMiddle] = useState("")
  const [final, setFinal] = useState("")

  const handleChange = (e) => {
    const { value } = e.target;
    setSum(value);
  };

  const handleChange2 = (e) => {
    const {value} = e.target;
    setIntro(value);
  }

  const handleChange3 = (e) => {
    const {value} = e.target;
    setMiddle(value);
  }

  const handleChange4 = (e) => {
    const {value} = e.target;
    setFinal(value);
  }

  return (
    <>
      <textarea onChange={handleChange2}></textarea>
      <textarea onChange={handleChange}></textarea>
      <textarea onChange={handleChange3}></textarea>
      <textarea onChange={handleChange4}></textarea>
      <TemplateViewer intro={intro} summury={sum} middle={middle} final={final} />
    </>
  );
}
