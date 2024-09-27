import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './styles.scss';
import Caption from '../../components/caption/Caption';
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useGetPodcastSourcesQuery } from '../../../api/appAPI';

const Transcript: FC<{ stop: boolean, closeTranscript: () => void, transcript?: string}> = ({ stop, closeTranscript, transcript = ''}) => {
  const [displayText, setDisplayText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id} = useParams();
  const { data } = useGetPodcastSourcesQuery({id});
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const ref= useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    let interval: any;
    if (!stop) {
      interval = setInterval(() => {
      setDisplayText((val) => transcript.slice(0, val.length + 1));
    }, 50)
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
        {data?.data?.map((e: string) => (
          <div className={styles.eachSource} onClick={() => window.open(e, '_blank')}>
          <img src="assets/link.svg" />
          <div className={styles.text} title={e}>{e}</div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Transcript;
