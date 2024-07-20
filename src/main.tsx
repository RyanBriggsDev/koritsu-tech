import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./roots/Root.tsx";

import Nav from "./components/layout/Nav.tsx";
import "./index.css";

// Pages
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Account from "./pages/Account.tsx";
import Support from "./pages/Support.tsx";
import Services from "./pages/Services.tsx";
import Pricing from "./pages/Pricing.tsx";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404</div>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>404</div>,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <div>404</div>,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <div>404</div>,
  },
  {
    path: "/account",
    element: <Account />,
    errorElement: <div>404</div>,
  },
  {
    path: "/support",
    element: <Support />,
    errorElement: <div>404</div>,
  },
  {
    path: "/services",
    element: <Services />,
    errorElement: <div>404</div>,
  },
  {
    path: "/pricing",
    element: <Pricing />,
    errorElement: <div>404</div>,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];

const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    element: (
      <>
        <Nav />
        {route.element}
      </>
    ),
  }))
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
