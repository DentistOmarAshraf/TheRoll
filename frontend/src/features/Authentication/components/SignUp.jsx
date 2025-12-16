import { useEffect, useState } from "react";
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

export default function SignUp() {
  const [userType, setUserType] = useState("");
  const [isPassVisiable, setPassVisiable] = useState(false);
  const [isConfVisiable, setConfVisiable] = useState(false);
  const [state, setState] = useState("ready");
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
    university: "",
    grade: "",
    syndicateId: "",
    file: "",
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

  const handleFileChange = async (e) => {
    const { files } = e.target;
    if (!files.length) return;
    setUser((prev) => ({ ...prev, file: files[0] }));
    setState((prev) => "uploading");
  };

  const handleShowPass = () => {
    setPassVisiable((v) => !v);
  };

  const handleShowConf = () => {
    setConfVisiable((v) => !v);
  };

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
                <label htmlFor="file-upload">صوره كارنيه الجامعه</label>
                <div className={styles.input_field}>
                  <IdCard />
                  <div className={styles.custom_file_container}>
                    <div className={styles.custom_file_upload}>
                      <span>اختر صوره الكارنيه</span>
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
                <div
                  className={`${styles.photo_info_container} ${
                    !user.file ? styles.hidden : ""
                  }`}
                >
                  {user.file && <p>{user.file.name}</p>}
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
