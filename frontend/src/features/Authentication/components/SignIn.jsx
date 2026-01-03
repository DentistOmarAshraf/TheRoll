import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../../component/Button";
import styles from "./SignIn.module.css";
import { useState } from "react";
import { login } from "../../../api/userClient";
import { useAuth } from "../../../context/AuthContext";
import { setUserToken } from "../../../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [isPassVisiable, setPassVisiable] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setUserForm((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async () => {
    const errors = validateForm(userForm);
    if (Object.keys(errors).length > 0) {
      setErrors((prev) => ({ ...prev, ...errors }));
      toast.error("تسجيل خاطئ !");
      return;
    }
    try {
      const response = await login(userForm);
      if (response.status == "success") {
        setUserToken(response.data.accToken);
        setUser(response.data.user);
        toast.success(
          `تم تسجيل الدخول بنجاح ... اهلا بك ${response.data.user.fullName}`
        );
        navigate("/office");
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "حدث خطأ");
    }
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
            value={userForm.email}
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
            value={userForm.password}
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
          <input
            type="checkbox"
            checked={userForm.remember}
            onChange={(e) =>
              setUserForm((prev) => ({ ...prev, remember: e.target.checked }))
            }
          />
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
