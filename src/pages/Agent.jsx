import agents from '../data/agents.json';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Agent({ index }) {

  const getAgent = function(index) {
    if (index < 0) {
      return null;
    }
    return agents[index];
  }

  const [agent,] = useState(getAgent(index));
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
    </>
  );
}
