import styles from './YoutubeVideo.module.css';
import { useState, useEffect } from 'react';
import Loader from '@components/Loader';

export default function YoutubeVideo({ videoId }: Props) {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [videoId]);

  return (
    <div className={styles.wrapper}>
      <Loader loaded={loaded}>
        <iframe className={styles.video}
          width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`}
          title={`VCB Youtube Video`}
          frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setLoaded(true)}></iframe>
      </Loader>
    </div>
  );
}

interface Props {
  videoId: string;
}
