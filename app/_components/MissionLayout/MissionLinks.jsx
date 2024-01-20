'use client'
import './MissionLayout.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import missions from '/public/data/missions.json';
import Footer from '/app/_components/Footer';

export function DesktopMissionLinks() {

  const pathname = usePathname();

  const isActive = function(index) {
    return pathname && pathname.endsWith(`/${index}`);
  }

  return (
    <>
      {missions.map((mission, index) =>
          <Link href={`${index}`} className={`menu-group-item ${isActive(index) ? 'active' : ''}`} key={index}>
            &gt; {mission.code} [{mission.status}]
          </Link>
        )}
    </>
  );
}
