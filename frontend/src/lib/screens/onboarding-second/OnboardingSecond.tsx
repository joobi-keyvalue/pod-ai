import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import Button from '../../components/button/Button';

const OnBoardingSecond = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src="assets/logo.svg" className={styles.logo} />
      <img src="assets/onboarding-second.svg" className={styles.second} />
      <div className={styles.bottom}>
      <div className={styles.text}>
        <div className={styles.title}>News, Insights, and Stories. Just for You.</div>
        <div className={styles.subTitle}>Customize your podcast length, tone, and style. Stay informed on the go.</div>
      </div>
      <Button text='Get Started' onClick={() => {
        navigate('/onboarding/signup')
      }} />
      </div>
    </div>
  )
}

export default OnBoardingSecond;