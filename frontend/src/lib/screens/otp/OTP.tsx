import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextInput from '../../components/textInput/TextInput';
import styles from './styles.scss';
import Button from '../../components/button/Button';
import BottomCallout from '../../components/bottom-callout/BottomCallout';
import PhoneInput from '../../components/phone-input/PhoneInput';

const OTP = () => {
  const [open, setOpen] = useState(false);
  const [otp, setOTP] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const { phoneNumber = '123456789' } = state || {};
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <img src='assets/back.svg' />
      </div>
      <div className={styles.title}>Enter OTP</div>
      <div className={styles.divider} />
      <div className={styles.info}>
      We have sent a code to your 
      phone <span>{phoneNumber.slice(0, 2)}</span>****<span>{phoneNumber.slice(5,9)}</span>.
      </div>
      <div className={styles.text}>
        <TextInput placeholder='Enter your code here' onClick={() => setOpen(!open)} onChange={setOTP} />
      </div>
      <i className={styles.noOTP}>Didn’t Receive OTP?</i>

      <div className={`${styles.bottomButton} ${open && styles.open}`}>
        <Button text='Verify' disabled={otp?.length !== 3} onClick={() => navigate('/onboarding/profile')} />
      </div>
      <BottomCallout open={open}>
        <PhoneInput />
      </BottomCallout>
    </div>
  )
}

export default OTP;