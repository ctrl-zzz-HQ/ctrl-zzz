import dreamLogs from '@data/dream-logs';
import TableLayout from '@components/TableLayout';

export default function DreamLogLayout() {

  dreamLogs.forEach(dreamLog => dreamLog.label = `${dreamLog.code} [${dreamLog.timestamp}]`);

  return (
    <TableLayout data={dreamLogs} />
  );
}
