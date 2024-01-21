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
      {dreamLog.text.split('\n').map(line => {
        if (line.trim().length === 0) {
          return <br></br>;
        } else {
          return <p>{line}</p>;
        }
      })}
      <a href={dreamLog.url}>&gt; READ MORE</a>
    </>
  );
}

interface Props {
  index: number;
}
