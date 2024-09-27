import React from 'react';
import classes from './styles.scss';
import PhoneInput from '../components/phone-input/PhoneInput';
import Button from '../components/button/Button';
const HomePage = () => (
  <div className={classes.heading}>
    <PhoneInput />
    <Button text="Continue" />
  </div>
);

export default HomePage;