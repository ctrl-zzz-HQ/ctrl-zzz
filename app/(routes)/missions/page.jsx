import missions from '/public/data/missions.json';
import { redirect } from 'next/navigation';

export default function MissionsPage() {
  redirect(`/missions/${missions.length - 1}`);
}
