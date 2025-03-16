import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import App from "./App.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Users from "./components/Dashboard/Users.jsx";
import Earnings from "./components/Dashboard/Earnings.jsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "/",
            Component: Dashboard,
          },
          {
            path: "/users",
            Component: Users,
          },
          {
            path: "/earnings",
            Component: Earnings,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
