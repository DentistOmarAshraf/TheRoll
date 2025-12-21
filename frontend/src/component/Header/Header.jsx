import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header_container}>
      <p className={styles.page_title}>أجنده قضائيه</p>
      <svg
        className={styles.header_svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 125"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M1420.65 125C1206.43 125 485.789 101.409 0 0V125C0 125 1634.86 125 1420.65 125Z"
          fill="url(#paint0_linear_675_391)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_675_391"
            x1="720"
            y1="125"
            x2="726.279"
            y2="52.3648"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0961538" stopColor="#14B8A6" />
            <stop offset="1" stopColor="#09524A" />
          </linearGradient>
        </defs>
      </svg>
    </header>
  );
}
