import styles from './Page.module.css';
import missions from '@data/missions';
import { useMemo, useState, useEffect } from 'react';

export default function Mission({ index }: Props) {

  const mission = useMemo(() => missions[index], [index]);
  const [loadedIframe, setLoadedIframe] = useState(false);

  useEffect(() => {
    setLoadedIframe(false);
  }, [mission]);

  return (
    <>
      <h2>
        MISSION {mission.code}
      </h2>
      <div className={styles.scrollBody}>
        <div className="section">
          <div className="w-100">
            <iframe className={loadedIframe ? 'loaded' : 'loading'}
              width="560" height="315" src={mission.url}
              title={`VCB Round ${index} video`}
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setLoadedIframe(true)}></iframe>
          </div>
        </div>
        <div className="section">
          <h3>&gt; Brief</h3>
          <p>{mission.brief}</p>
        </div>
      </div>
      <div className={styles.footer}>
        <p className="secondary-text">[status: {mission.status}]</p>
      </div>
    </>
  );
}

interface Props {
  index: number;
}
