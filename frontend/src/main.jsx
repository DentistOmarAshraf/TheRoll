import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import Alert from "./component/Alert/Alert";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Alert />
      <RouterProvider router={Router} />
    </AuthContextProvider>
  </React.StrictMode>
);
