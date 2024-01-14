import missions from '../data/missions.json';
import { useState } from 'react';

export default function Mission({ index }) {

  const [mission,] = useState(missions[index]);

  return (
    <>
      <h2>MISSION {mission.code} [status: {mission.status}]</h2>
      <div className="mission section">
        <h3>&gt; Brief</h3>
        <p>{mission.brief}</p>
      </div>
    </>
  );
}
