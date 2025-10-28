import { useState, useRef, useEffect } from "react";
import styles from "./TextOption.module.css";
import { useTextOption } from "../context/TextOptionTooltipContext";
import { FaBold, FaUnderline, FaHighlighter } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";

export default function TextOption() {
  const { isVisiable, position, selection } = useTextOption();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [color, setColor] = useState("#ffffff");

  return (
    <>
      {isVisiable && (
        <div
          style={{
            left: `${position.left + window.scrollX}px`,
            top: `${position.bottom + window.scrollY}px`,
          }}
          className={styles.text_option}
        >
          <ul className={styles.option_container}>
            <li onClick={() => setPickerVisible((v) => !v)}>
              <FaHighlighter size={20} color="white" />
            </li>
            <li>
              <FaUnderline size={20} color="white" />
            </li>
            <li>
              <FaBold size={20} color="white" />
            </li>
          </ul>

          {pickerVisible && (
            <div className={styles.color_picker}>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
