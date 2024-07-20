import React from "react";
import { RouteObject } from "react-router-dom";
import App from "../App";

const Home = React.lazy(() => import("../pages/Home"));
const Contact = React.lazy(() => import("../pages/Contact"));
const Login = React.lazy(() => import("../pages/Login"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const Account = React.lazy(() => import("../pages/Account"));
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
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "account", element: <Account /> },
      { path: "support", element: <Support /> },
      { path: "services", element: <Services /> },
      { path: "pricing", element: <Pricing /> },
    ],
  },
  { path: "*", element: <div>Not Found</div> },
];
