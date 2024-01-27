import agents from '@data/agents';
import { useNavigate } from 'react-router-dom';
import { useMemo, useEffect, useCallback } from 'react';
import ExpandableImage from '@components/ExpandableImage';

export default function Agent({ index }: Props) {

  const getAgent = useCallback((index: number) => index < 0 ? null : agents[index], []);
  const agent = useMemo(() => getAgent(index), [index, getAgent]);
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
      <div className="scrollable">
        <div className="section">
          <h3>&gt; Roles</h3>
          <p>{agent.roles.join(', ')}</p>
        </div>
        <div className="section">
          <h3>&gt; Gallery</h3>
          <p className="secondary-text">[click to enlarge]</p>
          <div className="agent image-container">
            {agent.art.map(image =>
              <ExpandableImage image={image} key={image.path}/>)}
          </div>
        </div>
      </div>
      <div>
      {/* TODO Social media links */}
      </div>
    </>
  );
}

interface Props {
  index: number;
}
