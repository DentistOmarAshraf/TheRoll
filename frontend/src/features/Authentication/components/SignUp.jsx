import { useState } from "react";
import Button from "../../../component/Button";
import styles from "./SignIn.module.css";
import {
  Scale,
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  Smartphone,
  IdCard,
} from "lucide-react";

export default function SignUp() {
  const [userType, setUserType] = useState("");
  return (
    <div className={styles.sign_up_container}>
      {!userType && (
        <div className={styles.user_type_group}>
          <Button
            className={`sign_up__button--choise`}
            onClick={() => setUserType("Lawyer")}
          >
            <Scale className={styles.button_icon} strokeWidth={1} />
            محامي
          </Button>
          <Button
            className={`sign_up__button--choise`}
            onClick={() => setUserType("Student")}
          >
            <GraduationCap className={styles.button_icon} strokeWidth={1} />
            طالب
          </Button>
        </div>
      )}
      {userType && (
        <>
          <div className={styles.input_group}>
            <label>الاسم</label>
            <div className={styles.input_field}>
              <User />
              <input placeholder="الاسم الثلاثي" />
            </div>
          </div>
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
              <input placeholder="كلمه المرور لا تقل عن 8 احرف" />
              <Eye />
            </div>
          </div>
          <div className={styles.input_group}>
            <label>تأكيد كلمه المرور</label>
            <div className={styles.input_field}>
              <Lock />
              <input placeholder="كلمه المرور لا تقل عن 8 احرف" />
              <Eye />
            </div>
          </div>
          <div className={styles.input_group}>
            <label>رقم الموبايل</label>
            <div className={styles.input_field}>
              <Smartphone />
              <input placeholder="01234567890" />
            </div>
          </div>
          {userType === "Lawyer" && (
            <div className={styles.input_group}>
              <label>رقم القيد</label>
              <div className={styles.input_field}>
                <IdCard />
                <input placeholder="رقم القيد في نقابه المحامين" />
              </div>
            </div>
          )}
          {userType === "Student" && (
            <div className={styles.input_group}>
              <label>رقم كارنيه الجامعه</label>
              <div className={styles.input_field}>
                <IdCard />
                <input placeholder="رقم كارنيه الجامعه" />
              </div>
            </div>
          )}
          <div className={styles.submit_group}>
            <Button className={`sign_up__button--submit`}>انــشاء الحســاب</Button>
          </div>
        </>
      )}
    </div>
  );
}
