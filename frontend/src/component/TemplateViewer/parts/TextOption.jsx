import { useState } from "react";
import styles from "./TextOption.module.css";
import { FaBold, FaUnderline, FaHighlighter } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";

export default function TextOption() {
  const [colorPickerDisplay, setColorPickerDisplay] = useState("none");
  const [color, setColor] = useState("");
  return (
    <div className={styles.text_option_container}>
      <ul className={styles.option_container}>
        <li
          onClick={() => {
            console.log("clicked");
            console.log(colorPickerDisplay);
            setColorPickerDisplay((prev) =>
              prev == "none" ? "block" : "none"
            );
          }}
        >
          <FaHighlighter size={20} color="white" />
        </li>
        <li>
          <FaUnderline size={20} color="white" />
        </li>
        <li>
          <FaBold size={20} color="white" />
        </li>
      </ul>
      <div
        className={styles.color_picker}
        style={{ "--display-st": colorPickerDisplay }}
      >
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
}
