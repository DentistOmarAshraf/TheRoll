import { createContext, useContext, useState, useEffect } from "react";

const TextOptionContext = createContext(null);

export default function TextOptionProvider({ children }) {
  const [textOptState, setTextOptState] = useState({
    isVisiable: false,
    position: { x: 0, y: 0 },
    selection: null,
  });

  const showTextOpt = (selection, rect) => {
    setTextOptState({
      isVisiable: true,
      position: rect,
      selection: selection,
    });
  };

  const hideTextOpt = () => {
    setTextOptState({
      isVisiable: false,
      position: { x: 0, y: 0 },
      selection: null,
    });
  };

  useEffect(() => {
    const handleGlobalMouseDown = (event) => {
      const selection = window.getSelection();

      if (selection.isCollapsed) {
        hideTextOpt();
      }
    };
    document.addEventListener("mousedown", handleGlobalMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleGlobalMouseDown);
    };
  }, []);

  return (
    <TextOptionContext.Provider
      value={{ ...textOptState, showTextOpt, hideTextOpt }}
    >
      {children}
    </TextOptionContext.Provider>
  );
}

export const useTextOption = () => useContext(TextOptionContext);
