import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import Alert from "./component/Alert/Alert";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Alert />
    <RouterProvider router={Router} />
  </React.StrictMode>
);
