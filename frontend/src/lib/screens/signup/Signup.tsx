import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextInput from '../../components/textInput/TextInput';
import styles from './styles.scss';
import Button from '../../components/button/Button';
import BottomCallout from '../../components/bottom-callout/BottomCallout';
import PhoneInput from '../../components/phone-input/PhoneInput';

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={() => navigate('/onboarding/second')}>
        <img src='assets/back.svg' />
      </div>
      <div className={styles.title}>Sign Up/ Log In</div>
      <div className={styles.divider} />
      <div className={styles.textContainer}>
        <TextInput
          placeholder='Enter your phone number'
          type='number'
          onClick={() => {
            setOpen(!open);
          }}
          onChange={setPhoneNumber}
        />
      </div>
      <div className={styles.or}>- OR -</div>
      <div className={styles.iconGroups}>
        <img src='assets/google.svg' />
        <img src='assets/facebook.svg' />
      </div>
      <div className={styles.terms}>
        <i>
          By continuing you agree to our{' '}
          <span className={styles.underliner}>Term’s of use</span> and{' '}
          <span className={styles.underliner}>privacy policy.</span>
        </i>
      </div>
      <div className={`${styles.bottomButton} ${open && styles.open}`}>
        <Button text='Continue' disabled={phoneNumber?.length !== 10} onClick={() => navigate('/onboarding/otp', {
          state: {
            phoneNumber
          }
        })} />
      </div>
      <BottomCallout open={open}>
        <PhoneInput />
      </BottomCallout>
    </div>
  );
};

export default SignUp;
