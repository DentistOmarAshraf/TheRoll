import styles from "./ContentHeader.module.css";
import logo from "../../../assets/logo.png";

export default function ContentHeader() {
  return (
    <div className={styles.content_header}>
      <div className={styles.content_creator}>
        <p>مكتب الأستاذ</p>
        <p>مـصـطفى شــريــف</p>
      </div>
      <div className={styles.content_creator_logo}>
        <img src={logo} />
      </div>
      <div className={styles.content_creator}>
        <p>الأساتذة</p>
        <p>أحمد السيد حسين الشريف</p>
        <p>سامر إسماعيل سيد</p>
      </div>
    </div>
  );
}
