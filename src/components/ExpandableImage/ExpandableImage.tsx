import styles from './ExpandableImage.module.css';
import { useState, useCallback } from 'react';
import { JsonImage } from '@types';
import { useKeyDown, useSwipe } from '@/hooks';
import Loader from '@components/Loader';

const lqPath = '/art/LQ/';
const hqPath = '/art/HQ/';

export default function ExpandableImage({ image }: Props) {

  const [expanded, setExpanded] = useState(false);
  const [loadedSmall, setLoadedSmall] = useState(false);
  const [loadedBig, setLoadedBig] = useState(false);

  const open = useCallback(() => setExpanded(true), []);
  const close = useCallback(() => {
    setExpanded(false);
    setLoadedBig(false);
  }, []);

  const swipeHandlers = useSwipe(useCallback((_swipeDir, e) => {
    close();
    e.stopPropagation(); // Prevent swipe from bubbling and causing a navigation
  }, [close]));

  useKeyDown(useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
  }, [close]));

  return (
    <>
      <button className={styles.imageButton} onClick={open}>
        <img className={`${loadedSmall ? 'loaded' : 'loading'} w-100 h-100`}
          width={image.dimensions.width}
          height={image.dimensions.height}
          src={lqPath + image.path}
          alt="Small"
          onLoad={() => setLoadedSmall(true)} />
      </button>
      {expanded && <div className={`${styles.dialog} primary`} {...swipeHandlers}>
        <div className={styles.imageContainer}>
          <Loader loaded={loadedBig}>
            <img width={image.dimensions.width}
              height={image.dimensions.height}
              src={hqPath + image.path}
              alt="Large"
              onLoad={() => setLoadedBig(true)} />
          </Loader>
        </div>
        {image.credits.map((credit, index) =>
          <p className={styles.credit} key={index}>
            {credit[0]}: <span dangerouslySetInnerHTML={{__html: credit[1]}}></span>
          </p>)}
        <button className={styles.closeButton} onClick={close}>x</button>
      </div>}
    </>
  );
}

interface Props {
  image: JsonImage;
}
