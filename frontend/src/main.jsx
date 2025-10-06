import React from "react";
import ReactDOM from "react-dom/client";
import TemplateCreationPage from "./features/TemplateCreation/TemplateCreationPage";
import Testing from "./Testing";
import TemplateViewer from "./component/TemplateViewer/TemplateViewer";
import TemplateTestingCompTemp from "./component/TemplateViewer/TemplateTestingCompTemp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <TemplateTestingCompTemp />
  </React.StrictMode>
);
