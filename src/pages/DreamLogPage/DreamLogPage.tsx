import styles from './DreamLogPage.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo } from 'react';
import TypingAnimation from '@components/TypingAnimation';

export default function DreamLog({ index }: Props) {

  const dreamLog = useMemo(() => dreamLogs[index], [index]);

  return (
    <>
      <h2>
        <span className="desktop">DREAM </span>
        LOG {dreamLog.code} [
        <span className="desktop">timestamp: </span>
        {dreamLog.timestamp}]
      </h2>
      <div className="scrollable">
        <TypingAnimation text={dreamLog.text} playTrigger={1} />
      </div>
      <button className={`${styles.continueButton} secondary-text`}>
        [click here <span className="desktop">or press any key</span> to continue]
      </button>
    </>
  );
}

interface Props {
  index: number;
}
