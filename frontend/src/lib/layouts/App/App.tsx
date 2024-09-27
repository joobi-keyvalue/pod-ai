import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './styles.scss';

const AppLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.hamburger} src="assets/hamburger.svg" />
        <img className={styles.logo} src="assets/app-logo.svg" />
      </div>
      <Outlet />
    </div>
  )
}

export default AppLayout;