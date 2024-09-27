import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import Slider from '../../components/slider/Slider';
import STEPS from './steps';
import Select from '../../components/select/Select';
import Options from '../../components/options/Options';
import Button from '../../components/button/Button';

const CustomizeSection = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className={styles.duration}>
        <div className={styles.sectionTitle}>Podcast length(mins):</div>
        <Slider min={1} max={61} step={15} steps={STEPS}  />
      </div>
      <div className={styles.tone}>
        <div className={styles.sectionTitle}>Tone:</div>
        <Select options={[{ value: 'Gen Z Colloquial', label: 'Gen Z Colloquial'}]} /> 
      </div>
      <div className={styles.tone}>
        <div className={styles.sectionTitle}>Style:</div>
        <Options optionValues={[{ value: 'Convo', label: 'Convo'}, { value: 'Dictate', label: 'Dictate'}]} />
      </div>
      <div className={`${styles.bottomButton}`}>
        <Button text='Continue' onClick={() => navigate('/onboarding/final')} />
      </div>
    </>
  );
};

export default CustomizeSection;
