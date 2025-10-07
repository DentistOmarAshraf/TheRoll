import styles from "./TemplateViewer.module.css";
import logo from "../../assets/logo.png";

export default function TemplateViewer({ title, intro, summury, middle, final }) {
  const someStr = "<b>عمر اشرف</b> كلام تاني"
  return (
    <div className={styles.container}>
      <div className={styles.paper_container}>
        <div className={styles.content_container}>

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

          <div className={styles.content_begining}>
            <div className={styles.intro_flex_container}>
              <p dangerouslySetInnerHTML={{__html: intro}}></p>
            </div>
            <div className={`${styles.summury_fixed_container} ${!summury ? styles.hidden : ""}`}>
              <p dangerouslySetInnerHTML={{__html: summury}}></p>
            </div>
          </div>

          <div className={styles.content_middle_final}>
             <div className={styles.content_middle}>
              <p dangerouslySetInnerHTML={{__html: middle}}></p>
             </div>
             <div className={styles.content_final}>
              <p dangerouslySetInnerHTML={{__html: final}}>
              </p>
             </div>
          </div>

          <div className={styles.content_footer}>
            <p dangerouslySetInnerHTML={{__html: someStr}}></p>
          </div>
        </div>
      </div>
    </div>
  );
}
