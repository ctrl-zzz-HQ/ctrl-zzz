import styles from './Page.module.css';
import missions from '@data/missions';
import { useMemo } from 'react';
import YoutubeVideo from '@components/YoutubeVideo';
import ScrollToTopContainer from '@/components/ScrollToTopContainer';

export default function Mission({ index }: Props) {

  const mission = useMemo(() => missions[index], [index]);

  return (
    <>
      <h2>
        MISSION {mission.code}
      </h2>
      <ScrollToTopContainer>
        {mission.videoId && <div className="section">
          <YoutubeVideo videoId={mission.videoId} />
        </div>}
        <div className="section">
          <h3>&gt; Brief</h3>
          <p>{mission.brief}</p>
        </div>
      </ScrollToTopContainer>
      <div className={styles.footer}>
        <p className="secondary-text">[status: {mission.status}]</p>
      </div>
    </>
  );
}

interface Props {
  index: number;
}
