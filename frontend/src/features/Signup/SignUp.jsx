import Button from "../../component/Button";
import style from "./SignUp.module.css";
import React, { useEffect, Suspense, useState } from "react";
import SignUpContextProvider from "./context/SignUpContext";
import { GraduationCap, Scale } from "lucide-react";
import FallBack from "../../component/FallBack/FallBack";

const LawyerInputs = React.lazy(() => import("./components/LawyerInputs"));
const StudentInputs = React.lazy(() => import("./components/StudentInputs"));

export default function SignUp() {
  const [type, setType] = useState("");
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    let t;
    if (type) {
      setDelayed(false); // reset when type changes
      t = setTimeout(() => setDelayed(true), 600); // wait 600ms then allow render
    } else {
      setDelayed(false);
    }
    return () => clearTimeout(t);
  }, [type]);

  return (
    <SignUpContextProvider>
      <div className={style.container}>
        {type && !delayed && <FallBack />}

        {type && delayed && (
          <Suspense fallback={<FallBack />}>
            {type === "Lawyer" ? <LawyerInputs /> : <StudentInputs />}
            <Button
              className={`sign_up__button--back ${type ? "" : "hidden"}`}
              onClick={() => setType("")}
            >
              الرجوع
            </Button>
          </Suspense>
        )}
        {!type && (
          <div className={style.sign_up_choise}>
            <Button
              className={`sign_up__button--lawyer`}
              onClick={() => setType("Lawyer")}
            >
              <Scale className={style.button_icon} strokeWidth={1} />
              محامي
            </Button>
            <Button
              className={`sign_up__button--student`}
              onClick={() => setType("Student")}
            >
              <GraduationCap className={style.button_icon} strokeWidth={1} />
              طالب
            </Button>
          </div>
        )}
      </div>
    </SignUpContextProvider>
  );
}
