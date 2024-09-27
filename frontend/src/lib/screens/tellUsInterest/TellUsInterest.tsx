import React from 'react';
import { useNavigate } from 'react-router-dom';
import TellUsInterestSection from '../../sections/tellUsInterest/TellUsInterest';
import styles from './styles.scss';

const TellUsInterest = () => {
  const navigate = useNavigate();

  
  return (
    <div className={styles.container}>
      <div
        className={styles.back}
        onClick={() => navigate('/onboarding/profile')}
      >
        <img src='assets/back.svg' />
      </div>
      <div className={styles.title}>Tell Us Your Interests</div>
      <div className={styles.divider} />
      <TellUsInterestSection />
    </div>
  );
};

export default TellUsInterest;
