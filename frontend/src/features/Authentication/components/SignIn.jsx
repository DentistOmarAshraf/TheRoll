import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../../../component/Button";
import styles from "./SignIn.module.css";
import { useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isPassVisiable, setPassVisiable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowPass = () => {
    setPassVisiable((v) => !v);
  };

  const handleSubmit = () => {
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
        <div className={styles.input_field}>
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
            placeholder={
              isPassVisiable ? "PASSWORD IS VISIABLE" : "Your Password"
            }
            onKeyDown={handleKeyDown}
          />
          {isPassVisiable && (
            <Eye className={styles.show_pass} onClick={handleShowPass} />
          )}
          {!isPassVisiable && (
            <EyeOff className={styles.show_pass} onClick={handleShowPass} />
          )}
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
        <Button onClick={handleSubmit} className="sign_in__button--submit">
          تسجيــل دخول
        </Button>
      </div>
    </div>
  );
}
