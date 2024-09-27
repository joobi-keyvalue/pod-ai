import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './styles.scss';
import Caption from '../../components/caption/Caption';
import dummyText from './dummy';
import Sidebar from '../../components/sidebar/Sidebar';

const Transcript: FC<{ stop: boolean, closeTranscript: () => void}> = ({ stop, closeTranscript}) => {
  const [displayText, setDisplayText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const ref= useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    let interval: any;
    if (!stop) {
      interval = setInterval(() => {
      setDisplayText((val) => dummyText.slice(0, val.length + 1));
    }, 100)
  }
    return () => {
      clearInterval(interval)
    }
  }, [stop])

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [displayText])
  return (
    <div className={styles.container}>
       <div className={styles.header}>
        <img src='assets/back.svg' onClick={closeTranscript} />
        <img className={styles.logo} src="assets/app-logo.svg" />
      </div>
      <Sidebar toggleSidebar={toggleSidebar} open={isSidebarOpen} />
      <div className={styles.caption}>
        <Caption content='Transcript' />
      </div>
      <div className={styles.transcriptSection} ref={ref}>
        {displayText};
      </div>
      <div className={styles.sources}>
        <Caption content='Sources' />
      </div>
      <div className={styles.sourceList}>
        <div className={styles.eachSource}>
          <img src="assets/link.svg" />
          <div className={styles.text}>bearsworld.mv/article1...</div>
        </div>
        <div className={styles.eachSource}>
          <img src="assets/link.svg" />
          <div className={styles.text}>bearsworld.mv/article1...</div>
        </div>
      </div>
    </div>
  )
}

export default Transcript;
