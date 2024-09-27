import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.scss';
import TextInput from '../../components/textInput/TextInput';
import INTEREST_OPTIONS from './interest';
import InterestBadge from '../../components/interest-badge/InterestBadge';
import Button from '../../components/button/Button';
import BottomCallout from '../../components/bottom-callout/BottomCallout';
import PhoneInput from '../../components/phone-input/PhoneInput';
import { useAddTopicMutation, useGetTopicsQuery } from '../../../api/onBoardingAPI';

const TellUsInterestSection: FC<{ buttonText?: string, goTo?: string}>  = ( { buttonText= 'Continue', goTo = '/onboarding/customize'}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<String[]>([]);
  const [optionsToShow, setOptionsToShow] = useState([]);
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem('userID');


  const { data } = useGetTopicsQuery('');
  const [addTopic, { isSuccess }] = useAddTopicMutation();

  useEffect(() => {
    if (search) {
      const searchOptions = data?.data?.filter((e:{ name: string}) => (e.name).toLowerCase().indexOf(search.toLowerCase()) > -1);
      setOptionsToShow(searchOptions || [])
    } else {
      setOptionsToShow(data?.data || [])
    }
  }, [search, data]);

  useEffect(() => {
    if (isSuccess) {
      navigate(goTo);
    }
  }, [isSuccess]);

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
  
  const onContinueClick = () => {
    addTopic({ userId , topic_ids: [...options].map((e) => e.toString())})
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
        {optionsToShow?.length > 0 && (optionsToShow?.map((option: {id: string, name: string}, index: number) => (
          <InterestBadge image={`assets/interests/${INTEREST_OPTIONS[index]}.svg`} text={option.name} onSelect={() =>{onOptionSelect(option.id)}} selected={options.indexOf(option.id) > -1} />
        ))) || (
          <div>Oops...</div>
        )}
      </div>
      <div className={`${styles.bottomButton} ${open && styles.open}`}>
        <Button text={buttonText} disabled={options?.length === 0 && prompt.length === 0} onClick={onContinueClick} />
      </div>
      <BottomCallout open={open}>
        <PhoneInput />
      </BottomCallout>
    </>
  );
};

export default TellUsInterestSection;
