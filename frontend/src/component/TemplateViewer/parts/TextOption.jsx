import { useState, useRef, useEffect } from "react";
import styles from "./TextOption.module.css";
import { useTextOption } from "../context/TextOptionTooltipContext";
import {
  FaBold,
  FaUnderline,
  FaHighlighter,
  FaAngleDown,
} from "react-icons/fa";
import { HexColorPicker } from "react-colorful";

export default function TextOption() {
  const { isVisiable, position, selection, textOptRef } = useTextOption();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleTextDecoration = (e) => {
    const decoration = e.currentTarget.dataset.format;
    const element = document.createElement(decoration);
    if (decoration === "mark") {
      element.style.background = color;
    }
    const range = selection.getRangeAt(0);
    // console.log(range);

    // this the first case -> if selected text include html element that means its decorated already
    const childNodes = Array.from(range.cloneContents().childNodes);
    console.log(childNodes);

    const firstCondation = childNodes.some(
      (n) => n.nodeName == decoration.toUpperCase()
    );
    // -> end of first condition

    // this is to know if selected text is inside decorated text
    const secCondation =
      range.commonAncestorContainer.parentNode.nodeName ==
      decoration.toUpperCase();
    // -> end of sec condition

    if (firstCondation || secCondation) {
      if (secCondation) {
        console.log("secCond");
        const node = range.commonAncestorContainer.parentNode;
        const parent = node.parentNode;
        while (node.firstChild) {
          parent.insertBefore(node.firstChild, node);
        }
        node.remove();
      }

      if (firstCondation) {
        console.log("firstCond");
        const parent = range.commonAncestorContainer;
        parent.childNodes.forEach((node) => {
          if (node.nodeName === decoration.toUpperCase()) {
            while (node.firstChild) {
              parent.insertBefore(node.firstChild, node);
            }
            node.remove();
          }
        });
      }
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
