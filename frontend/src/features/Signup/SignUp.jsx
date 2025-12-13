import SignUpDecision from "./components/SignUpDecision";
import SignUpContextProvider from "./context/SignUpContext";

export default function SignUp() {
  return (
    <SignUpContextProvider>
      <SignUpDecision />
    </SignUpContextProvider>
  );
}
