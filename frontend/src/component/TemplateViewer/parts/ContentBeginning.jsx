import styles from "./ContentBeginning.module.css"

export default function ContentBeginning({intro, summary}) {
  return (
    <div className={styles.content_beginning}>
      <div className={styles.intro_flex_container}>
        <p dangerouslySetInnerHTML={{ __html: intro }}></p>
      </div>
      <div
        className={`${styles.summary_fixed_container} ${
          !summary ? styles.hidden : ""
        }`}
      >
        <p dangerouslySetInnerHTML={{ __html: summary }}></p>
      </div>
    </div>
  );
}
