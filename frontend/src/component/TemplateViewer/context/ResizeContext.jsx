import { useContext, createContext, useRef, useEffect } from "react";
import useObserver from "../../../hooks/ResizeObserver";

const ResizeContext = createContext(null);

export default function ResizeContextProvider({ children }) {
  const [size, sumParRef] = useObserver();
  const sumRef = useRef(null);
  const introRef = useRef(null);
  const midRef = useRef(null);
  const finRef = useRef(null);

useEffect(() => {
  if (!sumRef.current || !sumParRef.current) return;

  const parent = sumRef.current.parentElement;

  // If container width is not set yet
  if (!size.width) {
    introRef.current.style.gridColumnEnd = 6;
    midRef.current.style.gridColumnEnd = 6;
    finRef.current.style.gridColumnEnd = 6;
    return;
  }

  // Once we have size
  const cellHeight = parent.offsetHeight / 20;
  let RowEnd = Math.ceil(size.height / cellHeight) + 3;
  RowEnd = RowEnd > 21 ? 21 : RowEnd;
  sumRef.current.style.gridRowEnd = RowEnd;

  // Logic remains the same, but cleaner
  introRef.current.style.gridColumnEnd = 5;
  midRef.current.style.gridColumnEnd = RowEnd > 10 ? 5 : 6;
  finRef.current.style.gridColumnEnd = RowEnd > 15 ? 5 : 6;
}, [size]);

  return (
    <ResizeContext.Provider
      value={{ size, introRef, sumRef, sumParRef, midRef, finRef }}
    >
      {children}
    </ResizeContext.Provider>
  );
}

export const useResizeContext = () => useContext(ResizeContext);
