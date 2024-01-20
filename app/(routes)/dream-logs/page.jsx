import dreamLogs from '/public/data/dream-logs.json';
import { redirect } from 'next/navigation';

export default function DreamLogsPage() {
  redirect(`/dream-logs/${dreamLogs.length - 1}`);
}
