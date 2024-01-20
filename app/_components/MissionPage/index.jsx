import missions from '/public/data/missions.json';

export default function Mission({ id }) {

  const mission = missions[id];

  return (
    <>
      <h2>
        MISSION {mission.code} [
        <span className="desktop">status: </span>
        {mission.status}]
      </h2>
      <div className="mission section">
        <h3>&gt; Brief</h3>
        <p>{mission.brief}</p>
      </div>
    </>
  );
}