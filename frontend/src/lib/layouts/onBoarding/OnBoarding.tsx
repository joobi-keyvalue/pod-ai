import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.scss';

const OnBoarding = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  )  
}

export default OnBoarding;