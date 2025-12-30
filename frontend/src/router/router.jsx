import { createBrowserRouter, Outlet } from "react-router-dom";
import OfficeLayout from "../layouts/Office/OfficeLayout";
import Authentication from "../features/Authentication";
import ConfirmEmail from "../features/Authentication/ConfirmEmail";
import RollCalendar from "../component/Calender/RollCalendar";
import AuthLayout from "../layouts/Auth/AuthLayout";

const Router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "", element: <Authentication /> },
      { path: "confirm/:token?", element: <ConfirmEmail /> },
    ],
  },
  {
    path: "/office",
    element: <OfficeLayout />,
    children: [
      {
        path: "calendar",
        element: (
          <div
            style={{
              background: "#F7F9FC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gridArea: "main",
            }}
          >
            <RollCalendar />
          </div>
        ),
      },
    ],
  },
]);

export default Router;
