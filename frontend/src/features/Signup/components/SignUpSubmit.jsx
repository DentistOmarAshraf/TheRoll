import Button from "../../../component/Button";
import { useSignUp } from "../context/SignUpContext";
import styles from "./SignUpSubmit.module.css";

export default function SignUpSubmit() {
  const { type, setType, lawyer, student } = useSignUp();

  const handleCancel = () => {setType("")}
  const handleSubmit = () => {
    const x = type === "Student" ? student : lawyer;
    console.log({...x, type})
  }

  return (
    <div className={styles.submit_contianer}>
      <Button onClick={handleCancel} className="sign_up__button--cancel">الرجوع</Button>
      <Button onClick={handleSubmit} className="sign_up__button--submit">تسجيل</Button>
    </div>
  );
}
