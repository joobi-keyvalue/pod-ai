import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import TextInput from '../../components/textInput/TextInput';
import INTEREST_OPTIONS from './interest';
import InterestBadge from '../../components/interest-badge/InterestBadge';
import Button from '../../components/button/Button';
import BottomCallout from '../../components/bottom-callout/BottomCallout';
import PhoneInput from '../../components/phone-input/PhoneInput';

const TellUsInterestSection: FC<{ buttonText?: string}>  = ( { buttonText= 'Continue'}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<String[]>([]);
  const [optionsToShow, setOptionsToShow] = useState(INTEREST_OPTIONS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (search) {
      const searchOptions = INTEREST_OPTIONS.filter((e:string) => e.indexOf(search.toLowerCase()) > -1);
      setOptionsToShow(searchOptions || [])
    } else {
      setOptionsToShow(INTEREST_OPTIONS)
    }
  }, [search])
  const onOptionSelect = (optionVal: string) => {
    const currentOptions = [...options];
    const index = currentOptions.indexOf(optionVal)
    if (index > -1) {
      currentOptions.splice(index, 1);
    } else {
      currentOptions.push(optionVal)
    }
    setOptions(currentOptions);
  }
  
  return (
    <>
      <div className={styles.tellUs}>
        <TextInput
          height='62px'
          width='calc(100% - 58px)'
          onChange={setPrompt}
          type="textarea"
          padding="27px 29px"
          placeholder='Tell us about you and let the 
magic guide your mornings...'
        />
        <img src="assets/mic.svg" />
      </div>
      <div className={styles.or}>- OR -</div>
      <div className={styles.search}>
        <TextInput placeholder='Choose atleast 3 topics...' icon="assets/search.svg" padding='15px 24px' onChange={setSearch} onClick={() => setOpen(!open)} />
      </div>
      <div className={styles.options}>
        {optionsToShow?. length > 0 && (optionsToShow?.map((option: string) => (
          <InterestBadge image={`assets/interests/${option}.svg`} text={option} onSelect={() =>{onOptionSelect(option)}} selected={options.indexOf(option) > -1} />
        ))) || (
          <div>Oops...</div>
        )}
      </div>
      <div className={`${styles.bottomButton} ${open && styles.open}`}>
        <Button text={buttonText} disabled={options?.length === 0 && prompt.length === 0} onClick={() => navigate('/onboarding/customize')} />
      </div>
      <BottomCallout open={open}>
        <PhoneInput />
      </BottomCallout>
    </>
  );
};

export default TellUsInterestSection;
