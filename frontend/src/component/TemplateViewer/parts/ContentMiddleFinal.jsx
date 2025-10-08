import styles from "./ContentMiddleFinal.module.css"

export default function ContentMiddleFinal({ middle, final }) {
  return (
    <div className={styles.content_middle_final}>
      <div className={styles.content_middle}>
        <p dangerouslySetInnerHTML={{ __html: middle }}></p>
      </div>
      <div className={styles.content_final}>
        <p dangerouslySetInnerHTML={{ __html: final }}></p>
      </div>
    </div>
  );
}
