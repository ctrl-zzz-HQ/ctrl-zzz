import dreamLogsJson from '@data/dream-logs';
import { DreamLog } from '@types';
import TableLayout from '@components/TableLayout';

export default function DreamLogLayout() {

  const dreamLogs: DreamLog[] = dreamLogsJson;
  dreamLogs.forEach(dreamLog => dreamLog.label = `${dreamLog.code} [${dreamLog.timestamp}]`);

  return (
    <TableLayout data={dreamLogs} />
  );
}
