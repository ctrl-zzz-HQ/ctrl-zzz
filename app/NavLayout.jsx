'use client'
import './NavLayout.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavLayout({ children }) {

  const pathname = usePathname();
  const [links,] = useState([
    {
      path: '/missions',
      label: 'Missions',
    },
    {
      path: '/agents',
      label: 'Agents',
    },
    {
      path: '/dream-logs',
      label: 'Dream Log',
    },
  ]);

  const isActive = function(link) {
    return pathname && pathname.includes(link.path);
  }

  return (
    <div className="nav-layout primary page-container">
      <h1>CTRL+ZZZ HQ</h1>
      <div className="nav-layout top-menu">
        {
          links.map(link =>
            <Link className={isActive(link) ? 'active' : ''} href={link.path} key={link.path}>
              {link.label}
            </Link>
          )
        }
      </div>
      {children}
    </div>
  );
}
