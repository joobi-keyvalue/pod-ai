import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileSetupSection from '../../sections/profile/Profile';
import styles from './styles.scss';

const ProfileSetup = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={() => navigate('/onboarding/otp', { state })}>
        <img src='assets/back.svg' />
      </div>
      <div className={styles.title}>Set Up Your Profile</div>
      <div className={styles.divider} />
      <ProfileSetupSection />
    </div>
  );
};

export default ProfileSetup;
