import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import TextInput from '../../components/textInput/TextInput';
import Button from '../../components/button/Button';
import BottomCallout from '../../components/bottom-callout/BottomCallout';
import PhoneInput from '../../components/phone-input/PhoneInput';

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
      <div className={`${styles.image} ${open && styles.imageOpen}`}>
        {!image && (
          <div>
            <img
              className={styles.placeholder}
              src='assets/profile-placeholder.svg'
            />
            <input type='file' />
          </div>
        )}
        <img src='assets/add-image.svg' className={styles.addImage} />
      </div>
      <div className={`${styles.name} ${open && styles.nameOpen}`}>
        <TextInput
          placeholder='What should we call you?'
          onClick={() => setOpen(!open)}
          onChange={setName}
        />
      </div>
      <div className={`${styles.bottomButton} ${open && styles.open}`}>
        <Button text='Continue' disabled={name?.length === 0} />
      </div>
      <BottomCallout open={open}>
        <PhoneInput />
      </BottomCallout>
    </div>
  );
};

export default ProfileSetup;
