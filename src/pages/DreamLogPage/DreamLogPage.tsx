import styles from '../Page.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo, useRef } from 'react';
import TextToHtml from '@components/TextToHtml';
import ExpandableImage from '@components/ExpandableImage';

export default function DreamLog({ index }: Props) {

  const dreamLog = useMemo(() => dreamLogs[index], [index]);
  const bodyRef = useRef(null);

  return (
    <>
      <h2>
        DREAM LOG {dreamLog.code}
      </h2>
      <div className={styles.scrollBody} ref={bodyRef}>
        <TextToHtml html={dreamLog.html} text={dreamLog.text} />
        {dreamLog.art && (
          <>
            <br/>
            {dreamLog.art.map(image => <ExpandableImage image={image} key={image.path} />)}
          </>
        )}
      </div>
      <p className={`${styles.footer} secondary-text`}>
        [timestamp: {dreamLog.timestamp}]
      </p>
    </>
  );
}

interface Props {
  index: number;
}
