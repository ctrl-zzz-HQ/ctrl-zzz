import dreamLogs from '../data/dream-logs.json';
import { useState } from 'react';

export default function Member({ index }) {

  const [dreamLog,] = useState(dreamLogs[index]);

  return (
    <>
      <h2>DREAM LOG {dreamLog.code} [timestamp: {dreamLog.timestamp}]</h2>
    </>
  );
}
