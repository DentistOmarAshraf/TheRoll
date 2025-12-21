import styles from "./Calendar.module.css";

export default function Calendar({ className = "icon" }) {
  const classes = className
    .split(" ")
    .map((c) => styles[c] || "")
    .join(" ");
  return (
    <svg
      className={`${styles.icon} ${classes}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.6"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 2.75v3"></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17 2.75v3"
      ></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 8.25h15"
      ></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 5.75h12a2 2 0 0 1 2 2v11.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7.75a2 2 0 0 1 2-2Z"
      ></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.5 12.25h3"
      ></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12.5 15.75h3"
      ></path>
    </svg>
  );
}
