import AgentPage from '@components/AgentPage';

export default function Agent({ params: { id } }: Props) {
  return (
    <AgentPage id={id}/>
  );
}

interface Props {
  params: {
    id: number;
  }
}
