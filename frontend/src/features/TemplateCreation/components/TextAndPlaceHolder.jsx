import { useRef } from "react";
import Button from "../../../component/Button/Button";
import { useTemp } from "../context/TemplateContext";
import styles from "./TextAndPlaceHolder.module.css";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Underline,
} from "lucide-react";

export default function TextAndPlaceHolder() {
  const {
    templateStructure,
    templateData,
    setTemplateData,
    setTemplateStructure,
  } = useTemp();
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

  const handleBoldText = (e) => {
    const { focus, cursorPostion } = templateStructure;
    if (focus) {
      const text = templateData[focus];
      setTemplateData((prev) => ({
        ...prev,
        [focus]: `${text.slice(0, cursorPostion)}<b></b>${text.slice(
          cursorPostion
        )}`,
      }));
    }
  };

  const handleUnderLine = (e) => {
    const { focus, cursorPostion } = templateStructure;
    if (focus) {
      const text = templateData[focus];
      setTemplateData((prev) => ({
        ...prev,
        [focus]: `${text.slice(0, cursorPostion)}<u></u>${text.slice(
          cursorPostion
        )}`,
      }));
    }
  };

  const handleTextAlign = (e) => {
    const align = e.currentTarget.dataset.action;
    setTemplateData((prev) => {
      if (prev.textAlign == align) return { ...prev, textAlign: "unset" };
      return { ...prev, textAlign: align };
    });
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
      <div className={styles.text_option}>
        <label>
          <input
            name="fontSize"
            type="range"
            min="2.5"
            max="4"
            step="0.1"
            value={templateData.fontSize}
            list="marks"
            onChange={handleChange}
          />
        </label>
        <datalist id="marks">
          <option value="2.5" label="2.5"></option>
          <option value="3"></option>
          <option value="3.5"></option>
          <option value="4" label="4"></option>
        </datalist>
        <Button
          className="text_option__button"
          data-action="right"
          onClick={handleTextAlign}
        >
          <AlignRight />
        </Button>
        <Button
          className="text_option__button"
          data-action="center"
          onClick={handleTextAlign}
        >
          <AlignCenter />
        </Button>
        <Button
          className="text_option__button"
          data-action="left"
          onClick={handleTextAlign}
        >
          <AlignLeft />
        </Button>
        <Button
          className="text_option__button"
          data-action="justify"
          onClick={handleTextAlign}
        >
          <AlignJustify />
        </Button>
        <Button className="text_option__button" onClick={handleUnderLine}>
          <Underline />
        </Button>
        <Button className="text_option__button" onClick={handleBoldText}>
          <Bold />
        </Button>
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
