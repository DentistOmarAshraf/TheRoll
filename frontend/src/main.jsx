import React from "react";
import ReactDOM from "react-dom/client";
import TemplateCreationPage from "./features/TemplateCreation/TemplateCreationPage";
import App from "./App";
import Authentication from "./features/Authentication";
import Test from "./Test";
import Header from "./component/Header";
import "./index.css";
import SideBar from "./component/SideBar";
import InfoHeader from "./component/InfoHeader.jsx/InfoHeader";
import UIContext from "./context/UIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UIContext>
      <InfoHeader />
      <SideBar />
    </UIContext>
    <Header />
    <div
      style={{
        gridArea: "main",
        background: "#F7F9FC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Authentication />
      {/* <Test /> */}
    </div>
  </React.StrictMode>
);
