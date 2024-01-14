import './NavLayout.css';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function NavLayout() {

  const location = useLocation();
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
    return location.pathname && location.pathname.includes(link.path);
  }

  return (
    <div className="nav-layout primary page-container">
      <h1>CTRL+ZZZ HQ</h1>
      <div className="nav-layout top-menu">
        {
          links.map(link =>
            <Link className={isActive(link) ? 'active' : ''} to={link.path} key={link.path}>
              {link.label}
            </Link>
          )
        }
      </div>
      <Outlet />
    </div>
  );
}
