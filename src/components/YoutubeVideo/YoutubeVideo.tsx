import styles from './YoutubeVideo.module.css';
import { useState, useEffect } from 'react';

export default function YoutubeVideo({ videoId }: Props) {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [videoId]);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.loaderWrapper} ${loaded ? 'd-none' : ''}`}>
        <div className={styles.loader}></div>
      </div>
      <iframe className={`${styles.iframe} ${loaded ? 'loaded' : 'loading'}`}
        width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`}
        title={`VCB Youtube Video`}
        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoaded(true)}></iframe>
    </div>
  );
}

interface Props {
  videoId: string;
}
