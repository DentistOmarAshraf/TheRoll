import { useContext, createContext, useRef, useEffect } from "react";
import useObserver from "../../../hooks/ResizeObserver";

const ResizeContext = createContext(null);

export default function ResizeContextProvider({ children }) {
  const [sumParaSize, sumParRef] = useObserver();
  const sumRef = useRef(null);
  const [introParaSize, introParaRef] = useObserver();
  const introContRef = useRef(null);
  const [midParaSize, midParaRef] = useObserver();
  const midContRef = useRef(null);
  const [finParaSize, finParaRef] = useObserver();
  const finContRef = useRef(null);

  useEffect(() => {
    const parent = sumRef.current.parentElement;
    const cellHeight = parent.offsetHeight / 40;

    // if there is no summury then all containers (intro, middle, final) will extend
    // the column end
    if (!sumParaSize.width) {
      introContRef.current.style.gridColumnEnd = 6;
      midContRef.current.style.gridColumnEnd = 6;
      finContRef.current.style.gridColumnEnd = 6;
    }

    // intro cell height, set intro container GridRowEnd according to paragraph height
    let introRowEnd = Math.ceil(introParaSize.height / cellHeight) + 6;
    introRowEnd = introRowEnd > 41 ? 41 : introRowEnd;
    introContRef.current.style.gridRowEnd = introRowEnd;

    // set middle container height according to intro
    // it start from intro ending
    const midCellStart = Number(introContRef.current.style.gridRowEnd); // --> cell start is where intro end
    midContRef.current.style.gridRowStart = midCellStart;
    let midRowEnd = Math.ceil(midParaSize.height / cellHeight) + midCellStart;
    midRowEnd = midRowEnd > 41 ? 41 : midRowEnd;
    midContRef.current.style.gridRowEnd = midRowEnd;

    // set final container height according to mid
    // it start from mid ending
    const finCellStart = Number(midContRef.current.style.gridRowEnd); // --> cell start is where mid end
    finContRef.current.style.gridRowStart = finCellStart;
    let finRowEnd = Math.ceil(finParaSize.height / cellHeight) + finCellStart;
    finRowEnd = finRowEnd > 41 ? 41 : finRowEnd;
    finContRef.current.style.gridRowEnd = finRowEnd;

    // set grid row end of summury container
    // summury container become last becasue
    // column end of intro and mid and final will be set according to the
    // height of summury (RowEnd)
    // if Row End == start any contaniner then it should shring (Column end - 1)
    let sumRowEnd = Math.ceil(sumParaSize.height / cellHeight) + 6;
    sumRowEnd = sumRowEnd > 41 ? 41 : sumRowEnd;
    sumRef.current.style.gridRowEnd = sumRowEnd;

    // here when decide which container or not
    if (sumParaSize.width) {
      introContRef.current.style.gridColumnEnd = 5; // ---> intro will always shrink to 5
      midContRef.current.style.gridColumnEnd =
        sumRowEnd > Number(midContRef.current.style.gridRowStart) ? 5 : 6;
      finContRef.current.style.gridColumnEnd =
        sumRowEnd > Number(finContRef.current.style.gridRowStart) ? 5 : 6;
    }
  }, [introParaSize, midParaSize, sumParaSize, finParaSize]);

  return (
    <ResizeContext.Provider
      value={{
        introContRef,
        introParaRef,
        sumRef,
        sumParRef,
        midContRef,
        midParaRef,
        finParaRef,
        finContRef,
      }}
    >
      {children}
    </ResizeContext.Provider>
  );
}

export const useResizeContext = () => useContext(ResizeContext);
