import missions from '@data/missions.json';
import { redirect } from 'next/navigation';

export default function MissionsPage() {
  redirect(`/missions/${missions.length - 1}`);
}
