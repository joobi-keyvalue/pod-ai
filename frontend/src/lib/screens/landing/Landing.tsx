import React from 'react';
import { useNavigate } from 'react-router-dom';
import Caption from '../../components/caption/Caption';
import PlayerDisplay from '../../components/player-display/PlayerDisplay';
import PlayerSmallDisplay from '../../components/player-small-display/PlayerSmallDisplay';
import NothingHerePage from '../../sections/nothing-here/Nothing';

import styles from './styles.scss';
import { useDispatch } from 'react-redux';
import { removePodcast } from '../../../reducers/reducer';

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onPodcastClick = () => {
    dispatch(removePodcast());
    navigate('/app/player/:id')
  }
  return (
    <div className={styles.container}>
      <Caption content="Hi Sruthy" />
      <div className={styles.listen}>
        <div className={styles.listenNow}>
          <div className={styles.title}>Listen Now:</div>
          <div className={styles.divider} />
          <div className={styles.listenNowPlaylist} onClick={onPodcastClick}>
            <PlayerDisplay duration='30 min.' title='Bears, MMA & Global Warming.' image='assets/bear.svg' />
          </div>
        </div>
        <div className={styles.listenAgain}>
          <div className={styles.title}>Listen Again:</div>
          <div className={styles.divider} />
          <div className={styles.listenAgainPlaylist}>
            <PlayerSmallDisplay title="Goa, Covid & Heartbreak." date='19 Sep, 2024' duration="20 min"/>
            <PlayerSmallDisplay title="Golang, Elections & GOT." date='17 Sep, 2024' duration="25 min"/>
            <PlayerSmallDisplay title="Goa, Covid & Heartbreak." date='19 Sep, 2024' duration="20 min"/>
          </div>
        </div>
      </div>
      {/* <NothingHerePage /> */}
    </div>
  )
}

export default LandingPage;
