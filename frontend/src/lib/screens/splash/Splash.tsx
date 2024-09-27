import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/onboarding/first');
    }, 3000)
  }, [])
  return (
    <div className={styles.container}>
      <img src="assets/splash.svg" />
    </div>
  )
};

export default Splash;