import dreamLogs from '/public/data/dream-logs.json';

export default function DreamLog({ params: { id } }) {

  const dreamLog = dreamLogs[id];

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
