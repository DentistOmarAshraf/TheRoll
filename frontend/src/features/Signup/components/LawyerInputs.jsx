import styles from "./Inputs.module.css";
import { useSignUp } from "../context/SignUpContext";
import { useState } from "react";
import Button from "../../../component/Button";

export default function LawyerInputs({ className = "", ...rest }) {
  const { lawyer, setLawyer } = useSignUp();
  const [passVisibility, setPassVisibility] = useState(true);
  const classes = className
    .split(" ")
    .map((c) => styles[c] || "")
    .join(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(lawyer);
    setLawyer((prev) => ({ ...lawyer, [name]: value }));
  };

  const handlePassVisibility = (e) => {
    setPassVisibility((prev) => !prev);
  };
  return (
    <div className={`${styles.input_container} ${classes}`}>
      <label>
        الاسم
        <input
          name="fullName"
          value={lawyer.fullName}
          onChange={handleChange}
        />
      </label>
      <label>
        البريد الالكتروني
        <input name="email" value={lawyer.email} onChange={handleChange} />
      </label>
      <label>
        كلمه المرور
        <div>
          <input
            name="password"
            value={lawyer.password}
            onChange={handleChange}
            type={passVisibility ? "password" : "text"}
          />
        </div>
      </label>
      <label>
        تأكيد كلمه المرور
        <div>
          <input
            name="confirmPass"
            value={lawyer.confirmPass}
            onChange={handleChange}
            type={passVisibility ? "password" : "text"}
          />
          <i
            class={`far fa-eye ${passVisibility && "fa-eye-slash"}`}
            id="togglePassword"
            onClick={handlePassVisibility}
          ></i>
        </div>
      </label>
      <label>
        موبايل
        <div>
          <input name="phone" value={lawyer.phone} onChange={handleChange} />
          <select>
            <option value="+2" selected>2+</option>
          </select>
        </div>
      </label>
      <label>
        مدينه
        <input name="city" value={lawyer.city} onChange={handleChange} />
      </label>
      <label>
        حي / قسم
        <input
          name="neighborhood"
          value={lawyer.neighborhood}
          onChange={handleChange}
        />
      </label>
      <label>
        رقم كارنيه النقابه
        <input
          name="syndicateId"
          value={lawyer.syndicateId}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
