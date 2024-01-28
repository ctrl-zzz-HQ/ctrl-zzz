import styles from './ExpandableImage.module.css';
import { useState, useCallback, TouchEvent } from 'react';
import { JsonImage } from '@types';
import { useKeyDown } from '@/hooks';

const lqPath = '/character art/LQ/';
const hqPath = '/character art/HQ/';
const stopPropagation = (e: TouchEvent) => e.stopPropagation();
const swipeHandlers = {
  onTouchStart: stopPropagation,
  onTouchMove: stopPropagation,
  onTouchEnd: stopPropagation,
  onTouchCancel: stopPropagation,
}

export default function ExpandableImage({ image }: Props) {

  const [expanded, setExpanded] = useState(false);
  const [loadedSmall, setLoadedSmall] = useState(false);
  const [loadedBig, setLoadedBig] = useState(false);

  const open = useCallback(() => setExpanded(true), [setExpanded]);
  const close = useCallback(() => setExpanded(false), [setExpanded]);

  useKeyDown(useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setExpanded(false);
    }
  }, []));

  return (
    <>
      <button className={styles.imageButton} onClick={open}>
        <img className={`${loadedSmall ? styles.loaded : ''} w-100 h-100`}
          width={image.dimensions.width}
          height={image.dimensions.height}
          src={lqPath + image.path}
          alt="Small"
          onLoad={() => setLoadedSmall(true)} />
      </button>
      {expanded && <div className={`${styles.dialog} primary`} {...swipeHandlers}>
        <div className={styles.imageContainer}>
          <img className={loadedBig ? styles.loaded : ''}
            width={image.dimensions.width}
            height={image.dimensions.height}
            src={hqPath + image.path}
            alt="Large"
            onLoad={() => setLoadedBig(true)} />
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
