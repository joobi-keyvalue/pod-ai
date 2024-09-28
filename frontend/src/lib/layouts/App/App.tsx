import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import SmallPlayer from '../../components/small-player/SmallPlayer';
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from 'react-redux';
import { PodState } from 'types';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const { audio } = useSelector((state: { pod: PodState}) => state?.pod) || {}
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const isInvisible = () => 
    pathname.indexOf('/app/player') > -1
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
        className={styles.hamburger}
          src="assets/hamburger.svg"
          onClick={toggleSidebar}
        />
        <img className={styles.logo} src="assets/app-logo.svg"  onClick={() => {
          navigate('/app');
          toggleSidebar();
        }}/>
      </div>
      <Sidebar toggleSidebar={toggleSidebar} open={isSidebarOpen} />
      <Outlet />
      {audio && <SmallPlayer title="Bears, MMA & Global Warming." audio={audio} muted={isInvisible()} />}
    </div>
  );
};

export default AppLayout;
