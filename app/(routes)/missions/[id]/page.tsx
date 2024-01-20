import MissionPage from '@components/MissionPage';

export default function Mission({ params: { id } }: Props) {
  return (
    <MissionPage id={id}/>
  );
}

interface Props {
  params: {
    id: number;
  }
}
