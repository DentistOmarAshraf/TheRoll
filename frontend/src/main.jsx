import React from "react";
import ReactDOM from "react-dom/client";
import TemplateCreationPage from "./features/TemplateCreation/TemplateCreationPage";
import App from "./App";
import SignUp from "./features/Signup";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SignUp />
  </React.StrictMode>
);
