import React from "react";
import ReactDOM from "react-dom/client";
import TemplateCreationPage from "./features/TemplateCreation/TemplateCreationPage";
import App from "./App";
import Authentication from "./features/Authentication";
import Test from "./Test";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authentication />
    {/* <Test /> */}
  </React.StrictMode>
);
