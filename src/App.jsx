import { AppProvider } from "@toolpad/core";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { EuroSymbol, Segment } from "@mui/icons-material";

const menuItems = [
  {
    kind: "header",
    title: "Main Items",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "users",
    title: "Users",
    icon: <PersonIcon />,
  },
  {
    segment: "earnings",
    title: "Earnings",
    icon: <EuroSymbol />,
  },
];

export default function App() {
  return (
    <AppProvider navigation={menuItems}>
      <Outlet />
    </AppProvider>
  );
}
