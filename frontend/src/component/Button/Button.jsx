import styles from "./Button.module.css";

export default function Button({ children, className = "button", ...rest }) {
  const classes = className
    .split(" ")
    .map((c) => styles[c] || "")
    .join(" ");

  return (
    <button className={`${styles.button} ${classes}`} {...rest}>
      {children}
    </button>
  );
}
