import styles from "./Inputs.module.css";
import { useSignUp } from "../context/SignUpContext";
import { useState } from "react";

export default function StudentInputs({ className = "", ...rest }) {
  const { student, setStudent } = useSignUp();
  const [passVisibility, setPassVisibility] = useState(true);
  const [city, setCity] = useState([
    { name: "القاهره", id: "1" },
    { name: "جيزه", id: "2" },
  ]);
  const [neighborhood, setNeighborhood] = useState([
    { id: "01", name: "المقطم" },
    { id: "02", name: "السيده عائشه" },
  ]);

  const [university, setUniversity] = useState([
    { id: "11", name: "جامعه القاهره" },
    { id: "22", name: "جامعه الاسكندريه" },
  ]);

  const classes = className
    .split(" ")
    .map((c) => styles[c] || "")
    .join(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(student);
    setStudent((prev) => ({ ...student, [name]: value }));
  };

  const handlePassVisibility = (e) => {
    setPassVisibility((prev) => !prev);
  };
  return (
    <div className={`${styles.input_container} ${classes}`}>
      <h1>تسجيل حساب طالب</h1>
      <label>
        <span className={styles.labelText}>الاسم</span>
        <input
          name="fullName"
          value={student.fullName}
          onChange={handleChange}
          type="text"
        />
      </label>
      <label>
        <span className={styles.labelText}>البريد الالكتروني</span>
        <input
          name="email"
          value={student.email}
          onChange={handleChange}
          type="email"
        />
      </label>
      <label>
        <span className={styles.labelText}>كلمه المرور</span>
        <input
          name="password"
          value={student.password}
          onChange={handleChange}
          type={passVisibility ? "password" : "text"}
        />
      </label>
      <label>
        <span className={styles.labelText}>تأكيد كلمه المرور</span>
        <div>
          <input
            className={styles.custom_input}
            name="confirmPass"
            value={student.confirmPass}
            onChange={handleChange}
            type={passVisibility ? "password" : "text"}
          />
          <i
            className={`far fa-eye ${passVisibility && "fa-eye-slash"}`}
            id="togglePassword"
            onClick={handlePassVisibility}
          ></i>
        </div>
      </label>
      <label>
        <span className={styles.labelText}>موبايل</span>
        <div>
          <input
            className={`${styles.custom_input} ${styles.phone_input}`}
            name="phone"
            value={student.phone}
            onChange={handleChange}
            type="text"
          />
          <select
            className={styles.phone_option}
            name="countryCode"
            defaultValue={student.countryCode}
            onChange={handleChange}
          >
            <option value="+2">2+</option>
          </select>
        </div>
      </label>
      <label>
        <span className={styles.labelText}>المحافظه</span>
        <select name="city" value={student.city} onChange={handleChange}>
          {!student.city && (
            <option value="" disabled>
              اختر المحافظه
            </option>
          )}
          {city.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={styles.labelText}>الحي</span>
        <select
          name="neighborhood"
          value={student.neighborhood}
          onChange={handleChange}
        >
          {!student.neighborhood && (
            <option value="" disabled>
              اختر حي / قسم
            </option>
          )}
          {neighborhood.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={styles.labelText}>الجامعه</span>
        <select
          name="university"
          value={student.university}
          onChange={handleChange}
        >
          {!student.university && (
            <option value="" disabled>
              اختر الجامعه
            </option>
          )}
          {university.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={styles.labelText}>السنه</span>
        <select name="grade" value={student.grade} onChange={handleChange}>
          {[1, 2, 3, 4].map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
