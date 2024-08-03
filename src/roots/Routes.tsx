import React from "react";
import { RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/functional/ProtectedRoute";

const Home = React.lazy(() => import("../pages/Home"));
const Contact = React.lazy(() => import("../pages/Contact"));
const AccountLogin = React.lazy(() => import("../components/forms/Login"));
const Register = React.lazy(() => import("../components/forms/Register"));
const AccountProfile = React.lazy(
  () => import("../pages/account/AccountProfile")
);
const Support = React.lazy(() => import("../pages/Support"));
const Services = React.lazy(() => import("../pages/Services"));
const Pricing = React.lazy(() => import("../pages/Pricing"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <Contact /> },
      {
        path: "account/login",
        element: <AccountLogin />,
      },
      { path: "account/sign-up", element: <Register /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountProfile />
          </ProtectedRoute>
        ),
      },
      { path: "support", element: <Support /> },
      { path: "services", element: <Services /> },
      { path: "pricing", element: <Pricing /> },
    ],
  },
  { path: "*", element: <div>Not Found</div> },
];
