import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";

import Dashboard from "../Dashboard/Dashboard";
// import AllUsers from "../Dashboard/Users/Users";

import Profile from "../../Pages/Profile/Profile";
import EditProfile from "../../Pages/Profile/EditProfile";

import SignIn from "../../Pages/Auth/SignIn";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";
import OtpPage from "../../Pages/Auth/OtpPage";
import Logout from "../Dashboard/Logout";

import AboutUs from "../Dashboard/AboutUs";

import Notifications from "../Dashboard/Notifications";
import TermsAndConditions from "../Dashboard/Terms&Conditions";
import Announcement from "../Dashboard/Announcement";
import ChangePassword from "../Dashboard/ChangePassword";
import PrivacyPolicy from "../Dashboard/PrivacyPolicy";
import Properties from "../Dashboard/Properties";
import Landlord from "../Dashboard/Users/Landlord";
import Tenant from "../Dashboard/Users/Tenant";

//

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "/reset-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "/landlord",
            element: <Landlord />,
          },
          {
            path: "/tenant",
            element: <Tenant />,
          },
          // {
          //   path: "",
          //   element: <AllUsers />,
          //   children: [],
          // },

          {
            path: "announcement",
            element: <Announcement />,
          },
          {
            path: "properties",
            element: <Properties />,
          },
          {
            path: "terms-and-condition",
            element: <TermsAndConditions />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "about-us",
            element: <AboutUs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "profile/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
