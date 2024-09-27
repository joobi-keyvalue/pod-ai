import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import Button from '../../components/button/Button';

const OnBoardingFirst = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
        <img src="assets/logo.svg" className={styles.logo} />
      <img src="assets/onboarding-first.svg" className={styles.first} />
      <div className={styles.text}>
        <div className={styles.title}>Your Morning, Your Podcast, Your Way!</div>
        <div className={styles.subTitle}>Personalized AI-generated podcasts delivered daily, tailored to your interests.</div>
      </div>
      <Button text='Next' onClick={() => {
        navigate('/onboarding/second')
      }} />
    </div>
  )
}

export default OnBoardingFirst;