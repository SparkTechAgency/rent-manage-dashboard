import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Layout from "../Layout/Layout";
import Dashboard from "../Dashboard/Dashboard";
import Properties from "../Dashboard/Properties";
import Landlord from "../Dashboard/Landlord";
import Tenant from "../Dashboard/Tenant";
import Users from "../Dashboard/Users";
import Announcement from "../Dashboard/Announcement";
import TermsAndCondition from "../Dashboard/TermsAndCondition";
import PrivacyPolicy from "../Dashboard/PrivacyPolicy";
import AboutUs from "../Dashboard/AboutUs";
import ChangePassword from "../Dashboard/ChangePassword";

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
            path: "/properties",
            Component: Properties,
          },
          {
            path: "/users",
            // Component: Users,
            children: [
              {
                path: "/users/landlord",
                Component: Landlord,
              },
              {
                path: "/users/tenant",
                Component: Tenant,
              },
            ],
          },
          {
            path: "/users",
            Component: Users,
          },
          {
            path: "/announcement",
            Component: Announcement,
          },
          {
            path: "/terms-and-condition",
            Component: TermsAndCondition,
          },
          {
            path: "/privacy-policy",
            Component: PrivacyPolicy,
          },
          {
            path: "/about-us",
            Component: AboutUs,
          },
          {
            path: "/change-password",
            Component: ChangePassword,
          },
        ],
      },
    ],
  },
]);

export default router;
