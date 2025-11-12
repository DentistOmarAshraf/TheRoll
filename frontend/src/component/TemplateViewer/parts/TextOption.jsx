import { useState, useRef, useEffect } from "react";
import styles from "./TextOption.module.css";
import { useTextOption } from "../context/TextOptionTooltipContext";
import {
  FaBold,
  FaUnderline,
  FaHighlighter,
  FaAngleDown,
  FaItalic,
} from "react-icons/fa";

export default function TextOption() {
  const { isVisiable, position, selection, textOptRef } = useTextOption();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [color, setColor] = useState("#ffef5cff");
  const colorPallete = [
    { color: "#ffef5cff", gridArea: "1/5/2/4" },
    { color: "#69fd82ff", gridArea: "1/4/2/3" },
    { color: "#2fedffff", gridArea: "1/3/2/2" },
    { color: "#ae2de5ff", gridArea: "1/2/2/1" },
    { color: "#2b07f2ff", gridArea: "2/5/3/4" },
    { color: "#ff0606ff", gridArea: "2/4/3/3" },
    { color: "#0a0265ff", gridArea: "2/3/3/2" },
    { color: "#138c92ff", gridArea: "2/2/3/1" },
    { color: "#0c8631ff", gridArea: "3/5/4/4" },
    { color: "#4b0787ff", gridArea: "3/4/4/3" },
    { color: "#9b0303ff", gridArea: "3/3/4/2" },
    { color: "#a6ae0fff", gridArea: "3/2/4/1" },
    { color: "#626667ff", gridArea: "4/4/5/3" },
    { color: "#0b0b0bff", gridArea: "4/3/5/2" },
  ];

  function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const checkChilds = (range, decoration) => {
    const content = range.commonAncestorContainer;
    let found = false;
    try {
      const list = content.querySelectorAll(decoration);
      list.forEach((n) => {
        if (
          n.nodeName === decoration.toUpperCase() &&
          range.intersectsNode(n)
        ) {
          const parent = n.parentNode;
          while (n.firstChild) {
            parent.insertBefore(n.firstChild, n);
          }
          n.remove();
          found = true;
        }
      });
    } catch (e) {}

    return found;
  };

  const checkParent = (range, decoration) => {
    let found = false;
    let node = range.commonAncestorContainer;
    while (node.nodeName !== "P") {
      if (node.nodeName === decoration.toUpperCase()) {
        const parent = node.parentNode;
        while (node.firstChild) {
          parent.insertBefore(node.firstChild, node);
        }
        found = true;
        node.remove();
        break;
      }
      node = node.parentNode;
    }
    return found;
  };

  const handleTextDecoration = (e) => {
    const decoration = e.currentTarget.dataset.format;
    const element = document.createElement(decoration);
    if (decoration === "mark") {
      element.style.background = hexToRgba(color, 0.9);
      setPickerVisible(false);
    }
    const range = selection.getRangeAt(0);
    if (checkChilds(range, decoration)) {
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }

    if (checkParent(range, decoration)) {
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }

    const content = range.extractContents();
    element.appendChild(content);
    range.insertNode(element);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleColorChoise = (e) => {
    const color = e.currentTarget.dataset.format;
    setColor(color);
    setPickerVisible(false);
  };

  return (
    <>
      {isVisiable && (
        <div
          ref={textOptRef}
          style={{
            left: `${position.left + window.scrollX}px`,
            top: `${position.bottom + window.scrollY}px`,
          }}
          className={styles.text_option}
        >
          <ul className={styles.option_container}>
            <li onMouseDown={handleMouseDown}>
              <FaAngleDown
                color="white"
                onClick={(e) => {
                  e.preventDefault();
                  setPickerVisible((v) => !v);
                }}
              />
              <FaHighlighter
                size={20}
                color={color}
                data-format="mark"
                onClick={handleTextDecoration}
              />
            </li>
            <li
              data-format="em"
              onClick={handleTextDecoration}
              onMouseDown={handleMouseDown}
            >
              <FaItalic size={20} color="white" />
            </li>
            <li
              data-format="u"
              onClick={handleTextDecoration}
              onMouseDown={handleMouseDown}
            >
              <FaUnderline size={20} color="white" />
            </li>
            <li
              data-format="b"
              onClick={handleTextDecoration}
              onMouseDown={handleMouseDown}
            >
              <FaBold size={20} color="white" />
            </li>
          </ul>

          {pickerVisible && (
            <div className={styles.color_picker}>
              <ul>
                {colorPallete.map((item, ind) => (
                  <li
                    key={ind}
                    data-format={item.color}
                    style={{ gridArea: item.gridArea }}
                    onClick={handleColorChoise}
                    onMouseDown={handleMouseDown}
                  >
                    <div style={{ background: item.color }}></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
