import DreamLogPage from '@components/DreamLogPage';

export default function DreamLog({ params: { id } }: Props) {
  return (
    <DreamLogPage id={id} />
  );
}

interface Props {
  params: {
    id: number;
  }
}
