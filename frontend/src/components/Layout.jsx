// Layout.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full w-full flex">
      <Sidebar key="sidebar" className="w-64" />
      <div className="ml-0 md:ml-64 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
