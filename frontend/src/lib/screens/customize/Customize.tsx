import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import CustomizeSection from '../../sections/customize/Customize';

const Customize = () => {
  const navigate = useNavigate();
  
  return (
    <div className={styles.container}>
      <div
        className={styles.back}
        onClick={() => navigate('/onboarding/profile')}
      >
        <img src='assets/back.svg' />
      </div>
      <div className={styles.title}>Customize Your Preferences</div>
      <div className={styles.divider} />
      <CustomizeSection />
    </div>
  );
};

export default Customize;
