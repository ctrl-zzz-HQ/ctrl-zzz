import missionsJson from '@data/missions.json';
import { Mission } from '@types';
import TableLayout from '@components/TableLayout';

export default function MissionLayout() {

  const missions: Mission[] = missionsJson;
  missions.forEach(mission => mission.label = `${mission.code} [${mission.status}]`);

  return (
    <TableLayout data={missions} />
  );
}
