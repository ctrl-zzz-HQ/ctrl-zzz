'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import agents from '/public/data/agents.json';

export function MobileAgentLinks() {

  const pathname = usePathname();

  const currIndex = useMemo(() => {
    const splitPath = pathname.split('/');
    for (let i = splitPath.length - 1; i >= 0; i--) {
      if (splitPath[i].length > 0) {
        return splitPath[i] * 1;
      }
    }
  }, [pathname]);

  return (
    <>
      <Link href={`${currIndex - 1}`} className={currIndex <= 0 ? 'v-hidden' : ''}>&lt; previous</Link>
      <Link href={`${currIndex + 1}`} className={currIndex >= agents.length - 1 ? 'v-hidden' : ''}>next &gt;</Link>
    </>
  );
}

export function DesktopAgentLinks() {

  const pathname = usePathname();

  const currIndex = useMemo(() => {
    const splitPath = pathname.split('/');
    for (let i = splitPath.length - 1; i >= 0; i--) {
      if (splitPath[i].length > 0) {
        return splitPath[i] * 1;
      }
    }
  }, [pathname]);

  return (
    <>
      {agents.map((agent, index) =>
        <Link href={`${index}`} className={`menu-group-item ${index === currIndex ? 'active' : ''}`} key={index}>
          &gt; {agent.code} [{agent.alias}]
        </Link>
      )}
    </>
  );
}
