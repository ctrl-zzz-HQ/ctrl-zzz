import styles from './DreamLogPage.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo, useEffect, useCallback, useRef } from 'react';
import TypingAnimation from '@components/TypingAnimation';

export default function DreamLog({ index }: Props) {

  const dreamLog = useMemo(() => dreamLogs[index], [index]);
  const bodyRef = useRef(null);

  const scrollToNextPage = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollTop + bodyRef.current.clientHeight;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', scrollToNextPage);
    return () => document.removeEventListener('keydown', scrollToNextPage);
  }, [scrollToNextPage]);

  return (
    <>
      <h2>
        <span className="desktop">DREAM </span>
        LOG {dreamLog.code} [
        <span className="desktop">timestamp: </span>
        {dreamLog.timestamp}]
      </h2>
      <div className={styles.scrollBody} ref={bodyRef}>
        <TypingAnimation text={dreamLog.text} playTrigger={1} />
      </div>
      <p className={`${styles.continueText} secondary-text desktop`}>
        [press any key to continue]
      </p>
    </>
  );
}

interface Props {
  index: number;
}
