import { useContext, createContext, useState } from "react";

const UI = createContext(null);

export default function OfficeUIContext({ children }) {
  const [isSideOpen, setSideOpen] = useState(false);
  return (
    <UI.Provider value={{ isSideOpen, setSideOpen }}>{children}</UI.Provider>
  );
}

export const useUI = () => useContext(UI);
