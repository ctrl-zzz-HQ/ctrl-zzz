import agents from '../data/agents.json';
import { useNavigate } from 'react-router-dom';
import { useMemo, useEffect, useCallback } from 'react';
import ExpandableImage from '../components/ExpandableImage';

export default function Agent({ index }: Props) {

  const getAgent = useCallback((index: number) => index < 0 ? null : agents[index], []);
  const agent = useMemo(() => getAgent(index), [index]);
  const navigate = useNavigate();

  useEffect(() => {
    if (index < 0) navigate(`${Math.floor(Math.random() * agents.length)}`);
  }, [index, navigate]);

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
  index: number;
}
