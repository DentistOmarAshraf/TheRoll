import { createContext, useContext, useState } from "react";

const TemplateContext = createContext();

export default function TemplateContextProvider({children}) {
  const [templateData, setTemplateData] = useState({fields: [], fieldsButtons: []});
  return (
    <TemplateContext.Provider value={{templateData, setTemplateData}}>
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemp = () => useContext(TemplateContext);
