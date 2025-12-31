import { createBrowserRouter, Outlet } from "react-router-dom";
import ScrollToTop from "../component/ScrollToTop/ScrollToTop";
import OfficeLayout from "../layouts/Office/OfficeLayout";
import Authentication from "../features/Authentication";
import ConfirmEmail from "../features/Authentication/ConfirmEmail";
import RollCalendar from "../component/Calender/RollCalendar";
import AuthLayout from "../layouts/Auth/AuthLayout";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <ScrollToTop />,
    children: [
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "", element: <Authentication /> },
          { path: "confirm/:token?", element: <ConfirmEmail /> },
        ],
      },
      {
        path: "office",
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
    ],
  },
]);

export default Router;



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />, // Level 1: Always scrolls to top
//     children: [
//       // --- Public Routes ---
//       { path: "login", element: <LoginPage /> },
//       { path: "signup", element: <SignupPage /> },

//       // --- Protected Routes ---
//       {
//         element: <AuthGuard />, // Level 2: Only allows entry if token exists
//         children: [
//           { path: "dashboard", element: <Dashboard /> },
//           { path: "profile", element: <ProfilePage /> },
//           { path: "universities", element: <UniversityList /> },
//         ],
//       },
//     ],
//   },
// ]);