import { createBrowserRouter, Outlet } from "react-router-dom";
import OfficeLayout from "../layouts/Office/OfficeLayout";
import Authentication from "../features/Authentication";
import RollCalendar from "../component/Calender/RollCalendar";

const Router = createBrowserRouter([
  {
    path: "/office",
    element: <OfficeLayout />,
    children: [
      {
        path: "",
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
            <Authentication />
          </div>
        ),
      },
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
