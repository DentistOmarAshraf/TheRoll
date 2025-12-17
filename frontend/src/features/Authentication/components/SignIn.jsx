import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../../../component/Button";
import styles from "./SignIn.module.css";
import { useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isPassVisiable, setPassVisiable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (user) => {
    const errors = {};

    if (!user.email) {
      errors.email = "البريد الالكتروني مطلوب";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
      errors.email = "البريد الالكتروني غير صالح";
    }

    if (!user.password) {
      errors.password = "كلمه المرور مطلوبه";
    } else if (user.password.length < 8) {
      errors.password = "كلمه المرور يجب الا تقل عن 8 احرف";
    }
    return errors;
  };

  const handleShowPass = () => {
    setPassVisiable((v) => !v);
  };

  const handleSubmit = () => {
    const errors = validateForm(user);
    setErrors((prev) => ({ ...prev, ...errors }));
    console.log(user);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.sign_in_container}>
      <div className={styles.input_group}>
        <label htmlFor="email">البريد الالكتروني</label>
        <div
          className={`${styles.input_field} ${
            errors.email ? styles.error : ""
          }`}
        >
          <Mail />
          <input
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="example123@mail.com"
            onKeyDown={handleKeyDown}
          />
        </div>
        {errors.email && <p className={styles.error_msg}>{errors.email}</p>}
      </div>
      <div className={styles.input_group}>
        <label htmlFor="password">كلمه المرور</label>
        <div
          className={`${styles.input_field} ${
            errors.password ? styles.error : ""
          }`}
        >
          <Lock />
          <input
            id="password"
            type={isPassVisiable ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder={
              isPassVisiable ? "PASSWORD IS VISIABLE" : "Your Password"
            }
            onKeyDown={handleKeyDown}
          />
          {isPassVisiable ? (
            <Eye className={styles.show_pass} onClick={handleShowPass} />
          ) : (
            <EyeOff className={styles.show_pass} onClick={handleShowPass} />
          )}
        </div>
        {errors.password && (
          <p className={styles.error_msg}>{errors.password}</p>
        )}
      </div>
      <div className={styles.remeber_group}>
        <div>
          <input type="checkbox" />
          <label>تذكرني</label>
        </div>
        <a href="http://google.com">هل نسيت كلمه المرور؟</a>
      </div>
      <div className={styles.submit_group}>
        <Button onClick={handleSubmit} className="sign_in__button--submit">
          تسجيــل دخول
        </Button>
      </div>
    </div>
  );
}
