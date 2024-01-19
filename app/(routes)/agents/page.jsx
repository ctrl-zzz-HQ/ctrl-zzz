import agents from '/public/data/agents.json';
import { redirect } from 'next/navigation';

export default function AgentsPage() {
  redirect(`/agents/${agents.length - 1}`);
  return;
}
