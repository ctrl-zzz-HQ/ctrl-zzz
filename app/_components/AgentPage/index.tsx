import agents from '@data/agents.json';
import ExpandableImage from '@components/ExpandableImage';

export default function Agent({ id }: Props) {

  const agent = agents[id];

  return (
    agent &&
    <>
      <h2>
        AGENT {agent.code} [
        <span className="desktop">alias: </span>
        {agent.alias}]
      </h2>
      <div className="agent image-container">
        {agent.art.map(image =>
          <ExpandableImage image={image} key={image.path}/>)}
      </div>
    </>
  );
}

interface Props {
  id: number;
}
