import styles from "./Inputs.module.css";
import { useSignUp } from "../context/SignUpContext";
import { useState } from "react";
import Select from "react-select";

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
        <div className={styles.field_custom_container}>
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
        <input
          className={`${styles.phone_input}`}
          name="phone"
          value={student.phone}
          onChange={handleChange}
          type="tel"
        />
      </label>
      <label>
        <span className={styles.labelText}>المحافظه</span>
        <Select
          placeholder="اختر المحافظه"
          options={city.map((item) => ({ value: item.id, label: item.name }))}
          onChange={(opt) => {
            setStudent((prev) => ({ ...prev, city: opt.value }));
          }}
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? "#B0B3B7" : "#9ca1a8ff",
              "&:hover": {
                borderColor: "#B0B3B7",
              },
              boxShadow: state.isFocused ? "0 0 0 1px #B0B3B7" : base.boxShadow,
            }),
          }}
          className="input_select"
          classNamePrefix="input_select"
        />
      </label>
      <label>
        <span className={styles.labelText}>الحي</span>
        <Select
          placeholder="اختر الحي/القسم"
          options={neighborhood.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(opt) => {
            setStudent((prev) => ({ ...prev, city: opt.value }));
          }}
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? "#B0B3B7" : "#9ca1a8ff",
              "&:hover": {
                borderColor: "#B0B3B7",
              },
              boxShadow: state.isFocused ? "0 0 0 1px #B0B3B7" : base.boxShadow,
            }),
          }}
          className="input_select"
          classNamePrefix="input_select"
        />
      </label>
      <label>
        <span className={styles.labelText}>الجامعه</span>
        <Select
          placeholder="اختر الجامعه"
          options={university.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(opt) => {
            setStudent((prev) => ({ ...prev, city: opt.value }));
          }}
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? "#B0B3B7" : "#9ca1a8ff",
              "&:hover": {
                borderColor: "#B0B3B7",
              },
              boxShadow: state.isFocused ? "0 0 0 1px #B0B3B7" : base.boxShadow,
            }),
          }}
          className="input_select"
          classNamePrefix="input_select"
        />
      </label>
      <label>
        <span className={styles.labelText}>السنه</span>
        <Select
          placeholder="اختر العام الدراسي"
          options={[{ id: 1, name: "الأول" }].map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(opt) => {
            setStudent((prev) => ({ ...prev, city: opt.value }));
          }}
          styles={{
            control: (base, state) => ({
              ...base,
              borderColor: state.isFocused ? "#B0B3B7" : "#9ca1a8ff",
              "&:hover": {
                borderColor: "#B0B3B7",
              },
              boxShadow: state.isFocused ? "0 0 0 1px #B0B3B7" : base.boxShadow,
            }),
          }}
          className="input_select"
          classNamePrefix="input_select"
        />
      </label>
    </div>
  );
}
