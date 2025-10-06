import { useState } from "react";
import styles from "./Testing.module.css";

const Testing = () => {
  const [show, setShow] = useState("");
  const str = "سطر واحد\nسطر اتنين";
  const handleChange = (e) => {
    const { value } = e.target;
    setShow(value);
  };
  return (
    <>
      <div className={styles.parent}>
        <div className={styles.flexable_container}>
          <p>{str}</p>
        </div>
        <div
          className={`${styles.fixed_container} ${!show ? styles.hidden : ""}`}
        >
          <p>{show}</p>
        </div>
      </div>
      <textarea onChange={handleChange}></textarea>
    </>
  );
};

export default Testing;
