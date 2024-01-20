'use client' // avoid caching on server and recalculate random agent each time
import agents from '@data/agents.json';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AgentsPage() {
  useEffect(() => {
    redirect(`/agents/${Math.floor(Math.random() * agents.length)}`);
  }, []);
}
