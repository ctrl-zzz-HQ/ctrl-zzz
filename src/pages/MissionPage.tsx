import missions from '@data/missions';
import { useMemo } from 'react';

export default function Mission({ index }: Props) {

  const mission = useMemo(() => missions[index], [index]);

  return (
    <>
      <h2>
        MISSION {mission.code} [
        <span className="desktop">status: </span>
        {mission.status}]
      </h2>
      <div style={{width: '100%'}} dangerouslySetInnerHTML={{__html: mission.embed}}></div>
      <div className="mission section">
        <h3>&gt; Brief</h3>
        <p>{mission.brief}</p>
      </div>
    </>
  );
}

interface Props {
  index: number;
}
