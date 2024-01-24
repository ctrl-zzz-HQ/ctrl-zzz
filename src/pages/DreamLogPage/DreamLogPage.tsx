import styles from './DreamLogPage.module.css';
import dreamLogs from '@data/dream-logs';
import { useMemo } from 'react';

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
        {dreamLog.text.split('\n').map((line, index) => {
          if (line.trim().length === 0) {
            return <br key={index}></br>;
          } else {
            return <p key={index}>{line}</p>;
          }
        })}
      </div>
      <button className={`${styles.continueButton} secondary-text mobile`}>
        [
          <span className="mobile">tap here </span>
          <span className="desktop">click here or press any key </span>
        to continue]
      </button>
      <button className={`${styles.continueButton} secondary-text desktop`}>[click or press any key to continue]</button>
    </>
  );
}

interface Props {
  index: number;
}
