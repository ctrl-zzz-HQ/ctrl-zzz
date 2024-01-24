import dreamLogs from '../data/dream-logs';
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
      <a href={dreamLog.url} target="_blank" style={{marginTop: '.5rem', alignSelf: 'flex-start'}}>&gt; READ MORE</a>
    </>
  );
}

interface Props {
  index: number;
}
