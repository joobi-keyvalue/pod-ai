import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './styles.scss';
import SmallPlayer from '../../components/small-player/SmallPlayer';
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
      {/* <SmallPlayer title="Bears, MMA & Global Warming." /> */}
    </div>
  );
};

export default AppLayout;
