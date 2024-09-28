import React, { useState } from 'react';
import styles from './styles.scss';
import Caption from '../../components/caption/Caption';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const name = localStorage.getItem("userName");
  const [reddit, setReddit] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.caption}><Caption content='Your Profile' /></div>
      <div className={styles.interestSection}>
      <div className={`${styles.image}`}>
        
          <div>
            <img
              className={styles.placeholder}
              src='assets/profile.svg'
            />
            <input type='file' />
          </div>
        <img src='assets/add-image.svg' className={styles.addImage} />
      </div>
      <div className={`${styles.name}`}>
        {name}
      </div>
      <div className={styles.accounts}>
        <div className={styles.accountSection}>
          <img src={`assets/twitter${twitter && '-filled' || ''}.svg`} onClick={() => setTwitter(true)} />
          <img src={`assets/reddit${reddit && '-filled' || ''}.svg`} onClick={() => setReddit(true)} />
          <img src="assets/linkedin.svg" />
        </div>
      </div>
      <img src="assets/free_plan.svg" className={styles.freePlan} />
      <div className={`${styles.bottomButton}`}>
        <Button text="Save" onClick={() => navigate('/app')} />
      </div>
      </div>
    </div>
  )
}

export default Profile;
