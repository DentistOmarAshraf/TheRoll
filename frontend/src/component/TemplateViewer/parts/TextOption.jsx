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
import { HexColorPicker } from "react-colorful";

export default function TextOption() {
  const { isVisiable, position, selection, textOptRef } = useTextOption();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [color, setColor] = useState("#f6ff51");

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
      element.style.background = hexToRgba(color, 0.85);
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
                color="white"
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
              <HexColorPicker
                color={color}
                onChange={setColor}
                onMouseDown={handleMouseDown}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
