import dreamLogs from '@public/data/dream-logs.json';

export default function DreamLog({ id }: Props) {

  const dreamLog: DreamLog = dreamLogs[id];

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

interface Props {
  id: number;
}
