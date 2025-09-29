import { createContext, useContext, useState } from "react";

const TemplateContext = createContext();

export default function TemplateContextProvider({ children }) {
  const [templateData, setTemplateData] = useState({
    section: "",
    title: "",
    intro: "",
    middle: "",
    final: "",
    summary: "",
    tags: "",
    fields: [],
    fieldsButtons: [],
    focus: "",
    cursorPostion: 0,
  });
  return (
    <TemplateContext.Provider value={{ templateData, setTemplateData }}>
      {children}
    </TemplateContext.Provider>
  );
}

export const useTemp = () => useContext(TemplateContext);
