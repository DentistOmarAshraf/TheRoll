import { useState } from "react";
import Button from "../../../component/Button";
import styles from "./SignIn.module.css";
import { SignUpSelectStyle } from "./selectStyle";
import {
  Scale,
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  IdCard,
  University,
} from "lucide-react";
import Select from "react-select";

export default function SignUp() {
  const [userType, setUserType] = useState("");
  const [isPassVisiable, setPassVisiable] = useState(false);
  const [isConfVisiable, setConfVisiable] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
    university: "",
    grade: "",
    syndicateId: "",
  });

  // Temporary
  const university = [
    { _id: "144", name: "جامعه القاهره" },
    { _id: "255", name: "جامعه الاسكندريه" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowPass = () => {
    setPassVisiable((v) => !v);
  };

  const handleShowConf = () => {
    setConfVisiable((v) => !v);
  };

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
            <label htmlFor="fullName">الاسم</label>
            <div className={`${styles.input_field}`}>
              {/** ${styles.error} */}
              <User />
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                placeholder="الاسم الثلاثي"
              />
            </div>
          </div>
          <div className={styles.input_group}>
            <label htmlFor="email">البريد الالكتروني</label>
            <div className={styles.input_field}>
              <Mail />
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="example123@mail.com"
              />
            </div>
          </div>
          <div className={styles.input_group}>
            <label htmlFor="password">كلمه المرور</label>
            <div className={styles.input_field}>
              <Lock />
              <input
                id="password"
                type={isPassVisiable ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="كلمه المرور لا تقل عن 8 احرف"
              />
              {isPassVisiable && (
                <Eye className={styles.show_pass} onClick={handleShowPass} />
              )}
              {!isPassVisiable && (
                <EyeOff className={styles.show_pass} onClick={handleShowPass} />
              )}
            </div>
          </div>
          <div className={styles.input_group}>
            <label htmlFor="confirmPass">تأكيد كلمه المرور</label>
            <div className={styles.input_field}>
              <Lock />
              <input
                id="confirmPass"
                type={isConfVisiable ? "text" : "password"}
                name="confirmPass"
                placeholder="أعد ادخال كلمه المرور"
                onChange={handleChange}
              />
              {isConfVisiable && (
                <Eye className={styles.show_pass} onClick={handleShowConf} />
              )}
              {!isConfVisiable && (
                <EyeOff className={styles.show_pass} onClick={handleShowConf} />
              )}
            </div>
          </div>
          <div className={styles.input_group}>
            <label htmlFor="phone">رقم الموبايل</label>
            <div className={styles.input_field}>
              <Smartphone />
              <input
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="01234567890"
              />
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
            <>
              <div className={styles.input_group}>
                <label>اختر الجامعه</label>
                <div className={styles.input_field}>
                  <University />
                  <Select
                    className="form_select"
                    classNamePrefix="form_select"
                    placeholder="اختر الجامعه"
                    options={university.map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                    styles={SignUpSelectStyle}
                  />
                </div>
              </div>
              <div className={styles.input_group}>
                <label>صوره كارنيه الجامعه</label>
                <div className={styles.input_field}>
                  <IdCard />
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="رقم كارنيه الجامعه"
                  />
                </div>
              </div>
            </>
          )}
          <div className={styles.remeber_group}>
            <div>
              <input type="checkbox" />
              <label>
                موافق على <a href="http://google.com">شروط الاستخدام</a>
              </label>
            </div>
          </div>
          <div className={styles.submit_group}>
            <Button
              className={`sign_up__button--submit`}
              onClick={() => {
                console.log({ type: userType, ...user });
              }}
            >
              انــشاء الحســاب
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
