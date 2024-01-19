'use client'
import agents from '/public/data/agents.json';
import { redirect } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import ExpandableImage from '/app/_components/ExpandableImage';

export default function Agent({ id }) {

  const getAgent = useCallback((id) => id < 0 ? null : agents[id], []);
  const [agent,] = useState(getAgent(id));

  useEffect(() => {
    if (id < 0) redirect(`/agents/${Math.floor(Math.random() * agents.length)}`);
  }, [id]);

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