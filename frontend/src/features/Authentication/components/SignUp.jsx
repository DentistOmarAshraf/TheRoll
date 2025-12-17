import { useEffect, useState, useReducer, useCallback } from "react";
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
  Check,
  Hourglass,
  CircleX,
} from "lucide-react";
import ProgressBar from "../../../component/ProgressBar";
import Select from "react-select";
import axios from "axios";
import { formData, formReducer } from "./formdata";

export default function SignUp() {
  const [userType, setUserType] = useState("");
  const [isPassVisiable, setPassVisiable] = useState(false);
  const [isConfVisiable, setConfVisiable] = useState(false);
  const [state, setState] = useState("ready");
  const [progress, setProgress] = useState(0);
  const [user, dispatch] = useReducer(formReducer, formData);
  const [errors, setErrors] = useState({});
  const university = [
    { _id: "144", name: "جامعه القاهره" },
    { _id: "255", name: "جامعه الاسكندريه" },
  ];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    dispatch({ type: "CHANGE", name, value });
  }, []);

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    if (!files.length) return;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    dispatch({ type: "SET_FILE", file: files[0] });
    setState((prev) => "uploading");
  }, []);

  const validateForm = (user, userType) => {
    const errors = {};

    if (!user.fullName) errors.fullName = "الاسم مطلوب";

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

    if (!user.confirmPass) {
      errors.confirmPass = "تأكيد كلمه المرور مطلوب";
    } else if (user.password !== user.confirmPass) {
      errors.confirmPass = "كلمه المرور غير متطابقه";
    }

    if (!user.phone) {
      errors.phone = "رقم الموبايل مطلوب";
    } else if (user.phone.length > 11) {
      errors.phone = "رقم الموبايل غير صالح";
    }

    if (userType === "Student") {
      if (!user.university) errors.university = "يجب اختيار الجامعه";
      if (!user.file) errors.file = "صوره كارنيه الجامعه مطلوبه";
    }

    if (userType === "Lawyer") {
      if (!user.syndicateId) {
        errors.syndicateId = "رقم القيد في النقابه مطلوب";
      } else if (!/^[0-9]{6,}$/.test(user.syndicateId)) {
        errors.syndicateId = "رقم القيد خاطئ";
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    const errors = validateForm(user, userType);
    console.log(errors);
    if (errors != {}) setErrors((prev) => ({ ...prev, ...errors }));
  };

  const handleShowPass = () => {
    setPassVisiable((v) => !v);
  };

  const handleShowConf = () => {
    setConfVisiable((v) => !v);
  };

  // This will be cleaned later on deployment
  useEffect(() => {
    (async () => {
      if (!user.file) return;
      const fromData = new FormData();
      fromData.append("file", user.file);
      try {
        const res = await axios.post("http://localhost:5000/echo", fromData, {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setProgress((prev) => progress);
          },
        });
        console.log(res);
        setState((prve) => "done");
      } catch (e) {
        setState((prev) => "error");
        console.error(e);
      }
    })();
  }, [user.file]);

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
            <div
              className={`${styles.input_field} ${
                errors.fullName ? styles.error : ""
              }`}
            >
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
            {errors.fullName && (
              <p className={styles.error_msg}>{errors.fullName}</p>
            )}
          </div>
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
                placeholder="كلمه المرور لا تقل عن 8 احرف"
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
          <div className={styles.input_group}>
            <label htmlFor="confirmPass">تأكيد كلمه المرور</label>
            <div
              className={`${styles.input_field} ${
                errors.confirmPass ? styles.error : ""
              }`}
            >
              <Lock />
              <input
                id="confirmPass"
                type={isConfVisiable ? "text" : "password"}
                name="confirmPass"
                placeholder="أعد ادخال كلمه المرور"
                onChange={handleChange}
              />
              {isConfVisiable ? (
                <Eye className={styles.show_pass} onClick={handleShowConf} />
              ) : (
                <EyeOff className={styles.show_pass} onClick={handleShowConf} />
              )}
            </div>
            {errors.confirmPass && (
              <p className={styles.error_msg}>{errors.confirmPass}</p>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="phone">رقم الموبايل</label>
            <div
              className={`${styles.input_field} ${
                errors.phone ? styles.error : ""
              }`}
            >
              <Smartphone />
              <input
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="01234567890"
              />
            </div>
            {errors.phone && <p className={styles.error_msg}>{errors.phone}</p>}
          </div>
          {userType === "Lawyer" && (
            <div className={styles.input_group}>
              <label>رقم القيد</label>
              <div
                className={`${styles.input_field} ${
                  errors.syndicateId ? styles.error : ""
                }`}
              >
                <IdCard />
                <input
                  id="syndicateId"
                  name="syndicateId"
                  type="text"
                  value={user.syndicateId}
                  onChange={handleChange}
                  placeholder="رقم القيد في نقابه المحامين"
                />
              </div>
              {errors.syndicateId && (
                <p className={styles.error_msg}>{errors.syndicateId}</p>
              )}
            </div>
          )}
          {userType === "Student" && (
            <>
              <div className={styles.input_group}>
                <label>اختر الجامعه</label>
                <div
                  className={`${styles.input_field} ${
                    errors.university ? styles.error : ""
                  }`}
                >
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
                    onChange={(opt) => {
                      setErrors((prev) => ({ ...prev, university: "" }));
                      dispatch({
                        type: "CHANGE",
                        name: "university",
                        value: opt.value,
                      });
                    }}
                  />
                </div>
                {errors.university && (
                  <p className={styles.error_msg}>{errors.university}</p>
                )}
              </div>
              <div className={styles.input_group}>
                <label htmlFor="file-upload">صوره كارنيه الجامعه</label>
                <div
                  className={`${styles.input_field} ${
                    errors.file ? styles.error : ""
                  }`}
                >
                  <IdCard />
                  <div className={styles.custom_file_container}>
                    <div className={styles.custom_file_upload}>
                      <span>رفع صوره الكارنيه</span>
                    </div>
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                {errors.file && (
                  <p className={styles.error_msg}>{errors.file}</p>
                )}
                <div
                  className={`${styles.photo_info_container} ${
                    !user.file ? styles.hidden : ""
                  }`}
                >
                  {user.file && (
                    <p>{user.file.name}</p>
                  )}
                  <div>
                    <p className={styles.upload_state}>
                      {state !== "ready" && state}
                      &nbsp;
                      {state === "done" && <Check color="blue" />}
                      {state === "uploading" && <Hourglass />}
                      {state === "error" && <CircleX color="red" />}
                    </p>
                  </div>
                </div>
                {user.file && <ProgressBar value={progress} />}
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
              onClick={handleSubmit}
            >
              انــشاء الحســاب
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
