import React from "react";
import ReactDOM from "react-dom/client";
import TemplateCreationPage from "./features/TemplateCreation/TemplateCreationPage";
import App from "./App";
import SignUp from "./features/Signup";
import Select from "react-select";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SignUp />
    {/* <Select options={[{ value: "+2", label: "2+" }]} /> */}
  </React.StrictMode>
);
