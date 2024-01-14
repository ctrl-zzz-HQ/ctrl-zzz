import dreamLogs from '../data/dream-logs.json';
import { useState } from 'react';

export default function Member({ index }) {

  const [dreamLog,] = useState(dreamLogs[index]);

  return (
    <>
      <h2>
        <span className="desktop">DREAM </span>
        LOG {dreamLog.code} [
        <span className="desktop">timestamp: </span>
        {dreamLog.timestamp}]
      </h2>
    </>
  );
}
