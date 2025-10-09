import { useRef } from "react";
import Button from "../../../component/Button/Button";
import { useTemp } from "../context/TemplateContext";
import styles from "./TextAndPlaceHolder.module.css";

export default function TextAndPlaceHolder() {
  const { templateData, setTemplateData, setTemplateStructure } = useTemp();
  const currentRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTemplateStructure((prev) => ({ ...prev, focus: name }));
  };

  const handleSelect = (e) => {
    setTemplateStructure((prev) => ({
      ...prev,
      cursorPostion: e.target.selectionStart,
    }));
  };

  const scrollNext = () => {
    currentRef.current.scrollBy({
      left: -currentRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    currentRef.current.scrollBy({
      left: currentRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.text_insertion_container}>
      <div ref={currentRef} className={styles.text_container}>
        <label>
          العنوان
          <input
            name="title"
            type="text"
            value={templateData.title}
            onChange={handleChange}
            onFocus={handleFocus}
            onSelect={handleSelect}
          />
        </label>
        <label>
          المقدمه
          <textarea
            name="intro"
            value={templateData.intro}
            onChange={handleChange}
            onFocus={handleFocus}
            onSelect={handleSelect}
          />
        </label>
        <label>
          ملخص
          <textarea
            name="summary"
            value={templateData.summary}
            onChange={handleChange}
            onFocus={handleFocus}
            onSelect={handleSelect}
          />
        </label>
        <label>
          وسط
          <textarea
            name="middle"
            value={templateData.middle}
            onChange={handleChange}
            onFocus={handleFocus}
            onSelect={handleSelect}
          />
        </label>
        <label>
          نهايه
          <textarea
            name="final"
            value={templateData.final}
            onChange={handleChange}
            onFocus={handleFocus}
            onSelect={handleSelect}
          />
        </label>
        <label>
          كلمات مفتاحيه
          <input
            name="tags"
            value={templateData.tags}
            onChange={handleChange}
          ></input>
        </label>
      </div>
      <div className={styles.nav_container}>
        <Button
          onClick={scrollPrev}
          className="text_insertion_container__button"
          children={"<"}
        />
        <Button
          onClick={scrollNext}
          className="text_insertion_container__button"
          children={">"}
        />
      </div>
    </div>
  );
}
