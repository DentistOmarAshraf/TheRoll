import { useEffect, useState, useReducer, useCallback } from "react";
import { data, useNavigate } from "react-router-dom";
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
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import ProgressBar from "../../../component/ProgressBar";
import { formData, formReducer } from "./formdata";
import { registerUser } from "../../../api/userClient";
import { getUniversities } from "../../../api/universityClient";

export default function SignUp() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [isPassVisiable, setPassVisiable] = useState(false);
  const [isConfVisiable, setConfVisiable] = useState(false);
  const [state, setState] = useState("ready"); //upload State
  const [uploadKey, setUploadKey] = useState({}); // WILL BE A REAL KEY WHEN TESTING WITH AMAZON
  const [progress, setProgress] = useState(0);
  const [user, dispatch] = useReducer(formReducer, formData);
  const [agreePolicy, setAgreement] = useState(false);
  const [alert, setAlert] = useState({ status: "no_alert", message: "" });
  const [errors, setErrors] = useState({});
  const [university, setUniversities] = useState([]);

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
    const phoneRegex = /^01[0125]\d{8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!user.fullName) errors.fullName = "الاسم مطلوب";

    if (!user.email) {
      errors.email = "البريد الالكتروني مطلوب";
    } else if (!emailRegex.test(user.email)) {
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
    } else if (!phoneRegex.test(user.phone)) {
      errors.phone = "رقم الموبايل غير صالح";
    }

    if (userType === "Student") {
      if (!user.university) errors.university = "يجب اختيار الجامعه";
      if (!user.file) errors.file = "صوره كارنيه الجامعه مطلوبه";
      if (user.file && !user.photoId) errors.file = "اعد تحميل الصفحه";
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

  const handleSubmit = async (e) => {
    const errors = validateForm(user, userType);
    // console.log(errors);
    if (Object.keys(errors).length > 0) {
      setErrors((prev) => ({ ...prev, ...errors }));
      return;
    }
    if (!agreePolicy) {
      setAlert((prev) => ({
        ...prev,
        status: "error",
        message: "يجب الموافقه على شروط الاستخدام",
      }));
      return;
    } else {
      setAlert((prev) => ({ ...prev, status: "no_alert", message: "" }));
    }
    let userFinalData;
    if (userType == "Student") {
      const { file, syndicateId, confirmPass, ...studentData } = user;
      userFinalData = { type: userType, ...studentData };
    }
    if (userType == "Lawyer") {
      const { file, photoId, university, confirmPass, ...lawyerData } = user;
      userFinalData = { type: userType, ...lawyerData };
    }
    try {
      const result = await registerUser(userFinalData);
      const { fullName } = result.data;
      toast.success(
        `اهلا بك ${fullName} .. تم ارسال رابط التأكيد الى البريد الالكتروني بنجاح`
      );
      navigate("/office/calendar");
    } catch (e) {
      setAlert((prev) => ({
        ...prev,
        status: e.response?.data?.status || "error",
        message: e.response?.data?.error || "حدث خطأ",
      }));
    }
  };

  const handleShowPass = () => {
    setPassVisiable((v) => !v);
  };

  const handleShowConf = () => {
    setConfVisiable((v) => !v);
  };

  // fetch universites from db
  useEffect(() => {
    (async () => {
      if (userType !== "Student") {
        return;
      }
      try {
        const result = await getUniversities();
        setUniversities((prev) => result.data);
      } catch (e) {
        setErrors((prev) => ({
          ...prev,
          university: "الرجاء المحاوله في وقت لاحق",
        }));
      }
    })();
  }, [userType]);

  // This will be cleaned later on deployment
  useEffect(() => {
    (async () => {
      if (userType != "Student") {
        return;
      }
      try {
        // I am trying to mimic the request from S3
        // To upload photo
        // This will be refactored when deploying
        const res = await axios.post(
          "http://localhost:5000/upload/universityid"
        );
        // the respons is {url: url of upload, key: generated in back}
        setUploadKey(res.data);
      } catch (e) {
        setErrors((prev) => ({ ...prev, file: "الرجاء المحاوله في وقت لاحق" }));
      }
    })();
  }, [userType]);

  useEffect(() => {
    (async () => {
      if (!user.file) return;
      const fromData = new FormData();
      fromData.append("file", user.file);
      try {
        const res = await axios.post(
          uploadKey.url, // here is the url that I get from back (to upload the photo on it)
          {
            key: uploadKey.key, // that is the key of uploading
            ...fromData,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 30000,
            onUploadProgress: (progressEvent) => {
              const progress = progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : 0;
              setProgress((prev) => progress);
            },
          }
        );
        console.log(res);
        dispatch({ type: "CHANGE", name: "photoId", value: uploadKey.key });
        setState((prve) => "done");
      } catch (e) {
        setState((prev) => "error");
        setProgress((prev) => 0);
        setErrors((prev) => ({ ...prev, file: "هناك  خطأ" }));
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
                      disabled={!!user.file} // if the file is already uploaded so user have to reload
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
              <input
                type="checkbox"
                checked={agreePolicy}
                onChange={(e) => {
                  setAgreement(e.target.checked);
                }}
              />
              <label>
                موافق على <a href="http://google.com">شروط الاستخدام</a>
              </label>
            </div>
          </div>
          <div className={`${styles.server_response} ${styles[alert.status]}`}>
            {alert.message}
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
