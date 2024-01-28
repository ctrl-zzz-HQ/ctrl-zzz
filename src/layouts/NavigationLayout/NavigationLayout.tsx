import styles from './NavigationLayout.module.css';
import { Outlet, Link, useLocation } from 'react-router-dom';

const links: JsonLink[] = [
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
];

export default function NavLayout() {

  const location = useLocation();

  const isActive = function(link: JsonLink) {
    return location.pathname && location.pathname.includes(link.path);
  }

  return (
    <div className={`${styles.pageContainer} primary`}>
      <h1>CTRL+ZZZ</h1>
      <div className={styles.menu}>
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

interface JsonLink {
  path: string;
  label: string;
}
