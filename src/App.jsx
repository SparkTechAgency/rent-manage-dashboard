import { AppProvider } from "@toolpad/core";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CampaignIcon from "@mui/icons-material/Campaign";
import SecurityIcon from "@mui/icons-material/Security";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Groups3Icon from "@mui/icons-material/Groups3";
import SyncLockIcon from "@mui/icons-material/SyncLock";

const menuItems = [
  // {
  //   kind: "header",
  //   title: "Main Items",
  // },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "properties",
    title: "Properties",
    icon: <AssuredWorkloadIcon />,
  },
  {
    segment: "users",
    title: "Users",
    icon: <PersonIcon />,
    children: [
      {
        segment: "landlord",
        title: "Landlord",
        icon: <PersonPinIcon />,
      },
      {
        segment: "tenant",
        title: "Tenant",
        icon: <PersonSearchIcon />,
      },
    ],
  },
  {
    segment: "announcement",
    title: "Announcement",
    icon: <CampaignIcon />,
  },
  {
    segment: "terms-and-condition",
    title: "Terms and Condition",
    icon: <NoteAltIcon />,
  },
  {
    segment: "privacy-policy",
    title: "Privacy Policy",
    icon: <SecurityIcon />,
  },
  {
    segment: "about-us",
    title: "About Us",
    icon: <Groups3Icon />,
  },
  {
    segment: "change-password",
    title: "Change Password",
    icon: <SyncLockIcon />,
  },
];

export default function App() {
  return (
    <AppProvider navigation={menuItems}>
      <Outlet />
    </AppProvider>
  );
}
