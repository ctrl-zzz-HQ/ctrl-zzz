import missions from '@data/missions';
import TableLayout from '@components/TableLayout';

export default function MissionLayout() {

  missions.forEach(mission => mission.label = `${mission.code} [${mission.status}]`);

  return (
    <TableLayout data={missions} />
  );
}
