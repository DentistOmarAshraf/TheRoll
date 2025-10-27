import { createBrowserRouter, Outlet } from "react-router-dom";
import Admin from "../layout/AdminPanel/Admin";
import TemplateCreation from "../layout/TemplateCreation";

const Router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Admin />,
    children: [
      { path: "", element: <Admin />},
      { path: "template", element: <TemplateCreation /> },
    ],
  },
]);

export default Router;
