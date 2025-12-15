// import SignUpDecision from "./components/SignUpDecision";
// import SignUpContextProvider from "./context/SignUpContext";
import { useState } from "react";
import styles from "./Authentication.module.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

// <SignUpContextProvider>
//   <SignUpDecision />
// </SignUpContextProvider>

export default function Authentication() {
  const [tab, setTab] = useState("sign_in");

  const handleClick = (e) => {
    const active = e.currentTarget.dataset.tab;
    setTab(active);
  };

  return (
    <div className={styles.main_container}>
      <h1>Roll01</h1>
      <p>تسجيل الدخول الى لوحه التحكم</p>
      <div className={styles.signin_signup_nav}>
        <div
          data-tab="sign_in"
          className={tab === "sign_in" ? styles.active : ""}
          onClick={handleClick}
        >
          تسجيل الدخول
        </div>
        <div
          data-tab="sign_up"
          className={tab === "sign_up" ? styles.active : ""}
          onClick={handleClick}
        >
          إنشاء حساب جديد
        </div>
      </div>
      {tab === "sign_in" && <SignIn />}
      {tab === "sign_up" && <SignUp />}
    </div>
  );
}
