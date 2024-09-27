import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSetupSection from '../../sections/profile/Profile';
import styles from './styles.scss';

const ProfileSetup = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={() => navigate('/onboarding/otp')}>
        <img src='assets/back.svg' />
      </div>
      <div className={styles.title}>Set Up Your Profile</div>
      <div className={styles.divider} />
      <ProfileSetupSection />
    </div>
  );
};

export default ProfileSetup;
