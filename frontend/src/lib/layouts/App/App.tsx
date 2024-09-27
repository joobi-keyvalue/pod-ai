import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles.scss";
import Sidebar from "../../components/sidebar/Sidebar";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
        className={styles.hamburger}
          src="assets/hamburger.svg"
          onClick={toggleSidebar}
        />
        <img className={styles.logo} src="assets/app-logo.svg" />
      </div>
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      <Outlet />
    </div>
  );
};

export default AppLayout;
