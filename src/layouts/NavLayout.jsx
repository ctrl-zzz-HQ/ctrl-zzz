import './NavLayout.css';
import { Outlet, Link } from 'react-router-dom';

export default function NavLayout() {

  return (
    <div className="nav-layout primary page-container">
      <h1>CTRL+ZZZ HQ</h1>
      <div className="nav-layout top-menu">
        <Link to="/missions">Missions</Link>
        <Link to="/members">Members</Link>
        <Link to="/dream-log">Dream Log</Link>
      </div>
      <Outlet />
    </div>
  );
}
