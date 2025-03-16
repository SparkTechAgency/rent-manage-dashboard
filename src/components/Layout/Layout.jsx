import { DashboardLayout } from "@toolpad/core";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </div>
  );
}
