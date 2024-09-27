import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import TextInput from '../../components/textInput/TextInput';
import Button from '../../components/button/Button';
import BottomCallout from '../../components/bottom-callout/BottomCallout';
import PhoneInput from '../../components/phone-input/PhoneInput';

const ProfileSetupSection :FC<{ buttonText?: string}> = ({ buttonText = 'Continue'}) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
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
      <div className={styles.accounts}>
        <div className={styles.accountsTitle}>Connect Your Accounts:</div>
        <div className={styles.accountSection}>
          <img src="assets/twitter.svg" />
          <img src="assets/reddit.svg" />
          <img src="assets/linkedin.svg" />
        </div>
      </div>
      <div className={`${styles.bottomButton} ${open && styles.open}`}>
        <Button text={buttonText} disabled={name?.length === 0} onClick={() => navigate('/onboarding/interest')} />
      </div>
      <BottomCallout open={open}>
        <PhoneInput />
      </BottomCallout>
    </>
  );
};

export default ProfileSetupSection;
