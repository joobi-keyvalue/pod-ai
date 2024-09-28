import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.scss";
import TextInput from "../../components/textInput/TextInput";
import Button from "../../components/button/Button";
import BottomCallout from "../../components/bottom-callout/BottomCallout";
import PhoneInput from "../../components/phone-input/PhoneInput";
import { useCreateUserMutation } from "../../../api/onBoardingAPI";
import { REDDIT } from './constants';

const ProfileSetupSection: FC<{ buttonText?: string; goTo?: string }> = ({
  buttonText = "Continue",
  goTo = "/onboarding/interest",
}) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [reddit, setReddit] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [createUser, { isSuccess, data }] = useCreateUserMutation();
  const { state } = useLocation();
  const { phoneNumber = "1234567890", userDetails = {} } = state || {};

  useEffect(() => {
    if (data) {
      localStorage.setItem("userID", data.data.id);
      localStorage.setItem("userName", data.data.name);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      navigate(goTo, { state: { userDetails: { ...userDetails}, phoneNumber }});
    }
  }, [isSuccess]);
  
  const handleCreateUser = () => {
    createUser({
      name: name,
      phone_number: phoneNumber,
    });
  };
  return (
    <>
      <div className={`${styles.image} ${open && styles.imageOpen}`}>
        {!image && (
          <div>
            <img
              className={styles.placeholder}
              src="assets/profile-placeholder.svg"
            />
            <input type="file" />
          </div>
        )}
        <img src="assets/add-image.svg" className={styles.addImage} />
      </div>
      <div className={`${styles.name} ${open && styles.nameOpen}`}>
        <TextInput
          placeholder="What should we call you?"
          onClick={() => setOpen(!open)}
          onChange={setName}
        />
      </div>
      <div className={styles.accounts}>
        <div className={styles.accountsTitle}>Connect Your Accounts:</div>
        <div className={styles.accountSection}>
          <img src={`assets/twitter${twitter && '-filled' || ''}.svg`} onClick={() => setTwitter(true)} />
          <img src={`assets/reddit${reddit && '-filled' || ''}.svg`} onClick={() => {
            setReddit(true);
            window.open(REDDIT, '_blank');
          }} />
          <img src="assets/linkedin.svg" />
        </div>
      </div>
      <div className={`${styles.bottomButton} ${open && styles.open}`}>
        <Button
          text={buttonText}
          disabled={name?.length === 0}
          onClick={handleCreateUser}
        />
      </div>
      <BottomCallout open={open}>
        <PhoneInput />
      </BottomCallout>
    </>
  );
};

export default ProfileSetupSection;
