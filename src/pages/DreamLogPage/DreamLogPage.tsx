import styles from './DreamLogPage.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo, useRef } from 'react';
import TypingAnimation from '@components/TypingAnimation';

export default function DreamLog({ index }: Props) {

  const dreamLog = useMemo(() => dreamLogs[index], [index]);
  const bodyRef = useRef(null);

  return (
    <>
      <h2>
        DREAM LOG {dreamLog.code}
      </h2>
      <div className={styles.scrollBody} ref={bodyRef}>
        <TypingAnimation text={dreamLog.text} playTrigger={1} />
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
