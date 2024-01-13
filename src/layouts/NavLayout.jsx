import './NavLayout.css';
import { Outlet, Link } from 'react-router-dom';

export default function NavLayout() {

  return (
    <div className="nav-layout primary page-container">
      <h1>CTRL+ZZZ HQ</h1>
      <div className="d-flex flex-row w-100 secondary">
        <div className="left-menu">
          <div className="menu-group">
            <span className="menu-group-header">MISSIONS</span>
            <Link to="/" className="menu-group-item">Mission I</Link>
          </div>
          <div className="menu-group">
            <span className="menu-group-header">AGENTS</span>
            <Link to="/" className="menu-group-item">I [xxx]</Link>
            <Link to="/" className="menu-group-item">II [xxx]</Link>
            <Link to="/" className="menu-group-item">III [xxx]</Link>
          </div>
          <div className="menu-group">
            <span className="menu-group-header">TARGETS</span>
            <Link to="/" className="menu-group-item">I [xxx]</Link>
            <Link to="/" className="menu-group-item">II [xxx]</Link>
            <Link to="/" className="menu-group-item">III [xxx]</Link>
          </div>
          <div className="menu-group">
            <Link to="/" className="menu-group-header">DREAM LOG</Link>
          </div>
        </div>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
