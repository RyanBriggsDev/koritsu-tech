import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./roots/Root.tsx";

import App from "./App.tsx";
import Contact from "./pages/Contact.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404</div>,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
