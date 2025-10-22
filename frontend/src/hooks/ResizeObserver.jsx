import { useEffect, useState, useRef } from "react";

export default function useObserver() {
  const [size, setSize] = useState({width: 0, height: 0})
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const obs = new ResizeObserver((entries) => {
      const {width, height} = entries[0].contentRect;
      setSize({width, height});
    });
    obs.observe(element);
    return () => obs.disconnect();
  }, [ref]);
  return [size, ref];
}
