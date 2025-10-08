import styles from "./ContentFooter.module.css";

export default function ContentFooter({ footer }) {
  return (
    <div className={`${styles.content_footer} ${!footer ? styles.hidden : ""}`}>
      <p dangerouslySetInnerHTML={{ __html: footer }}></p>
    </div>
  );
}
