import MissionPage from '/app/_components/MissionPage';

export default function Mission({ params: { id } }) {
  return (
    <MissionPage id={id}/>
  );
}
