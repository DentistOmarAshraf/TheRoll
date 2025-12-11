import Button from "../../component/Button";
import style from "./SignUp.module.css";
import { useState } from "react";
import SignUpContextProvider from "./context/SignUpContext";
import LawyerInputs from "./components/LawyerInputs";

export default function SignUp() {
  const [type, setType] = useState("");
  

  return (
    <SignUpContextProvider>
      <div className={style.container}>
        <LawyerInputs />
        <h1>&nbsp;{type}</h1>
        <Button onClick={() => setType("Student")}>طالب</Button>
        <Button onClick={() => setType("Lawyer")}>محامي</Button>
      </div>
    </SignUpContextProvider>
  );
}
