import { Mail, Lock, Eye } from "lucide-react";
import Button from "../../../component/Button";
import styles from "./SignIn.module.css"

export default function SignIn() {
  return (
    <div className={styles.sign_in_container}>
      <div className={styles.input_group}>
        <label>البريد الالكتروني</label>
        <div className={styles.input_field}>
          <Mail />
          <input placeholder="example123@mail.com" />
        </div>
      </div>
      <div className={styles.input_group}>
        <label>كلمه المرور</label>
        <div className={styles.input_field}>
          <Lock />
          <input placeholder="Your Password" />
          <Eye />
        </div>
      </div>
      <div className={styles.remeber_group}>
        <div>
          <input type="checkbox" />
          <label>تذكرني</label>
        </div>
        <a href="http://google.com">هل نسيت كلمه المرور؟</a>
      </div>
      <div className={styles.submit_group}>
        <Button className="sign_in__button--submit">تسجيــل دخول</Button>
      </div>
    </div>
  );
}
