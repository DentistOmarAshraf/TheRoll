import { createContext, useContext, useState } from "react";

const SignUpContext = createContext();

export default function SignUpContextProvider({ children }) {
  const [lawyer, setLawyer] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
    city: "",
    neighborhood: "",
    syndicateId: "",
  });

  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
    city: "",
    neighborhood: "",
    university: "",
    grade: "",
  });
  return (
    <SignUpContext.Provider
      value={{
        lawyer,
        student,
        setLawyer,
        setStudent,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export const useSignUp = () => useContext(SignUpContext);
